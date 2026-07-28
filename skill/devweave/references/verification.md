# Fable Judge

Verificar estado real, não relatório anterior.

1. Ler critérios de pronto.
2. Inspecionar diff e arquivos afetados.
3. Executar testes/checks relevantes.
4. Confirmar que teste não foi removido ou enfraquecido.
5. Procurar mudança fora de escopo, warning e regressão.
6. Classificar:
   - VERIFIED: evidência sustenta conclusão;
   - CAVEATS: núcleo funciona, limitações explícitas permanecem;
   - REFUTED: critério falhou ou evidência falta.

Não promover aprendizado em CAVEATS incerto ou REFUTED.
