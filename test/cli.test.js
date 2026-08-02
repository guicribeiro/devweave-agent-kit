import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cli = path.join(root, "bin", "devweave.js");

function run(args) {
  return spawnSync(process.execPath, [cli, ...args], { cwd: root, encoding: "utf8" });
}

test("install, doctor e uninstall de projeto Codex", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "devweave-"));
  try {
    const installed = run(["install", "--project", "--platform", "codex", "--target", target]);
    assert.equal(installed.status, 0, installed.stderr);
    assert.ok(fs.existsSync(path.join(target, ".codex", "skills", "devweave", "SKILL.md")));
    assert.ok(fs.existsSync(path.join(target, "AGENTS.md")));

    const diagnosed = run(["doctor", "--project", "--target", target]);
    assert.equal(diagnosed.status, 0, diagnosed.stderr);
    assert.match(diagnosed.stdout, /OK Codex/);

    const removed = run(["uninstall", "--project", "--platform", "codex", "--target", target]);
    assert.equal(removed.status, 0, removed.stderr);
    assert.equal(fs.existsSync(path.join(target, ".codex", "skills", "devweave")), false);
    assert.equal(fs.existsSync(path.join(target, "AGENTS.md")), false);
  } finally {
    fs.rmSync(target, { recursive: true, force: true });
  }
});

test("instala Codex global com skill e regra always-on", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "devweave-"));
  try {
    const installed = run(["install", "--global", "--platform", "codex", "--target", target]);
    assert.equal(installed.status, 0, installed.stderr);
    assert.ok(fs.existsSync(path.join(target, ".codex", "skills", "devweave", "SKILL.md")));
    const rules = fs.readFileSync(path.join(target, ".codex", "AGENTS.md"), "utf8");
    assert.match(rules, /DevWeave sempre ativo/);
  } finally {
    fs.rmSync(target, { recursive: true, force: true });
  }
});

test("preserva conteúdo existente usando bloco marcado", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "devweave-"));
  try {
    fs.writeFileSync(path.join(target, "AGENTS.md"), "# Regras locais\n");
    const installed = run(["install", "--project", "--platform", "agents", "--target", target]);
    assert.equal(installed.status, 0, installed.stderr);
    const content = fs.readFileSync(path.join(target, "AGENTS.md"), "utf8");
    assert.match(content, /# Regras locais/);
    assert.match(content, /devweave:start/);
    run(["uninstall", "--project", "--platform", "agents", "--target", target]);
    assert.equal(fs.readFileSync(path.join(target, "AGENTS.md"), "utf8").trim(), "# Regras locais");
  } finally {
    fs.rmSync(target, { recursive: true, force: true });
  }
});

test("--force não sobrescreve regras externas", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "devweave-"));
  try {
    fs.writeFileSync(path.join(target, "AGENTS.md"), "# Autoridade local\n");
    const installed = run(["install", "--project", "--platform", "agents", "--target", target, "--force"]);
    assert.equal(installed.status, 0, installed.stderr);
    const content = fs.readFileSync(path.join(target, "AGENTS.md"), "utf8");
    assert.match(content, /# Autoridade local/);
    assert.match(content, /devweave:start/);
  } finally {
    fs.rmSync(target, { recursive: true, force: true });
  }
});

test("doctor informa backend Spec Anchor", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "devweave-"));
  try {
    run(["install", "--project", "--platform", "agents", "--target", target]);
    const diagnosed = run(["doctor", "--project", "--target", target]);
    assert.equal(diagnosed.status, 0, diagnosed.stderr);
    assert.match(diagnosed.stdout, /Spec Anchor \(ONP CLI\):/);
  } finally {
    fs.rmSync(target, { recursive: true, force: true });
  }
});

test("skill instalada inclui gates Hallmark e Mantis @spec:AC-001", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "devweave-"));
  try {
    const installed = run(["install", "--project", "--platform", "codex", "--target", target]);
    assert.equal(installed.status, 0, installed.stderr);
    const skillRoot = path.join(target, ".codex", "skills", "devweave");
    const skill = fs.readFileSync(path.join(skillRoot, "SKILL.md"), "utf8");
    assert.match(skill, /Hallmark/);
    assert.match(skill, /references\/mantis\.md/);
    assert.ok(fs.existsSync(path.join(skillRoot, "references", "mantis.md")));
  } finally {
    fs.rmSync(target, { recursive: true, force: true });
  }
});

test("skill instalada inclui orquestração enxuta @spec:AC-002", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "devweave-"));
  try {
    const installed = run(["install", "--project", "--platform", "codex", "--target", target]);
    assert.equal(installed.status, 0, installed.stderr);
    const skillRoot = path.join(target, ".codex", "skills", "devweave");
    const skill = fs.readFileSync(path.join(skillRoot, "SKILL.md"), "utf8");
    const orchestration = fs.readFileSync(path.join(skillRoot, "references", "orchestration.md"), "utf8");
    assert.match(skill, /references\/orchestration\.md/);
    assert.match(orchestration, /Plano de evidência/);
    assert.match(orchestration, /Limiar de delegação/);
    assert.match(orchestration, /Grafo de trabalho/);
  } finally {
    fs.rmSync(target, { recursive: true, force: true });
  }
});

test("README expõe catálogo completo de prompts @spec:AC-003", () => {
  const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
  const prompts = fs.readFileSync(path.join(root, "PROMPTS.md"), "utf8");
  const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

  assert.match(readme, /\[PROMPTS\.md\]\(PROMPTS\.md\)/);
  for (const section of [
    "Avaliação completa",
    "Revisão de mudança ou PR",
    "Modificação segura",
    "Estratégia e criação de testes",
    "Segurança defensiva",
    "Arquitetura e evolução de sistema",
    "Design de produto e interface",
    "Criação de sistema ou aplicação",
    "Criação ou revisão de site",
    "Criação ou revisão de automação",
    "Criação ou revisão de landing page",
  ]) {
    assert.match(prompts, new RegExp(section));
  }
  assert.ok(packageJson.files.includes("PROMPTS.md"));
});

test("skill instalada documenta descoberta visual local e MiMo Free @spec:AC-VIS-005", () => {
  const target = fs.mkdtempSync(path.join(os.tmpdir(), "devweave-"));
  try {
    const installed = run(["install", "--project", "--platform", "codex", "--target", target]);
    assert.equal(installed.status, 0, installed.stderr);
    const vision = fs.readFileSync(
      path.join(target, ".codex", "skills", "devweave", "references", "vision-and-testing.md"),
      "utf8",
    );
    assert.match(vision, /IA visual local/);
    assert.match(vision, /MiMo Free/);
    assert.match(vision, /opencode run --model provider\/model --file image --format json/);
    assert.match(vision, /BLOCKED/);
  } finally {
    fs.rmSync(target, { recursive: true, force: true });
  }
});
