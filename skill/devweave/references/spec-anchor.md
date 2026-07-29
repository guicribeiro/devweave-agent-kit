# Spec Anchor

Manter especificação ligada ao código e aos testes. Usar como camada de auditoria, não como segundo orquestrador.

## Ativar

Ativar para tarefa normal ou complexa quando houver vários critérios, regra de negócio, segurança, dados, CI ou risco de drift. Pular para mudança trivial, texto, formatação ou protótipo descartável.

## Rastrear

Usar IDs estáveis:

- `US-001`: história;
- `AC-001`: critério de aceite em Dado/Quando/Então;
- `T-001`: tarefa com referências e arquivos;
- `ASM-001`: suposição;
- `Q-001`: pergunta aberta;
- `P-001`: princípio obrigatório.

Ligar teste ao critério no título ou comentário:

```text
AC-001: bloqueia acesso indevido @spec:AC-001
```

## Bloquear conclusão

Não marcar concluído quando:

- história não tiver critério;
- critério não tiver teste;
- teste estiver falhando, pulado ou obsoleto;
- teste apontar para critério inexistente;
- tarefa concluída tiver critério sem prova;
- suposição permanecer aberta;
- princípio obrigatório não tiver verificação executável;
- mudança de código invalidar última verificação.

## Usar motor ONP

Quando `onp-spec` estiver disponível, usar motor para scaffold, verify e audit conforme projeto. Tratar exit code como gate. Não copiar alegação textual como prova.

Quando indisponível, manter matriz manual:

```text
AC | Teste | Resultado | Arquivo | Revisão
```

Fable Judge deve reexecutar provas. Superpowers continua dono de planejamento, worktrees, implementação e commits.

## Constituição

Registrar regras críticas como `P-xxx [DEVE]` com teste, padrão obrigatório ou padrão proibido. Usar para segurança, privacidade, arquitetura e proteção de dados.

## Crédito

Modelo inspirado no projeto MIT `onovoprogramador/onp-spec-driven`. Não representar integração como autoria própria nem declarar benchmark externo.
