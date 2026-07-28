export const platforms = {
  codex: {
    label: "Codex CLI/App",
    global: [".codex/skills/devweave"],
    project: [".codex/skills/devweave", "AGENTS.md"]
  },
  claude: {
    label: "Claude Code",
    global: [".claude/skills/devweave"],
    project: [".claude/skills/devweave", "CLAUDE.md"]
  },
  cursor: {
    label: "Cursor",
    global: [".cursor/rules/devweave.mdc"],
    project: [".cursor/rules/devweave.mdc", "AGENTS.md"]
  },
  opencode: {
    label: "OpenCode",
    global: [".config/opencode/AGENTS.md"],
    project: ["AGENTS.md"]
  },
  gemini: {
    label: "Gemini CLI",
    global: [".gemini/GEMINI.md"],
    project: ["GEMINI.md", "AGENTS.md"]
  },
  copilot: {
    label: "GitHub Copilot",
    global: [".config/devweave/copilot-instructions.md"],
    project: [".github/copilot-instructions.md", "AGENTS.md"]
  },
  windsurf: {
    label: "Windsurf",
    global: [".codeium/windsurf/memories/global_rules.md"],
    project: [".windsurf/rules/devweave.md", "AGENTS.md"]
  },
  cline: {
    label: "Cline",
    global: [".cline/rules/devweave.md"],
    project: [".clinerules/devweave.md", "AGENTS.md"]
  },
  agents: {
    label: "Agentes compatíveis com AGENTS.md",
    global: [".config/devweave/AGENTS.md"],
    project: ["AGENTS.md"]
  }
};

export const aliases = {
  "claude-code": "claude",
  "gemini-cli": "gemini",
  "github-copilot": "copilot",
  "codex-cli": "codex",
  "codex-app": "codex",
  all: "all"
};

export function normalizePlatform(value) {
  const key = String(value || "all").toLowerCase();
  return aliases[key] || key;
}
