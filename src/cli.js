import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { aliases, normalizePlatform, platforms } from "./platforms.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestName = ".devweave-manifest.json";
const markerStart = "<!-- devweave:start -->";
const markerEnd = "<!-- devweave:end -->";

function usage() {
  return `DevWeave 0.1.0

Uso:
  devweave install [--global|--project] [--platform all|codex|claude|cursor|opencode|gemini|copilot|windsurf|cline|agents] [--target CAMINHO] [--force]
  devweave uninstall [--global|--project] [--platform ...] [--target CAMINHO]
  devweave update [opções de install]
  devweave doctor [--global|--project] [--target CAMINHO]
  devweave list
  devweave print

Padrão: --global --platform all.`;
}

function parse(argv) {
  const out = { command: argv[0] || "help", scope: "global", platform: "all", force: false };
  for (let i = 1; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--global") out.scope = "global";
    else if (arg === "--project") out.scope = "project";
    else if (arg === "--force") out.force = true;
    else if (arg === "--platform") out.platform = normalizePlatform(argv[++i]);
    else if (arg === "--target") out.target = argv[++i];
    else throw new Error(`opção desconhecida: ${arg}`);
  }
  return out;
}

function baseFor(options) {
  return path.resolve(options.target || (options.scope === "global" ? os.homedir() : process.cwd()));
}

function selected(platform) {
  if (platform === "all") return Object.keys(platforms);
  if (!platforms[platform]) throw new Error(`plataforma desconhecida: ${platform}`);
  return [platform];
}

function read(name) {
  return fs.readFileSync(path.join(root, name), "utf8");
}

function payloadFor(relative) {
  if (relative.endsWith(".mdc")) {
    return `---\ndescription: DevWeave software delivery workflow\nalwaysApply: true\n---\n\n${read("templates/MASTER_PROMPT.md")}`;
  }
  if (relative.endsWith("AGENTS.md")) return read("templates/AGENTS.md");
  if (relative.endsWith("CLAUDE.md")) return read("adapters/claude.md");
  if (relative.endsWith("GEMINI.md")) return read("adapters/gemini.md");
  if (relative.includes("copilot")) return read("adapters/copilot.md");
  return read("templates/MASTER_PROMPT.md");
}

function copySkill(destination, force) {
  if (fs.existsSync(destination) && !force) return false;
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.cpSync(path.join(root, "skill", "devweave"), destination, { recursive: true, force: true });
  return true;
}

function writeManaged(file, content, force) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, `${content.trim()}\n`);
    return "created";
  }
  const current = fs.readFileSync(file, "utf8");
  if (current.includes(markerStart)) {
    const replaced = current.replace(
      new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`),
      `${markerStart}\n${content.trim()}\n${markerEnd}`
    );
    fs.writeFileSync(file, replaced);
    return "updated";
  }
  if (!force) {
    fs.appendFileSync(file, `\n${markerStart}\n${content.trim()}\n${markerEnd}\n`);
    return "appended";
  }
  fs.writeFileSync(file, `${content.trim()}\n`);
  return "replaced";
}

function install(options) {
  const base = baseFor(options);
  const installed = [];
  for (const key of selected(options.platform)) {
    for (const relative of platforms[key][options.scope]) {
      const destination = path.join(base, relative);
      if (relative.endsWith("/devweave") || relative.endsWith("\\devweave")) {
        copySkill(destination, options.force);
      } else {
        writeManaged(destination, payloadFor(relative), options.force);
      }
      installed.push({ platform: key, path: destination });
    }
  }
  const manifest = path.join(base, ".config", "devweave", manifestName);
  fs.mkdirSync(path.dirname(manifest), { recursive: true });
  fs.writeFileSync(manifest, JSON.stringify({ version: "0.1.0", scope: options.scope, installed }, null, 2));
  console.log(`Instalação concluída: ${installed.length} destino(s).`);
  for (const item of installed) console.log(`- ${platforms[item.platform].label}: ${item.path}`);
}

function removeManaged(file) {
  if (!fs.existsSync(file)) return false;
  const stat = fs.statSync(file);
  if (stat.isDirectory()) {
    fs.rmSync(file, { recursive: true, force: true });
    return true;
  }
  const current = fs.readFileSync(file, "utf8");
  if (current.includes(markerStart)) {
    const next = current.replace(new RegExp(`\\s*${markerStart}[\\s\\S]*?${markerEnd}\\s*`, "g"), "\n").trim();
    if (next) fs.writeFileSync(file, `${next}\n`);
    else fs.rmSync(file);
  } else {
    fs.rmSync(file);
  }
  return true;
}

function uninstall(options) {
  const base = baseFor(options);
  let count = 0;
  for (const key of selected(options.platform)) {
    for (const relative of platforms[key][options.scope]) {
      if (removeManaged(path.join(base, relative))) count += 1;
    }
  }
  console.log(`Remoção concluída: ${count} destino(s).`);
}

function doctor(options) {
  const base = baseFor(options);
  let found = 0;
  for (const [key, config] of Object.entries(platforms)) {
    const paths = config[options.scope].map((relative) => path.join(base, relative));
    const present = paths.filter((item) => fs.existsSync(item));
    if (present.length) found += 1;
    console.log(`${present.length ? "OK" : "--"} ${config.label}: ${present.length}/${paths.length}`);
  }
  console.log(`Runtime: Node ${process.versions.node}; base: ${base}`);
  if (!found) process.exitCode = 1;
}

export async function main(argv) {
  const options = parse(argv);
  if (["help", "--help", "-h"].includes(options.command)) console.log(usage());
  else if (options.command === "install") install(options);
  else if (options.command === "update") install({ ...options, force: true });
  else if (options.command === "uninstall") uninstall(options);
  else if (options.command === "doctor") doctor(options);
  else if (options.command === "list") {
    for (const [key, value] of Object.entries(platforms)) console.log(`${key}: ${value.label}`);
  } else if (options.command === "print") console.log(read("templates/MASTER_PROMPT.md"));
  else throw new Error(`comando desconhecido: ${options.command}\n\n${usage()}`);
}

export { aliases, baseFor, parse, platforms };
