# DevWeave: protocolo mestre

DevWeave está sempre ativo para trabalho de desenvolvimento. Aplique protocolo automaticamente, mesmo sem menção explícita. Preserve instruções superiores e regras locais. Não assuma que ferramentas opcionais estão instaladas.

## Ativação permanente

- Executar DevWeave em toda feature, bug, refatoração, arquitetura, diagnóstico, revisão e mudança de código.
- Ajustar profundidade ao risco. Tarefa trivial recebe fluxo curto; tarefa complexa recebe especificação completa.
- Não forçar cerimônia em conversa geral sem trabalho de engenharia.
- Desativar somente quando usuário disser `sem devweave` ou instrução superior impedir uso.

## Roteamento

1. Classifique tarefa com Fable:
   - trivial: mudança local, baixo risco;
   - normal: novo comportamento delimitado;
   - complexa: arquitetura, auth, dados, segurança, migração, refatoração ampla ou causa incerta.
2. Defina “pronto” e evidências antes de editar.
3. Use Graphify somente em repositório grande/desconhecido ou mudança entre módulos. Se indisponível, use busca, referências e grafo mental.
4. Especifique com OpenSpec:
   - minimalist: mudança pequena;
   - behaviour-driven: comportamento normal;
   - intent-driven: mudança complexa ou difícil de reverter.
5. Use UI UX Pro Max somente para interface. Transforme sugestões em critérios verificáveis de acessibilidade, responsividade e estados.
6. Use Superpowers como fluxo principal: entender, planejar, isolar mudança, implementar, testar, revisar, concluir.
7. Aplique Ponytail: reutilize código existente, stdlib, recurso nativo e dependência já instalada antes de criar abstração.
8. Para comportamento novo, prefira TDD: teste falhando, implementação mínima, teste passando, refatoração.
9. Use RTK quando disponível para reduzir ruído de terminal. Reabra log completo quando diagnóstico exigir.
10. Execute Fable Judge antes de concluir: inspecione diff real, rode verificações, valide critérios e classifique VERIFIED, CAVEATS ou REFUTED.
11. Registre Self-Learning somente após prova: procedimento reutilizável, falha nomeada, alternativa rejeitada e verificação passando. Nunca registre segredo.
12. Use Headroom somente quando volume de contexto for problema demonstrado.
13. Use formato i-have-adhd somente quando habilitado: próxima ação primeiro, etapas curtas, poucas tangentes.

## Guardrails

- Não invente disponibilidade, resultados, publicação, testes ou integração.
- Não misture vários orquestradores. Superpowers governa execução; demais módulos têm papéis limitados.
- Não sacrifique segurança, validação, acessibilidade, tratamento de erro ou proteção contra perda de dados para reduzir código.
- Não faça deploy, merge, exclusão de dados ou ação irreversível sem autorização.
- Preserve mudanças existentes do usuário.
- Se ferramenta opcional faltar, continue com fallback equivalente e informe limitação.

## Relatório final

Entregue resultado, arquivos alterados, verificações executadas, estado VERIFIED/CAVEATS/REFUTED e próxima ação útil.
