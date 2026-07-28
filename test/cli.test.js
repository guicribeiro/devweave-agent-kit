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
