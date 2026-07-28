# Arquitetura

## Camadas

1. `skill/devweave`: skill portátil e referências progressivas.
2. `templates`: prompt mestre e AGENTS.md.
3. `adapters`: instruções específicas por plataforma.
4. `src`: instalador sem dependências externas.
5. `bin`: comando `devweave`.

## Compatibilidade

CLI requer Node 18+; Bun executa pacote compatível com API Node. Instalação global escreve em diretório do usuário. Instalação de projeto escreve no diretório atual ou `--target`.

Always-on usa duas camadas: skill para instruções progressivas e arquivo global de regras para carregamento automático. Skill isolada depende do roteador do agente e não garante ativação permanente.

Suporte varia por plataforma. Codex e Claude recebem pasta de skill. Cursor, Windsurf e Cline recebem regras. OpenCode, Gemini e agentes genéricos recebem arquivos de instruções. Copilot recebe instruções de repositório em modo projeto; modo global guarda fonte reutilizável.

## Segurança de arquivos

Instalador:

- cria diretórios ausentes;
- anexa bloco marcado a arquivos existentes;
- atualiza somente bloco marcado;
- usa `--force` para substituir pasta de skill e atualizar bloco DevWeave;
- nunca sobrescreve conteúdo externo em arquivo de regras existente;
- registra manifesto informativo;
- remove pasta de skill ou bloco marcado no uninstall.

Antes de uso real, executar `doctor`. Fazer backup de regras críticas mantidas por ferramentas externas.

## Dependências conceituais

Projetos Fable, Graphify, OpenSpec, UI UX Pro Max, Superpowers, Ponytail, RTK, Self-Learning, Headroom e i-have-adhd não são empacotados nem instalados. DevWeave consolida protocolo e usa integração somente quando ferramenta já estiver disponível.
