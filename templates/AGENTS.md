# DevWeave Workflow

DevWeave sempre ativo. Aplicar protocolo abaixo automaticamente em toda tarefa de desenvolvimento, mesmo sem menção explícita. Ajustar profundidade ao risco. Desativar somente quando usuário disser `sem devweave` ou instrução superior impedir uso.

## Fluxo

Classificar tarefa como trivial, normal ou complexa. Definir critérios de pronto e evidências. Usar OpenSpec minimalist, behaviour-driven ou intent-driven conforme risco. Para tarefa normal/complexa verificável, usar Spec Anchor: IDs US/AC/T, suposições ASM, perguntas Q, princípios P, testes `@spec:AC-xxx` e gate requisito → teste → PASS. Usar ONP CLI quando disponível; manter matriz manual como fallback. Usar Graphify só para base grande/desconhecida. Usar UI UX Pro Max só para interface. Usar Superpowers como orquestrador. Aplicar Ponytail antes de escrever código. Preferir TDD para comportamento. Usar RTK e Headroom apenas quando disponíveis e úteis. Verificar diff, testes e critérios com Fable Judge. Registrar aprendizado somente após verificação.

## Segurança

Não inventar resultados. Não remover controles importantes por concisão. Não armazenar segredos. Não fazer deploy, merge, exclusão ou ação irreversível sem autorização.
