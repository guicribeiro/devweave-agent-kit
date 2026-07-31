# Mantis: segurança, arquitetura e testes adversariais

Usar Google Mantis como base modular de revisão defensiva. Usar Work Mantis como adaptação de domínio e contrato de evidência. DevWeave continua governando risco, escopo, especificação e entrega.

## Ativar

Ativar para auth, autorização, dados sensíveis, multi-tenant, pagamentos, parsers, uploads, IPC, firmware, IaC, supply chain, fronteiras de confiança ou mudança arquitetural relevante. Para código comum, usar somente checklist proporcional.

## Pipeline proporcional

1. Fixar alvo, snapshot, escopo autorizado, fora de escopo e limites do ambiente.
2. Mapear arquitetura, ativos, identidades, dados e trust boundaries.
3. Criar threat model priorizado por impacto, viabilidade e exposição.
4. Planejar checks seguros; deduplicar hipóteses e criticar falso positivo.
5. Reproduzir somente quando autorizado, em sandbox isolado e descartável. Desabilitar rede quando ela não for requisito. Nunca executar payload gerado ou código não revisado no host.
6. Corrigir com mudança mínima e teste de regressão. Reexecutar checks relevantes.
7. Calibrar severidade, confiança e risco residual. Exigir revisão humana antes de divulgar achado ou declarar correção definitiva.

## Contrato de evidência

Cada achado inclui ID, snapshot, componente e localização, pré-condições, comportamento observado, impacto, severidade, confiança, procedimento seguro, limitações, correção, teste de regressão e status.

Falha de reprodução não prova falso positivo. Teste verde isolado não prova segurança. Scanner não substitui análise. Não armazenar, imprimir ou transmitir segredos e dados reais.

## Gate

- PASS: evidência suficiente, checks passam, risco residual aceito.
- WARN: limitação conhecida ou revisão humana pendente sem risco crítico confirmado.
- BLOCK: escopo incerto, isolamento ausente, evidência crítica faltando, teste enfraquecido, segredo exposto, bypass de autorização, vazamento cross-tenant, perda de dados ou vulnerabilidade alta/crítica confirmada.
