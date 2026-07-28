# Contrato dos adaptadores

Adaptadores traduzem mesmo protocolo; não duplicam orquestração. Ordem de autoridade: instruções do sistema/plataforma, regras do projeto, DevWeave, preferências opcionais de formato.

- Codex e Claude: instalar pasta de skill.
- Cursor, Windsurf e Cline: instalar arquivo de regras.
- OpenCode e Gemini: instalar arquivo de instruções global/projeto.
- Copilot: instalar instruções de repositório; arquivo global serve como fonte para cópia, pois suporte global varia por produto.
- Agentes genéricos: usar `AGENTS.md`.

Instalador preserva arquivos existentes usando bloco marcado. `--force` permite substituição gerenciada; não sobrescreve conteúdo fora do bloco.
