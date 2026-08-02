# DevWeave Agent Kit

> Fluxo de engenharia always-on, proporcional ao risco e portável entre agentes de IA.

[![Release](https://img.shields.io/github/v/release/guicribeiro/devweave-agent-kit?label=release)](https://github.com/guicribeiro/devweave-agent-kit/releases)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-339933)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-f2c94c)](LICENSE)

DevWeave transforma pedidos de desenvolvimento em fluxo verificável: entende risco, define pronto, escolhe profundidade de especificação, planeja evidência, implementa menor mudança segura e valida resultado real.

Funciona com Codex, Claude Code, Cursor, OpenCode, Gemini CLI, GitHub Copilot, Windsurf, Cline e agentes compatíveis com `AGENTS.md`. Ferramentas externas são opcionais; cada etapa possui fallback.

Criado e mantido por [Guilherme Ribeiro](https://github.com/guicribeiro). Licença MIT.

## Prompts prontos

[PROMPTS.md](PROMPTS.md) reúne prompts copiáveis para avaliação, revisão, modificação,
testes, segurança, arquitetura, design, sistemas, sites, automações e landing pages.
Cada prompt combina DevWeave, Spec Anchor, Fable Judge e, quando relevante, Mantis e
Hallmark.

## Por que DevWeave

Agentes costumam falhar de quatro formas: começam sem critério de pronto, criam arquitetura demais, confundem teste verde com prova e encerram sem revisar escopo. DevWeave trata esses pontos como um único protocolo.

- Profundidade proporcional: tarefa trivial continua curta; mudança crítica recebe gates completos.
- Evidência antes de conclusão: cada afirmação importante precisa de caminho observável.
- Orquestração enxuta: lanes claras, paralelismo sem conflito e custo de delegação controlado.
- Menor solução completa: reutiliza projeto e plataforma antes de criar abstrações.
- Design com qualidade: Hallmark, acessibilidade, responsividade e validação visual.
- Segurança defensiva: Mantis, sandbox, threat model, contrato de evidência e revisão humana.
- Aprendizado conservador: só registra processo reutilizável depois de atrito repetido e prova.

## Fluxo

```text
Pedido
  ↓
Fable: classificar risco + definir pronto
  ↓
Entender base: busca seletiva ou Graphify/codemap
  ↓
OpenSpec + Spec Anchor: intenção → AC → tarefa → teste
  ↓
Plano de evidência + grafo de trabalho + lanes
  ↓
Design? Hallmark     Segurança? Mantis
  ↘                 ↙
Superpowers + Ponytail + TDD
  ↓
Simplificação segura
  ↓
Fable Judge: diff + checks + critérios + escopo
  ↓
VERIFIED | CAVEATS | REFUTED
```

Camadas condicionais entram somente quando reduzem risco real.

## Análise visual e verificação externa

Quando agente atual não tem visão, DevWeave pode criar um contexto separado para um modelo visual analisar screenshot, mockup, diagrama ou erro visual. Resultado volta como evidência estruturada para agente principal continuar trabalho.

Nome sugerido: `vision_bridge`.

```text
vision_bridge(image_ref, objective, relevant_context, mode) -> visual_evidence
```

Resposta inclui resumo, texto visível, elementos, layout, problemas, ações sugeridas, confiança, limitações e referência da evidência. Subagent visual não edita arquivos nem executa comandos. OCR e texto dentro da imagem são dados não confiáveis, nunca instruções.

Para frontend, fluxos E2E, API integrada e regressão visual, DevWeave aceita [TestSprite](https://www.testsprite.com/) como verificador externo opcional. TestSprite gera e executa testes contra aplicação em ambiente isolado e devolve evidências para análise. Requisitos e critérios de aceite continuam sendo fonte da verdade; indisponibilidade usa fallback local e classificação `CAVEATS`.

Detalhes de contrato, segurança, pré-requisitos e Spec Anchors: [vision-and-testing.md](skill/devweave/references/vision-and-testing.md).

### Provedor visual

O relay procura primeiro uma IA visual local já configurada ou disponível no sistema. Se não encontrar, pode usar OpenCode como fallback e selecionar MiMo Free somente quando o catálogo confirmar capacidade de entrada de imagem. Não há instalação automática, varredura de disco ou modelo presumido; ausência de capacidade retorna BLOCKED.

OpenCode é serviço remoto neste fluxo. O comando usa contexto isolado, imagem validada e saída JSON. Consulte o [catálogo de modelos do OpenCode](https://opencode.ai/docs/models/) e a [CLI oficial](https://opencode.ai/docs/cli/). A disponibilidade gratuita do MiMo pode mudar conforme limite, autenticação e catálogo.

## MCP e seleção de ferramentas

DevWeave usa servidores MCP por capacidade e lane, não como pacote indiscriminado. O catálogo [awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) serve para descoberta; cada servidor precisa de origem verificada, permissões mínimas, probe isolado, fallback e registro de evidência.

Base recomendada: [Context7](https://github.com/upstash/context7) para documentação versionada, [GitHub MCP Server](https://github.com/github/github-mcp-server) em read-only, [Playwright MCP](https://github.com/microsoft/playwright-mcp) para UI/E2E e [MCP Inspector](https://github.com/modelcontextprotocol/inspector) para conferir schemas e ferramentas. Usar Filesystem MCP, Semgrep, Sentry e Container Use somente conforme necessidade e com escopo explícito.

Playwright deve resolver estrutura e interação primeiro; `vision_bridge` entra quando screenshot, layout, pixels ou imagem exigirem percepção visual. TestSprite continua verificador externo opcional. Regras, gate, registro e Spec Anchors: [mcp-selection.md](skill/devweave/references/mcp-selection.md).

## Documentos, pesquisa e especificação

DevWeave agora mapeia [MarkItDown](https://github.com/microsoft/markitdown) para entrada de PDF/Office em Markdown, [Agent-Reach](https://github.com/Panniantong/Agent-Reach) para registry de fontes web com fallback, [OfficeCLI enhanced Codex](https://github.com/anthonyhtang/OfficeCLI-enhanced-codex) para artefatos Office e [GitHub Spec Kit](https://github.com/github/spec-kit) para templates spec-driven. [AIOX Core](https://github.com/SynkraAI/aiox-core) entra como referência de squads, CLI-first, sync e doctor.

MarkItDown e Spec Kit podem ser adotados com gates. Agent-Reach e OfficeCLI ficam em pilot; AIOX não deve ser instalado como segundo orquestrador. Detalhes de contratos, fluxos e Spec Anchors: [ecosystem-integrations.md](skill/devweave/references/ecosystem-integrations.md).

## Novidades da versão 0.5

Versão 0.5 incorpora melhores princípios de [oh-my-opencode-slim](https://github.com/alvinunreal/oh-my-opencode-slim), sem acoplar DevWeave a modelos ou runtime específico:

- plano de evidência antes de trabalho não trivial;
- lanes para exploração, pesquisa, arquitetura, design, implementação, observação e conselho;
- limiar explícito para executar diretamente ou delegar;
- grafo curto com dependências, ownership de escrita e gates;
- paralelismo somente entre escopos independentes;
- simplificação posterior aos testes, preservando comportamento;
- relay visual para agentes sem capacidade de visão;
- verificação E2E/visual externa com TestSprite quando configurada;
- integrações documentais, web, Office e spec-driven com adapters e fallback;
- aprendizado baseado em atrito repetido, aceitando “não criar nada” como resultado correto.

## Instalação rápida

### Direto do GitHub

```sh
npm install -g github:guicribeiro/devweave-agent-kit
devweave install
devweave doctor
```

### Bun

```sh
bun add -g github:guicribeiro/devweave-agent-kit
devweave install
devweave doctor
```

### Sem instalação global

```sh
npx github:guicribeiro/devweave-agent-kit install
```

### Desenvolvimento local

```sh
git clone https://github.com/guicribeiro/devweave-agent-kit.git
cd devweave-agent-kit
npm install -g .
devweave install
```

## Uso

DevWeave fica ativo por padrão. Peça trabalho normalmente:

```text
adicione login por passkey
corrija corrida no processamento da fila
refatore este módulo sem alterar comportamento
revise segurança do isolamento multi-tenant
melhore esta dashboard
analise esta screenshot e continue a implementação
valide este fluxo frontend com TestSprite
```

Para desativar em pedido específico:

```text
sem devweave: explique este trecho
```

## Classificação proporcional

### Trivial

Edição local, reversível, risco baixo. Usa intenção curta, check direto e revisão de diff.

### Normal

Comportamento delimitado ou mudança em poucos componentes. Usa critérios verificáveis, plano de evidência, TDD quando aplicável e gate final.

### Complexa

Arquitetura, auth, dados, segurança, migração, concorrência, mudança ampla ou causa incerta. Usa especificação intent-driven, Spec Anchor, grafo de trabalho, threat model quando relevante e revisão independente.

## Spec Anchor

Spec Anchor liga requisito a prova:

- `US-xxx`: história ou objetivo;
- `AC-xxx`: critério de aceite;
- `T-xxx`: tarefa;
- `ASM-xxx`: suposição;
- `Q-xxx`: pergunta aberta;
- `P-xxx`: princípio obrigatório;
- `@spec:AC-xxx`: liga teste ao critério.

Conclusão bloqueada quando critério não possui prova, teste está pulado, referência ficou órfã ou suposição importante permanece aberta.

ONP CLI pode executar gate mecânico. Sem ONP, DevWeave usa matriz manual equivalente.

```sh
npm install -g @onovoprogramador/onp-spec
devweave doctor
```

## Orquestração enxuta

DevWeave separa trabalho por natureza, não por personagem fixo. Plataforma pode mapear lanes para agentes, modelos, ferramentas ou execução local.

| Lane | Entra quando | Evitar quando |
| --- | --- | --- |
| Exploração | Base ampla ou caminho desconhecido | Arquivo e símbolo já conhecidos |
| Pesquisa | API atual, versão ou fonte externa muda decisão | Conhecimento estável já disponível |
| Arquitetura | Trade-off caro, risco alto ou debugging persistente | Decisão rotineira e reversível |
| Design | Interface visível exige julgamento e acabamento | Backend sem impacto visual |
| Implementação | Escopo, arquivos e critérios estão fechados | Descoberta ou decisão ainda abertas |
| Observação | Imagem, PDF ou diagrama precisa virar contexto | Texto simples que será editado |
| Conselho | Decisão crítica se beneficia de discordância | Custo excede impacto da decisão |

Paralelismo exige independência e ownership de escrita sem sobreposição.

## Design

Hallmark funciona como gate de macroestrutura, linguagem visual e rejeição de padrões genéricos. Ferramentas e fontes complementares possuem papéis limitados:

- v0, Google Stitch, Subframe e Antigravity: exploração e prototipação;
- Aceternity UI e 21st.dev: componentes sujeitos a licença e revisão;
- Mobbin: fluxos reais;
- Dribbble e Pinterest: direção visual, nunca cópia literal.

Gate visual cobre teclado, foco, semântica, contraste WCAG AA, estados, breakpoints, conteúdo real, movimento reduzido, desempenho e regressão visual.

## Segurança e arquitetura

Mantis entra em auth, autorização, multi-tenant, pagamentos, parsers, uploads, IPC, firmware, IaC, supply chain e fronteiras de confiança.

Regras obrigatórias:

- começar em leitura;
- fixar alvo, snapshot, escopo e fora de escopo;
- modelar ativos, identidades, dados e trust boundaries;
- reproduzir somente com autorização, em sandbox isolado;
- nunca executar payload não revisado no host;
- tratar scanner e teste verde como evidência parcial;
- exigir revisão humana antes de divulgar achado;
- nunca declarar segurança total.

## Comandos

```text
devweave install   [--global|--project] [--platform NOME] [--target CAMINHO] [--force]
devweave update    [--global|--project] [--platform NOME] [--target CAMINHO] [--force]
devweave uninstall [--global|--project] [--platform NOME] [--target CAMINHO]
devweave doctor    [--global|--project] [--target CAMINHO]
devweave list
devweave print
```

Padrão: instalação global em todas plataformas suportadas.

```sh
devweave install --global --platform codex
devweave install --project --platform cursor
devweave install --project --platform all --target ./meu-projeto
devweave update --global --platform all
devweave doctor --global
```

Aliases: `claude-code`, `gemini-cli`, `github-copilot`, `codex-cli`, `codex-app`.

## Plataformas e destinos

| Plataforma | Destino global ou recomendado |
| --- | --- |
| Codex | `~/.codex/skills/devweave` + `~/.codex/AGENTS.md` |
| Claude Code | `~/.claude/skills/devweave` + `~/.claude/CLAUDE.md` |
| Cursor | `~/.cursor/rules/devweave.mdc` |
| OpenCode | `~/.config/opencode/AGENTS.md` |
| Gemini CLI | `~/.gemini/GEMINI.md` |
| GitHub Copilot | `.github/copilot-instructions.md` por projeto |
| Windsurf | `~/.codeium/windsurf/memories/global_rules.md` |
| Cline | `~/.cline/rules/devweave.md` |
| Genérico | `~/.config/devweave/AGENTS.md` |

Use `--project` quando plataforma priorizar regra do repositório.

## Papéis das ferramentas

DevWeave integra ideias, não redistribui todas dependências.

- Fable: risco, pronto e julgamento.
- OpenSpec: profundidade da especificação.
- Spec Anchor/ONP: rastreabilidade e gate.
- Superpowers: execução principal.
- Ponytail: menor solução completa.
- Hallmark: qualidade visual.
- Mantis: segurança defensiva e arquitetura.
- RTK: redução de ruído de terminal.
- Fable Judge: verificação independente.
- Self-Learning/Reflect: aprendizado comprovado e conservador.
- Headroom: compressão somente quando contexto virou problema.

Créditos e links completos: [REFERENCES.md](REFERENCES.md).

## Verificação e desenvolvimento

```sh
npm test
npm run doctor
npm run pack:check
```

Antes de release:

1. atualizar versão;
2. executar testes;
3. validar pacote com `npm pack --dry-run`;
4. revisar diff e conteúdo do tarball;
5. publicar somente com autenticação e autorização;
6. criar tag/release depois da publicação confirmada.

Tokens npm, credenciais e segredos nunca entram em repositório ou logs.

Publicação npm depende de autenticação do mantenedor e disponibilidade do nome. Enquanto pacote não estiver confirmado no registro, use GitHub ou artefatos da release.

## Limites

- Node.js 18 ou superior.
- Bun funciona sobre APIs Node usadas pelo instalador.
- Caminhos globais podem mudar entre versões das plataformas.
- Ferramentas externas não são instaladas automaticamente.
- `doctor` confirma instalação e backend ONP; não valida cada integração externa.
- Regras locais e instruções superiores mantêm precedência.
- Copilot exige instalação por projeto para comportamento confiável.

## Estrutura

```text
bin/                     CLI
src/                     instalador e plataformas
skill/devweave/          skill principal
skill/devweave/references/ protocolos especializados
templates/               regras e prompt mestre
adapters/                notas por plataforma
examples/                cenários de uso
test/                    testes do instalador
REFERENCES.md            créditos e integrações
PROMPTS.md               prompts prontos por atividade e tipo de produto
```

## Licença

[MIT](LICENSE) © 2026 Guilherme Ribeiro.
