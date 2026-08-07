# Verificação local: DevWeave Verify e DevWeave Harness

DevWeave pode validar comportamento sem depender de API key, dashboard ou serviço
cloud. Esta referência define contrato portátil para adapters instalados no projeto.
O agent kit fornece orientação; cada projeto decide quais scripts e servidores MCP
serão implementados.

## DevWeave Verify

Usar para frontend, fluxo E2E ou API integrada em ambiente local:

```text
intenção → plano versionado → execução local → snapshot/evidência → correção → rerun
```

Regras:

- preferir URL local e bloquear navegação externa por padrão;
- manter plano separado de resultado, evidência e metadados de execução;
- ligar cada passo a `US-xxx`, `AC-xxx` ou `T-xxx` quando houver Spec Anchor;
- nunca gravar senha, token, cookie, header secreto ou valor preenchido em artefato;
- guardar snapshot mínimo e sanitizado, não DOM bruto sem necessidade;
- classificar indisponibilidade do adapter como `CAVEATS`, nunca como `VERIFIED`;
- nunca executar contra produção sem autorização explícita e escopo confirmado.

Um adapter MCP pode expor nomes estreitos como:

```text
devweave_verify_begin
devweave_verify_navigate
devweave_verify_snapshot
devweave_verify_click
devweave_verify_fill
devweave_verify_assert
devweave_verify_finish
```

Esses nomes descrevem contrato de capacidade. Não presumir que todo projeto possui
implementação. Se não houver adapter, usar teste local existente e registrar limite.

## DevWeave Harness

Usar para avaliar se loop de trabalho possui contexto, controle, validação, entrega
e aprendizado observáveis. Analisar somente arquivos e comandos do projeto.

| Dimensão | Pergunta |
|---|---|
| Task Understanding | Intenção, contexto, risco e próximo passo estão roteados? |
| Controlled Execution | Ferramentas, permissões e rotas possuem limites? |
| Change Validation | Mudança recebeu check relevante e revalidação? |
| Reliable Delivery | Aceite, aprovação e recuperação possuem prova? |
| Learning Capture | Recorrência e melhoria posterior possuem episódios comparáveis? |

Estados de evidência:

- `Missing`: superfície esperada não foi encontrada;
- `Present`: declaração ou artefato existe;
- `Wired`: regra, ferramenta ou rota está conectada ao fluxo;
- `Exercised`: check autorizado executou e retornou resultado;
- `Unobserved`: não há evidência autorizada para afirmar comportamento ou resultado;
- `Not applicable`: dimensão não pertence ao escopo declarado.

Não converter contagem de arquivos, documentação ou uma única execução em score de
maturidade. Uma execução verde prova exercício daquele check, não melhoria longitudinal.

Um adapter MCP pode expor:

```text
devweave_harness_analyze(depth, runChecks?)
devweave_harness_read(runId)
```

Resposta mínima:

```json
{
  "status": "success",
  "assessment": "VERIFIED|CAVEATS|BLOCK",
  "summary": "...",
  "runId": "...",
  "artifacts": {},
  "nextActions": []
}
```

Relatório deve separar `evidence`, `findings`, `report` e `meta`. Caminhos sempre
relativos ao workspace. `runId` deve rejeitar escape de caminho. Checks devem ser
allowlisted e opt-in; nunca executar comando arbitrário vindo de plano, prompt ou
arquivo analisado.

## Fronteira de dados

Por padrão, não ler:

- transcript, memória de usuário, cache de host ou user-home;
- `.env`, credenciais, tokens, chaves privadas ou dados reais;
- rede, serviços externos ou produção;
- estado de plugin instalado como se fosse evidência de uso.

Sessoes, aprovação externa, rollback e melhoria posterior permanecem `Unobserved`
quando não houver fonte autorizada e comparável. Ausência de evidência vira próxima
ação, não afirmação inventada.

## Gate DevWeave

1. Definir escopo, suposições e AC/T.
2. Rodar análise estática local.
3. Selecionar check allowlisted relevante.
4. Executar check com evidência sanitizada.
5. Inspecionar diff e reabrir relatório.
6. Emitir `VERIFIED`, `CAVEATS` ou `REFUTED`.

TestSprite pode complementar fluxo E2E como verificador externo. Não substitui
requisitos, AC, revisão de diff ou evidência local.
