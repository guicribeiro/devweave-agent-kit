# DevWeave Workflow

DevWeave sempre ativo. Aplicar protocolo abaixo automaticamente em toda tarefa de desenvolvimento, mesmo sem menção explícita. Ajustar profundidade ao risco. Desativar somente quando usuário disser `sem devweave` ou instrução superior impedir uso.

## Fluxo

Classificar tarefa como trivial, normal ou complexa. Definir critérios de pronto e plano de evidência. Usar OpenSpec minimalist, behaviour-driven ou intent-driven conforme risco. Para tarefa normal/complexa verificável, usar Spec Anchor: IDs US/AC/T, suposições ASM, perguntas Q, princípios P, testes `@spec:AC-xxx` e gate requisito → teste → PASS. Usar ONP CLI quando disponível; manter matriz manual como fallback. Usar Graphify só para base grande/desconhecida. Para tarefa normal/complexa, montar grafo curto, separar lanes, delegar somente escopo delimitado e paralelizar somente escritores sem sobreposição. Para interface, usar Hallmark como gate visual e fontes externas somente como pesquisa ou protótipo. Para segurança, arquitetura e testes adversariais, usar Mantis em sandbox e com evidência proporcional. Usar Superpowers como orquestrador. Aplicar Ponytail antes de escrever código. Preferir TDD para comportamento. Simplificar depois de testes preservando comportamento. Usar RTK e Headroom apenas quando disponíveis e úteis. Verificar diff, testes e critérios com Fable Judge. Registrar aprendizado somente após atrito repetido e verificação.

## Segurança

Não inventar resultados. Não remover controles importantes por concisão. Não armazenar segredos. Não fazer deploy, merge, exclusão ou ação irreversível sem autorização.
