---
name: devweave
description: Fluxo always-on para todo trabalho de desenvolvimento de software. Aplicar automaticamente em toda feature, bug, refatoração, arquitetura, API, banco, segurança, interface, diagnóstico, revisão ou mudança de código, mesmo quando usuário não mencionar DevWeave. Classificar risco, definir pronto, especificar proporcionalmente, escolher solução mínima, usar TDD, revisar e verificar de forma independente, com fallbacks para Graphify, OpenSpec, UI UX Pro Max, Superpowers, Ponytail, RTK, Fable Judge, Self-Learning, Headroom e formato i-have-adhd.
---

# DevWeave

Aplicar automaticamente em toda tarefa de desenvolvimento. Preservar instruções superiores e regras locais. Não exigir ferramenta opcional.

## Manter sempre ativo

- Tratar DevWeave como fluxo padrão de engenharia, mesmo sem menção explícita.
- Aplicar classificação e verificação em toda mudança de código.
- Ajustar profundidade ao risco; always-on não significa criar cerimônia para tarefa trivial.
- Não aplicar fluxo completo em conversa geral sem ação de desenvolvimento.
- Permitir opt-out somente quando usuário disser `sem devweave` ou regra superior desativar fluxo.

## Executar fluxo

1. Classificar com Fable:
   - trivial: edição local, baixo risco;
   - normal: comportamento delimitado;
   - complexa: arquitetura, auth, dados, segurança, migração, mudança ampla ou causa incerta.
2. Definir critérios de pronto e evidências antes de editar.
3. Entender base. Usar Graphify somente para repositório grande/desconhecido ou dependências entre módulos. Usar busca e leitura seletiva como fallback.
4. Escolher OpenSpec:
   - minimalist para mudança pequena;
   - behaviour-driven para comportamento comum;
   - intent-driven para mudança complexa ou difícil de reverter.
5. Para interface, ler [references/ui.md](references/ui.md). Não ativar UI UX para backend puro.
6. Planejar e implementar usando Superpowers como fluxo principal. Não ativar outro orquestrador completo.
7. Aplicar Ponytail antes de criar código: reutilizar projeto, stdlib, plataforma e dependência existente; escrever menor solução completa e legível.
8. Para comportamento, aplicar TDD: falha observada, implementação mínima, sucesso observado, refatoração.
9. Usar RTK quando disponível. Recuperar saída completa quando compactação esconder causa.
10. Verificar com Fable Judge: inspecionar diff, reexecutar checks, validar critérios, detectar teste enfraquecido e mudança fora de escopo.
11. Classificar resultado VERIFIED, CAVEATS ou REFUTED.
12. Registrar Self-Learning só após procedimento reutilizável comprovado. Exigir falha nomeada, alternativa rejeitada e check passando. Nunca registrar segredo.

## Controlar opções

- Headroom: usar somente quando contexto grande for problema demonstrado.
- i-have-adhd: usar somente quando solicitado/habilitado; pôr próxima ação primeiro e limitar tangentes.
- Subagentes: usar somente quando regras vigentes autorizarem e tarefas forem independentes.
- Deploy, merge, exclusão de dados e ações irreversíveis: exigir autorização explícita.

## Carregar referências

- Ler [references/specification.md](references/specification.md) para escolher artefatos OpenSpec.
- Ler [references/verification.md](references/verification.md) antes de concluir trabalho substantivo.
- Ler [references/compatibility.md](references/compatibility.md) ao adaptar fluxo para outra CLI/IDE.

## Relatar

Informar resultado, mudanças, checks executados, estado de verificação, limitações e próxima ação útil. Nunca alegar execução ou publicação sem evidência.
