# DevWeave Agent Kit

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-339933.svg)](https://nodejs.org/)

Skill global, aberta e multiplataforma para agentes de desenvolvimento de software.

DevWeave instala skill e regras para conduzir desenvolvimento com IA em Codex CLI/App, Claude Code, Cursor, OpenCode, Gemini CLI, GitHub Copilot, Windsurf, Cline e agentes que leem `AGENTS.md`.

Projeto criado e mantido por [Guilherme Ribeiro](https://github.com/guicribeiro), sob licença MIT.

> Estado: código público no GitHub. Pacote ainda não publicado no npm.

## Objetivo

Unificar boas práticas de agentes sem transformar cada ferramenta em novo orquestrador. DevWeave define papéis claros, usa profundidade proporcional ao risco e funciona com fallbacks quando integrações opcionais não estão instaladas.

## Fluxo consolidado

Fable classifica e define pronto. Graphify ajuda em base grande. OpenSpec escolhe profundidade da especificação. UI UX entra só em interface. Superpowers governa implementação. Ponytail reduz complexidade. TDD comprova comportamento. RTK reduz ruído. Fable Judge verifica. Self-Learning registra procedimento comprovado. Headroom e i-have-adhd permanecem opcionais.

Ferramentas citadas não acompanham pacote. DevWeave funciona por fallback quando não estiverem instaladas.

```text
Fable → Graphify? → OpenSpec → UI UX? → Superpowers
      → Ponytail → TDD → RTK? → Fable Judge
      → Self-Learning? → entrega comprovada
```

`?` indica camada opcional ou condicional.

## Instalação atual pelo GitHub

Clonar e instalar:

```sh
git clone https://github.com/guicribeiro/devweave-agent-kit.git
cd devweave-agent-kit
npm install -g .
devweave install
```

Executar sem instalação global:

```sh
npx github:guicribeiro/devweave-agent-kit install
```

Com Bun:

```sh
bun add -g github:guicribeiro/devweave-agent-kit
devweave install
```

## Instalação futura pelo npm

Comandos abaixo funcionarão depois da publicação no npm:

```sh
npm install -g devweave-agent-kit
devweave install
```

```sh
bun add -g devweave-agent-kit
devweave install
```

Sem instalação global:

```sh
npx devweave-agent-kit install
```

## Comandos

```text
devweave install [--global|--project] [--platform NOME] [--target CAMINHO] [--force]
devweave update  [mesmas opções]
devweave uninstall [mesmas opções sem --force]
devweave doctor [--global|--project] [--target CAMINHO]
devweave list
devweave print
```

Padrão: instalação global para todas plataformas.

Exemplos:

```sh
devweave install --global --platform codex
devweave install --project --platform cursor
devweave install --project --platform all --target ./meu-projeto
devweave doctor --global
devweave update --global --platform all
devweave uninstall --project --platform cline
```

Aliases aceitos: `claude-code`, `gemini-cli`, `github-copilot`, `codex-cli`, `codex-app`.

## Destinos

- Codex: `~/.codex/skills/devweave`
- Claude Code: `~/.claude/skills/devweave`
- Cursor: `~/.cursor/rules/devweave.mdc`
- OpenCode: `~/.config/opencode/AGENTS.md`
- Gemini CLI: `~/.gemini/GEMINI.md`
- Copilot: fonte global em `~/.config/devweave/copilot-instructions.md`; projeto em `.github/copilot-instructions.md`
- Windsurf: `~/.codeium/windsurf/memories/global_rules.md`
- Cline: `~/.cline/rules/devweave.md`
- Genérico: `~/.config/devweave/AGENTS.md`

Use `--project` quando plataforma priorizar regras do repositório. Caminhos podem mudar entre versões dos produtos; confirme documentação atual antes de rollout em equipe.

## Publicar no npm depois

1. Escolher nome final e consultar disponibilidade:

   ```sh
   npm view devweave-agent-kit
   ```

2. Alterar `name`, autor, repositório e versão no `package.json`.
3. Criar conta npm, habilitar 2FA e autenticar:

   ```sh
   npm login
   ```

4. Validar pacote:

   ```sh
   npm test
   npm pack --dry-run
   ```

5. Publicar pacote público:

   ```sh
   npm publish --access public
   ```

6. Criar release/tag somente após publicação confirmada. Para nova versão:

   ```sh
   npm version patch
   npm publish
   ```

Nunca incluir tokens npm no repositório. Configurar provenance/CI conforme política do projeto.

## Arquivos

- `templates/MASTER_PROMPT.md`: prompt mestre.
- `templates/AGENTS.md`: regra portátil.
- `skill/devweave/SKILL.md`: skill global.
- `ARCHITECTURE.md`: desenho e compatibilidade.
- `adapters/`: traduções por plataforma.
- `examples/uso.md`: cenários.

## Compatibilidade e limites

- Node.js 18 ou superior.
- Bun compatível com APIs Node usadas pelo instalador.
- Caminhos globais de IDEs podem mudar entre versões.
- Ferramentas de terceiros não são baixadas automaticamente.
- Instruções locais do projeto e regras da plataforma têm precedência.
- `doctor` confirma arquivos instalados, não disponibilidade de cada ferramenta externa.

## Desenvolvimento

```sh
npm test
npm run doctor
npm pack --dry-run
```

Contribuições podem usar issues e pull requests. Mudanças devem preservar instalação, atualização e remoção sem apagar regras externas ao bloco gerenciado.

## Licença

[MIT](LICENSE). Copyright © 2026 Guilherme Ribeiro.
