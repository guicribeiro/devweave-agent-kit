# Orquestração enxuta

Princípios adaptados de `oh-my-opencode-slim`. DevWeave continua portável: nomes de agentes, modelos e ferramentas dependem da plataforma.

## Plano de evidência

Antes de trabalho não trivial, declarar afirmação que precisa virar verdadeira, incertezas, falhas relevantes e caminho de evidência. Derivar checks dos inputs controláveis, efeitos observáveis, estados, invariantes, fronteiras e capacidade de repetir ou reverter cenário.

Quando estado decisivo estiver indireto, criar menor affordance de verificação: fixture, probe, seam, log temporário ou harness que torne estado controlável, observável, repetível e diagnosticável. Definir se artefato é temporário ou durável.

## Lanes

- Exploração: mapa de arquivos, símbolos, padrões e dependências.
- Pesquisa: documentação atual, APIs, versões e fontes primárias.
- Arquitetura: trade-offs, risco, debugging persistente e revisão de alto impacto.
- Design: hierarquia visual, interação, responsividade e acabamento.
- Implementação: tarefa fechada, arquivos definidos, critérios e checks claros.
- Observação: imagens, PDFs e diagramas, retornando resumo estruturado.
- Conselho: perspectivas independentes para decisão rara, cara ou ambígua.

## Limiar de delegação

Executar diretamente quando houver uma ação isolada, clara e de baixo risco, e custo de delegar superar execução. Delegar quando descoberta for ampla, pesquisa externa mudar decisão, implementação for separável, design exigir julgamento visual ou risco justificar revisão independente.

Não delegar por existência de agente. Não delegar lookup conhecido, arquivo que será editado imediatamente ou tarefa cujo briefing custe mais que execução. Conselho exige alto impacto ou pedido explícito.

## Grafo de trabalho

Para tarefa normal/complexa, registrar:

1. lanes independentes executáveis agora;
2. lanes dependentes e gates;
3. ownership de escrita por arquivo ou módulo;
4. reconciliação de resultados;
5. verificação posterior à implementação.

Paralelizar somente lanes independentes. Escritores paralelos não podem compartilhar escopo. Referenciar caminhos e linhas; evitar colar arquivos inteiros. Não esperar por lane de background quando trabalho local não dependente puder continuar.

## Simplificação segura

Simplificar após comportamento passar. Preservar outputs, erros, efeitos colaterais, ordem e desempenho relevante. Seguir convenções locais. Preferir clareza a concisão e limitar refatoração ao escopo alterado. Não remover abstração que protege teste, extensibilidade ou fronteira arquitetural.

## Aprendizado conservador

Inventariar ativos existentes antes de criar skill, agente, comando ou regra. Exigir atrito repetido, inputs estáveis, output claro e condição de parada. Escolher forma menos poderosa capaz de resolver problema. Não criar artefato quando evidência for fraca.
