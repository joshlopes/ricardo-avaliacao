SET @subjectId = (SELECT id FROM Subject WHERE name = 'Matemática' OR name = 'Math' LIMIT 1);

-- Set UUID for Evaluation Category 'Números'
SET @category_numeros = UUID();
INSERT INTO EvaluationCategory (id, name, year, subjectId) VALUES (@category_numeros, 'Números', '6', @subjectId);

-- Set UUID for Evaluation Topic 'Números Naturais'
SET @topic_numeros_naturais = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_numeros_naturais, 'Números Naturais', @category_numeros);

-- Insert Subtopics for 'Números Naturais'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Representar números naturais como produto de fatores primos e reconhecer que essa decomposição é única.', @topic_numeros_naturais);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Calcular o mínimo múltiplo comum e o máximo divisor comum de dois números recorrendo aos conjuntos dos seus múltiplos e divisores e à decomposição em fatores primos.', @topic_numeros_naturais);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer o mínimo múltiplo comum e o máximo divisor comum de dois números, quando um deles é múltiplo do outro, ou quando um deles é um número primo.', @topic_numeros_naturais);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Selecionar e justificar o método mais eficiente para identificação do máximo divisor comum e mínimo múltiplo comum de um determinado par de números, atendendo às características dos números, comparando criticamente diferentes estratégias de resolução.', @topic_numeros_naturais);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Resolver problemas em que seja relevante o recurso ao cálculo de mínimo múltiplo comum e de máximo divisor comum, em diversos contextos.', @topic_numeros_naturais);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer e aplicar as regras da multiplicação e da divisão de potências com a mesma base ou o mesmo expoente.', @topic_numeros_naturais);

-- Set UUID for Evaluation Topic 'Frações'
SET @topic_fracoes = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_fracoes, 'Frações', @category_numeros);

-- Insert Subtopics for 'Frações'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Determinar a fração irredutível equivalente a uma fração dada.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Adicionar e subtrair frações, reduzindo ao mesmo denominador.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Multiplicar frações e representar geometricamente o resultado em situações simples.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer que dois números são inversos um do outro, quando o seu produto é 1.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer a fração como representação de uma medida, tomando uma unidade contínua, e explicar o significado do numerador e do denominador.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Dividir duas frações com recurso à multiplicação do dividendo pelo inverso do divisor.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Interpretar e modelar situações envolvendo potências do tipo (a/b)^n e calcular o seu valor.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Usar expressões numéricas para representar uma dada situação e vice-versa.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Calcular o valor de expressões numéricas envolvendo as quatro operações e potências, reconhecendo a importância do uso dos parênteses e o significado da prioridade das operações.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Mobilizar as propriedades das operações. Analisar, comparar e ajuizar da simplicidade e eficácia de estratégias realizadas por si e por outros, apresentando e explicando raciocínios.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Adicionar frações, recorrendo ao uso das propriedades da adição de forma a agilizar o cálculo, apresentando e explicando raciocínios e representações.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Multiplicar frações, tirando partido das propriedades da multiplicação de forma a agilizar o cálculo, apresentando e explicando raciocínios e representações.', @topic_fracoes);

-- Set UUID for Evaluation Category 'Álgebra'
SET @category_algebra = UUID();
INSERT INTO EvaluationCategory (id, name, year, subjectId) VALUES (@category_algebra, 'Álgebra', '6', @subjectId);

-- Set UUID for Evaluation Topic 'Regularidades em Sequências'
SET @topic_regularidades = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_regularidades, 'Regularidades em Sequências', @category_algebra);

-- Insert Subtopics for 'Regularidades em Sequências'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer relações, entre termos consecutivos de uma sequência numérica decrescente ou entre termos e as respetivas ordens, e formular conjeturas quanto a leis de formação das sequências.', @topic_regularidades);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Identificar e descrever em linguagem natural ou simbólica uma possível lei de formação para uma dada sequência decrescente.', @topic_regularidades);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Criar, completar e continuar sequências dadas de acordo com uma lei de formação e verificar se um dado número é elemento de uma sequência, justificando.', @topic_regularidades);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Resolver problemas que envolvam regularidades e comparar criticamente diferentes estratégias da resolução.', @topic_regularidades);

-- Set UUID for Evaluation Topic 'Proporcionalidade Direta'
SET @topic_proporcionalidade = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_proporcionalidade, 'Proporcionalidade Direta', @category_algebra);

-- Insert Subtopics for 'Proporcionalidade Direta'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer a natureza multiplicativa da relação de proporcionalidade direta e distinguir relações de proporcionalidade direta daquelas que não o são.', @topic_proporcionalidade);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer a fração como representação de uma razão entre duas partes de um mesmo todo.', @topic_proporcionalidade);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Explicar, por palavras suas, o significado da constante de proporcionalidade, razão e proporção no contexto de um problema.', @topic_proporcionalidade);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Determinar uma quantidade, dada uma outra que lhe é proporcional e conhecida a razão de proporcionalidade.', @topic_proporcionalidade);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Usar o raciocínio proporcional em situações representadas na forma de texto, tabelas ou gráficos, transitando de forma fluente entre diferentes representações.', @topic_proporcionalidade);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Resolver problemas que envolvam a interpretação e modelação de situações de proporcionalidade direta.', @topic_proporcionalidade);

-- Set UUID for Evaluation Topic 'Relações Numéricas e Algébricas'
SET @topic_relacoes = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_relacoes, 'Relações Numéricas e Algébricas', @category_algebra);

-- Insert Subtopics for 'Relações Numéricas e Algébricas'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Fazer uso das propriedades das operações e completar equivalências algébricas ou igualdade aritméticas, envolvendo quaisquer das operações com frações e números naturais.', @topic_relacoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Representar as propriedades das operações através de uma expressão algébrica.', @topic_relacoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Exprimir situações de proporcionalidade direta através de uma expressão algébrica.', @topic_relacoes);

-- Set UUID for Evaluation Category 'DADOS'
SET @category_dados = UUID();
INSERT INTO EvaluationCategory (id, name, year, subjectId) VALUES (@category_dados, 'DADOS', '6', @subjectId);

-- Set UUID for Evaluation Topic 'Questões estatísticas, recolha e organização de dados'
SET @topic_questoes_estatisticas = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_questoes_estatisticas, 'Questões estatísticas, recolha e organização de dados', @category_dados);

-- Insert Subtopics for 'Questões estatísticas, recolha e organização de dados'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Formular questões do seu interesse, sobre características quantitativas contínuas.', @topic_questoes_estatisticas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Participar na definição de quais são os dados a recolher e decidir onde devem ser recolhidos, quem inquirir e/ou o que observar.', @topic_questoes_estatisticas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Recolher dados a partir de fontes primárias ou sítios credíveis na Internet (dados contínuos agrupados em classes e não agrupados/listas), através de um dado método de recolha.', @topic_questoes_estatisticas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer que os dados contínuos envolvem grande variedade de números levando à necessidade de agrupar os dados em classes.', @topic_questoes_estatisticas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Construir classes de igual amplitude, sem recorrer a regras formais.', @topic_questoes_estatisticas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Usar tabelas de frequências absolutas e relativas para organizar os dados para cada uma das classes e limpar de gralhas detetadas. Usar título na tabela.', @topic_questoes_estatisticas);

-- Set UUID for Evaluation Topic 'Representações Gráficas'
SET @topic_representacoes_graficas = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_representacoes_graficas, 'Representações Gráficas', @category_dados);

-- Insert Subtopics for 'Representações Gráficas'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Representar dados que evoluem com o tempo através de gráficos de linha, incluindo fonte, título e legenda.', @topic_representacoes_graficas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Representar dados através de histogramas, usando escalas adequadas, e incluindo fonte, título e legendas.', @topic_representacoes_graficas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Analisar e comparar diferentes representações gráficas presentes nos media, discutir a sua adequabilidade e concluir criticamente sobre eventuais efeitos de manipulações gráficas, desenvolvendo a literacia estatística.', @topic_representacoes_graficas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Decidir criticamente sobre qual(is) as representações gráficas a adotar e justificar a(s) escolha(s).', @topic_representacoes_graficas);

-- Set UUID for Evaluation Topic 'Análise de Dados'
SET @topic_analise_dados = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_analise_dados, 'Análise de Dados', @category_dados);

-- Insert Subtopics for 'Análise de Dados'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer a(s) classe(s) modal(ais) como a classe que apresenta maior frequência e identificá-la.', @topic_analise_dados);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Analisar criticamente qual(ais) a(s) medida(s) resumo apropriadas para resumir os dados, em função da sua natureza.', @topic_analise_dados);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Ler, interpretar e discutir a distribuição dos dados, salientando criticamente os aspetos mais relevantes.', @topic_analise_dados);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Retirar conclusões, fundamentar decisões e colocar novas questões suscitadas pelas conclusões obtidas.', @topic_analise_dados);

-- Set UUID for Evaluation Topic 'Comunicação e divulgação de um estudo'
SET @topic_comunicacao_estudo = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_comunicacao_estudo, 'Comunicação e divulgação de um estudo', @category_dados);

-- Insert Subtopics for 'Comunicação e divulgação de um estudo'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Divulgar o estudo com recurso a um relatório, contando a história que está por detrás dos dados, e questões emergentes para estudos futuros, comunicando de forma fluente e adequada ao público a que se destina.', @topic_comunicacao_estudo);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Elaborar infográficos digitais de modo a divulgar o estudo de forma rigorosa, eficaz e não enganadora.', @topic_comunicacao_estudo);

-- Set UUID for Evaluation Topic 'Probabilidades'
SET @topic_probabilidades = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_probabilidades, 'Probabilidades', @category_dados);

-- Insert Subtopics for 'Probabilidades'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Identificar situações aleatórias em que seja razoável admitir ou não a existência de resultados com igual possibilidade de se verificarem.', @topic_probabilidades);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer que as probabilidades de acontecimentos que tenham igual possibilidade de se verificarem são iguais.', @topic_probabilidades);

-- Set UUID for Evaluation Category 'Geometria e Medida'
SET @category_geometria = UUID();
INSERT INTO EvaluationCategory (id, name, year, subjectId) VALUES (@category_geometria, 'Geometria e Medida', '6', @subjectId);

-- Set UUID for Evaluation Topic 'Figuras Planas'
SET @topic_figuras_planas = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_figuras_planas, 'Figuras Planas', @category_geometria);

-- Insert Subtopics for 'Figuras Planas'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Distinguir polígonos côncavos de polígonos convexos.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Distinguir polígonos regulares de polígonos irregulares.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Resolver problemas que envolvam polígonos regulares e irregulares.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer a relação de proporcionalidade direta entre o perímetro e o diâmetro de uma circunferência e designar por π a constante de proporcionalidade, estabelecendo a articulação com a álgebra.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Conhecer a expressão para a medida da área do círculo.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Resolver problemas que envolvam a determinação das medidas do perímetro e da área do círculo, em diversos contextos.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Classificar ângulos suplementares e complementares e reconhecer a invariância da amplitude do ângulo soma.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Conjeturar sobre a soma dos ângulos internos e externos de um triângulo e explicar a relação encontrada.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Resolver problemas envolvendo as propriedades dos triângulos.', @topic_figuras_planas);

-- Set UUID for Evaluation Topic 'Figuras no espaço'
SET @topic_figuras_espaco = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_figuras_espaco, 'Figuras no espaço', @category_geometria);

-- Insert Subtopics for 'Figuras no espaço'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Compreender o que é o volume de um objeto e explicar por palavras suas.', @topic_figuras_espaco);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Medir o volume de um objeto, usando unidades de medida não convencionais e unidades convencionais (metro cúbico e o centímetro cúbico) adequadas.', @topic_figuras_espaco);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer a correspondência entre o decímetro cúbico e o litro.', @topic_figuras_espaco);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Generalizar a expressão da medida do volume do paralelepípedo relacionando-a com a contagem estruturada do número de cubos unitários existentes num paralelepípedo.', @topic_figuras_espaco);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Generalizar a expressão da medida do volume do cubo relacionando-a com a expressão da medida do volume do paralelepípedo.', @topic_figuras_espaco);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Conhecer a expressão da medida do volume para o cilindro.', @topic_figuras_espaco);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Interpretar e modelar situações que envolvam volumes de paralelepípedos e cilindros ou sólidos decomponíveis em paralelepípedos e cilindros, e resolver problemas associados.', @topic_figuras_espaco);

-- Set UUID for Evaluation Topic 'Operações com Figuras'
SET @topic_operacoes_figuras = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_operacoes_figuras, 'Operações com Figuras', @category_geometria);

-- Insert Subtopics for 'Operações com Figuras'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Construir as imagens de um ponto por rotação, com um centro fixo e diferentes ângulos, e reconhecer que todas estão contidas numa circunferência cujo centro é o centro de rotação.', @topic_operacoes_figuras);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Construir a imagem de polígonos (triângulos ou quadriláteros) por rotação dado o centro e o ângulo orientado, usando régua, compasso e transferidor ou um AGD.', @topic_operacoes_figuras);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Analisar as simetrias de rotação de rosáceas e explicar a forma como foram construídas, relacionando o ângulo mínimo de rotação com as características das rosáceas.', @topic_operacoes_figuras);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Relacionar, para rosáceas com simetria de reflexão, o número de eixos de simetria com a medida da amplitude do ângulo mínimo de rotação.', @topic_operacoes_figuras);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Construir as imagens de uma figura, por rotações sucessivas, de modo a formar uma rosácea.', @topic_operacoes_figuras);

-- Set UUID for Evaluation Category 'Capacidades Matemáticas'
SET @category_capacidades = UUID();
INSERT INTO EvaluationCategory (id, name, year, subjectId) VALUES (@category_capacidades, 'Capacidades Matemáticas', '6', @subjectId);

-- Set UUID for Evaluation Topic 'Resolução de Problemas'
SET @topic_resolucao_problemas = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_resolucao_problemas, 'Resolução de Problemas', @category_capacidades);

-- Insert Subtopics for 'Resolução de Problemas'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer e aplicar as etapas do processo de resolução de problemas.', @topic_resolucao_problemas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Formular problemas a partir de uma situação dada, em contextos diversos (matemáticos e não matemáticos).', @topic_resolucao_problemas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Aplicar e adaptar estratégias diversas de resolução de problemas, em diversos contextos, nomeadamente com recurso à tecnologia.', @topic_resolucao_problemas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer a correção, a diferença e a eficácia de diferentes estratégias da resolução de um problema.', @topic_resolucao_problemas);

-- Set UUID for Evaluation Topic 'Raciocínio Matemático'
SET @topic_raciocinio_matematico = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_raciocinio_matematico, 'Raciocínio Matemático', @category_capacidades);

-- Insert Subtopics for 'Raciocínio Matemático'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Formular e testar conjeturas/generalizações, a partir da identificação de regularidades comuns a objetos em estudo, nomeadamente recorrendo à tecnologia.', @topic_raciocinio_matematico);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Classificar objetos atendendo às suas características.', @topic_raciocinio_matematico);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Distinguir entre testar e validar uma conjetura.', @topic_raciocinio_matematico);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Justificar que uma conjetura/generalização é verdadeira ou falsa, usando progressivamente a linguagem simbólica.', @topic_raciocinio_matematico);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer a correção, diferença e adequação de diversas formas de justificar uma conjetura/generalização.', @topic_raciocinio_matematico);

-- Set UUID for Evaluation Topic 'Pensamento Computacional'
SET @topic_pensamento_computacional = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_pensamento_computacional, 'Pensamento Computacional', @category_capacidades);

-- Insert Subtopics for 'Pensamento Computacional'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Extrair a informação essencial de um problema.', @topic_pensamento_computacional);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Estruturar a resolução de problemas por etapas de menor complexidade de modo a reduzir a dificuldade do problema.', @topic_pensamento_computacional);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer ou identificar padrões e regularidades no processo de resolução de problemas e aplicá-los em outros problemas semelhantes.', @topic_pensamento_computacional);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Desenvolver um procedimento (algoritmo) passo a passo para solucionar o problema nomeadamente recorrendo à tecnologia.', @topic_pensamento_computacional);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Procurar e corrigir erros, testar, refinar e otimizar uma dada resolução apresentada.', @topic_pensamento_computacional);

-- Set UUID for Evaluation Topic 'Comunicação Matemática'
SET @topic_comunicacao_matematica = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_comunicacao_matematica, 'Comunicação Matemática', @category_capacidades);

-- Insert Subtopics for 'Comunicação Matemática'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Descrever a sua forma de pensar acerca de ideias e processos matemáticos, oralmente e por escrito.', @topic_comunicacao_matematica);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Ouvir os outros, questionar e discutir as ideias de forma fundamentada, e contrapor argumentos.', @topic_comunicacao_matematica);

-- Set UUID for Evaluation Topic 'Representações Matemáticas'
SET @topic_representacoes_matematicas = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_representacoes_matematicas, 'Representações Matemáticas', @category_capacidades);

-- Insert Subtopics for 'Representações Matemáticas'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Ler e interpretar ideias e processos matemáticos expressos por representações diversas.', @topic_representacoes_matematicas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Usar representações múltiplas para demonstrar compreensão, raciocinar e exprimir ideias e processos matemáticos, em especial linguagem verbal e diagramas.', @topic_representacoes_matematicas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Estabelecer conexões e conversões entre diferentes representações relativas às mesmas ideias/processos matemáticos, nomeadamente recorrendo à tecnologia.', @topic_representacoes_matematicas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Usar a linguagem simbólica matemática e reconhecer o seu valor para comunicar sinteticamente e com precisão.', @topic_representacoes_matematicas);

-- Set UUID for Evaluation Topic 'Conexões Matemáticas'
SET @topic_conexoes_matematicas = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_conexoes_matematicas, 'Conexões Matemáticas', @category_capacidades);

-- Insert Subtopics for 'Conexões Matemáticas'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer e usar conexões entre ideias matemáticas de diferentes temas, e compreender esta ciência como coerente e articulada.', @topic_conexoes_matematicas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Aplicar ideias matemáticas na resolução de problemas de contextos diversos (outras áreas do saber, realidade, profissões).', @topic_conexoes_matematicas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Interpretar matematicamente situações do mundo real, construir modelos matemáticos adequados, e reconhecer a utilidade e poder da Matemática na previsão e intervenção nessas situações.', @topic_conexoes_matematicas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Identificar a presença da Matemática em contextos externos e compreender o seu papel na criação e construção da realidade.', @topic_conexoes_matematicas);
