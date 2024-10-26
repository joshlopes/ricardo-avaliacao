SET @subjectId = (SELECT id FROM Subject WHERE name = 'Matemática' OR name = 'Math' LIMIT 1);

-- Set UUID for Evaluation Category 'Números'
SET @category_numeros = UUID();
INSERT INTO EvaluationCategory (id, name, year, subjectId) VALUES (@category_numeros, 'Números', '5', @subjectId);

-- Set UUID for Evaluation Topic 'Números Naturais'
SET @topic_numeros_naturais = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_numeros_naturais, 'Números Naturais', @category_numeros);

-- Insert Subtopics for 'Números Naturais'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer que um número é divisor de um número diferente de zero quando o resto da divisão inteira do maior pelo menor é zero.', @topic_numeros_naturais);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Identificar múltiplos de um número, divisores de um número e relacionar múltiplos e divisores de um mesmo número.', @topic_numeros_naturais);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer que qualquer número diferente de zero é múltiplo e divisor de si próprio e que 1 é divisor de todo o número natural.', @topic_numeros_naturais);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Representar os conjuntos de múltiplos e divisores de um número e reconhecer que há um número finito de divisores de um número e uma infinidade de múltiplos de um número.', @topic_numeros_naturais);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer que um múltiplo de um múltiplo de um número é múltiplo deste número e, analogamente, para os divisores, conjeturando e justificando a relação.', @topic_numeros_naturais);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Identificar os números primos menores que 100.', @topic_numeros_naturais);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Resolver problemas que envolvam números primos, em diversos contextos.', @topic_numeros_naturais);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer a potência de um número (base e expoente naturais) como um produto de fatores iguais a esse número.', @topic_numeros_naturais);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer o efeito que a multiplicação sucessiva de um número natural (maior do que um) por si próprio produz na grandeza do número obtido.', @topic_numeros_naturais);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Interpretar e modelar situações com fenómenos reais e enigmas envolvendo potências e resolver problemas associados.', @topic_numeros_naturais);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Escrever números como 10, 100, 1000, 10000 na forma de potência de base 10 e vice-versa.', @topic_numeros_naturais);

-- Set UUID for Evaluation Topic 'Frações, decimais e percentagens'
SET @topic_fracoes = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_fracoes, 'Frações, decimais e percentagens', @category_numeros);

-- Insert Subtopics for 'Frações, decimais e percentagens'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer e determinar frações equivalentes através de uma relação multiplicativa.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Relacionar percentagens com frações de denominador 100.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Comparar e ordenar frações e representá-las na reta numérica, comparando criticamente diferentes estratégias de resolução realizadas por si e por outros.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Comparar e ordenar decimais e representá-los na reta numérica, comparando criticamente diferentes estratégias da resolução realizadas por si e por outros.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Estabelecer relações entre frações, decimais e percentagens, no contexto da resolução de problemas.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Determinar o valor aproximado de um número, por defeito e por excesso, até às centésimas.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Fazer arredondamentos no contexto da resolução de problemas, até às centésimas.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Adicionar e subtrair frações, em casos em que um denominador é múltiplo do outro.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer a multiplicação de um número natural por uma fração como a adição sucessiva dessa fração.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Multiplicar uma fração por um número natural, dando significado à fração como operador.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Interpretar e modelar situações que possam ser traduzidas pela multiplicação de dois números, sendo um deles uma fração e o outro um natural, recorrendo criticamente a representações adequadas para explicar as suas ideias.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Realizar multiplicações envolvendo decimais e números naturais.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Relacionar a multiplicação de um número natural por 0,1; 0,01 e 0,001 com a sua multiplicação por 1/10 , 1/100 e 1/1000 respetivamente.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Multiplicar decimais até às centésimas.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Formular e testar conjeturas, identificando regularidades no número de casas decimais do produto de dois decimais.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Realizar divisões envolvendo decimais e números naturais.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Relacionar a divisão de um número natural por 0,1; 0,01 e 0,001 com a sua multiplicação por 10, 100 e 1000 respetivamente.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Dividir decimais até às centésimas recorrendo ao cálculo mental ou por aplicação conjunta do algoritmo de divisão de naturais e do conhecimento da multiplicação e divisão de um natural por um decimal da forma 0,1 ou 0,01 ou 0,001.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Compreender e usar com fluência estratégias de cálculo mental (com apoio em registos intermédios) para a adição e subtração de frações, mobilizando as propriedades das operações, para produzir estimativas de cálculo ou valor exato de um cálculo.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Desenvolver e usar estratégias de cálculo mental com decimais, tirando partido da regra da multiplicação e divisão por 10, 100, 1000 e 0,1; 0,01 e 0,001, das propriedades das operações e da relação entre a multiplicação e divisão, comunicando de forma fluente.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Analisar, comparar e ajuizar a adequação das estratégias de cálculo mental realizadas por si e por outros, apresentando e explicando os seus raciocínios.', @topic_fracoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Decidir da razoabilidade do resultado de uma operação obtida por qualquer um dos processos (algoritmo, cálculo mental, calculadora).', @topic_fracoes);

-- Set UUID for Evaluation Category 'Álgebra'
SET @category_algebra = UUID();
INSERT INTO EvaluationCategory (id, name, year, subjectId) VALUES (@category_algebra, 'Álgebra', '5', @subjectId);

-- Set UUID for Evaluation Topic 'Regularidades em Sequências'
SET @topic_regularidades = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_regularidades, 'Regularidades em Sequências', @category_algebra);

-- Insert Subtopics for 'Regularidades em Sequências'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Justificar conjeturas que envolvam relações entre o termo de uma sequência de crescimento, em particular geométrica, e a sua ordem (pensamento funcional) sem necessidade de recorrer ao termo anterior (pensamento recursivo).', @topic_regularidades);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Identificar e descrever em linguagem natural, pictórica e simbólica, uma possível lei de formação para uma sequência de crescimento dada, transitando de forma fluente entre diferentes representações.', @topic_regularidades);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Criar, completar e continuar sequências numéricas dadas de acordo com uma lei de formação e verificar se um dado número é elemento de uma sequência, justificando.', @topic_regularidades);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Resolver problemas que envolvam regularidades e comparar criticamente diferentes estratégias da resolução.', @topic_regularidades);

-- Set UUID for Evaluation Topic 'Relações Numéricas e Algébricas'
SET @topic_relacoes = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_relacoes, 'Relações Numéricas e Algébricas', @category_algebra);

-- Insert Subtopics for 'Relações Numéricas e Algébricas'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Identificar propriedades de elementos de um conjunto ou relações entre os seus elementos, e descrevê-las por palavras, desenhos ou expressões algébricas, apresentando e explicando raciocínios e representações.', @topic_relacoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Exprimir, em linguagem simbólica, relações e propriedades simples descritas em linguagem natural e reciprocamente, ouvindo os outros e discutindo de forma fundamentada.', @topic_relacoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Determinar o valor de uma expressão algébrica quando se atribui um valor numérico à letra.', @topic_relacoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Resolver problemas que envolvam expressões algébricas, em diversos contextos.', @topic_relacoes);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Identificar expressões algébricas equivalentes, relacionando-as com o seu significado no contexto, e justificar por palavras próprias.', @topic_relacoes);

-- Set UUID for Evaluation Category 'DADOS'
SET @category_dados = UUID();
INSERT INTO EvaluationCategory (id, name, year, subjectId) VALUES (@category_dados, 'DADOS', '5', @subjectId);

-- Set UUID for Evaluation Topic 'Questões estatísticas, recolha e organização de dados'
SET @topic_questoes_estatisticas = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_questoes_estatisticas, 'Questões estatísticas, recolha e organização de dados', @category_dados);

-- Insert Subtopics for 'Questões estatísticas, recolha e organização de dados'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Formular questões de interesse dos alunos, sobre características qualitativas e quantitativas discretas.', @topic_questoes_estatisticas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Participar na definição de quais são os dados a recolher e decidir onde devem ser recolhidos, incluindo fontes primárias ou secundárias, e quem inquirir e/ou o que observar.', @topic_questoes_estatisticas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Participar criticamente na seleção do método de recolha de dados num estudo, identificando como observar ou inquirir (pergunta direta) e como responder (pública/secreta).', @topic_questoes_estatisticas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Selecionar o método de recolha dos dados, em especial questionários simples.', @topic_questoes_estatisticas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer que diferentes técnicas de recolha de dados (respostas autoselecionadas, entrevista direta (oral) versus por escrito) têm implicações para as conclusões do estudo.', @topic_questoes_estatisticas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Construir questionários simples, com questões de resposta fechada, com recurso a tecnologia, e aplicá-los.', @topic_questoes_estatisticas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Usar tabelas de frequências absolutas e relativas (em percentagem) para registar e organizar os dados e limpar de gralhas detetadas. Usar título na tabela.', @topic_questoes_estatisticas);

-- Set UUID for Evaluation Topic 'Representações Gráficas'
SET @topic_representacoes_graficas = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_representacoes_graficas, 'Representações Gráficas', @category_dados);

-- Insert Subtopics for 'Representações Gráficas'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Representar dados através de gráficos circulares de frequências relativas.', @topic_representacoes_graficas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Representar dados através de gráficos de barras de frequências relativas, usando escalas adequadas, e incluindo fonte, título e legendas.', @topic_representacoes_graficas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Representar conjuntos de dados (qualitativos e/ou quantitativos discretos) através de gráficos barras justapostas (frequências absolutas e relativas), usando escalas adequadas, e incluindo fonte, título e legendas.', @topic_representacoes_graficas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Analisar e comparar diferentes representações gráficas presentes nos media, discutir a sua adequabilidade e concluir criticamente sobre eventuais efeitos de manipulações gráficas, desenvolvendo a literacia estatística.', @topic_representacoes_graficas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Decidir criticamente sobre qual(is) as representações gráficas a adotar e justificar a(s) escolha(s).', @topic_representacoes_graficas);

-- Set UUID for Evaluation Topic 'Análise de Dados'
SET @topic_analise_dados = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_analise_dados, 'Análise de Dados', @category_dados);

-- Insert Subtopics for 'Análise de Dados'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Identificar a média como o valor resultante da distribuição equitativa do total dos dados (o ponto de equilíbrio dos dados) e interpretar o seu significado em contexto.', @topic_analise_dados);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Calcular a média com recurso a um procedimento adequado aos dados, nomeadamente dividir a soma dos valores dos dados pelo número de dados, e compreender que esta medida é sensível a cada um dos dados.', @topic_analise_dados);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Identificar qual(ais) a(s) medida(s) de resumo que são possíveis de calcular em dados qualitativos e em dados quantitativos.', @topic_analise_dados);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Ler, interpretar e discutir a distribuição dos dados, salientando criticamente os aspetos mais relevantes, ouvindo os outros e discutindo de forma fundamentada.', @topic_analise_dados);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Retirar conclusões, fundamentar decisões e colocar novas questões suscitadas pelas conclusões obtidas.', @topic_analise_dados);

-- Set UUID for Evaluation Topic 'Comunicação e divulgação de um estudo'
SET @topic_comunicacao_estudo = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_comunicacao_estudo, 'Comunicação e divulgação de um estudo', @category_dados);

-- Insert Subtopics for 'Comunicação e divulgação de um estudo'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Elaborar um poster digital que apoie a apresentação oral de um estudo realizado, atendendo ao público a quem será divulgado, contando a história que está por detrás dos dados, e colocando questões emergentes para estudos futuros.', @topic_comunicacao_estudo);

-- Set UUID for Evaluation Topic 'Probabilidades'
SET @topic_probabilidades = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_probabilidades, 'Probabilidades', @category_dados);

-- Insert Subtopics for 'Probabilidades'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer que a probabilidade de um acontecimento exprime o grau de convicção na sua realização.', @topic_probabilidades);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer que a probabilidade de um acontecimento assume um valor que está compreendido entre 0% e 100%.', @topic_probabilidades);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Estimar a probabilidade de acontecimentos usando a frequência relativa.', @topic_probabilidades);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Conjeturar sobre o grau de convicção na ocorrência de uma dada característica num grupo com base em informação obtida em grupos diferentes.', @topic_probabilidades);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Usar as probabilidades para conhecer e compreender o mundo à nossa volta, reconhecendo a utilidade e poder da Matemática na previsão de acontecimentos incertos se virem a realizar.', @topic_probabilidades);


-- Set UUID for Evaluation Category 'Geometria e Medida'
SET @category_geometria = UUID();
INSERT INTO EvaluationCategory (id, name, year, subjectId) VALUES (@category_geometria, 'Geometria e Medida', '5', @subjectId);

-- Set UUID for Evaluation Topic 'Figuras Planas'
SET @topic_figuras_planas = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_figuras_planas, 'Figuras Planas', @category_geometria);

-- Insert Subtopics for 'Figuras Planas'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Distinguir reta de semirreta e de segmento de reta.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Identificar a posição relativa de retas paralelas e retas concorrentes, perpendiculares ou oblíquas, e representá-las utilizando recursos diversificados.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Compreender que a amplitude de um ângulo pode ser medida e conhecer a unidade de medida grau.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Medir a amplitude do ângulo usando transferidor, com aproximação ao grau, e classificá-lo.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Fazer estimativas de medida de amplitude de um dado ângulo, por comparação com amplitudes de ângulos de referência (45º, 90º e 180º).', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Construir ângulos com uma dada medida de amplitude.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Classificar triângulos quanto aos lados e quanto aos ângulos.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Descrever relações entre os lados e os ângulos de um triângulo e usá-las na resolução de problemas.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Construir triângulos e compreender os casos em que é possível a sua construção, apresentando e explicando ideias e raciocínios.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Reconhecer os critérios de congruência de triângulos e usá-los na construção de triângulos e resolução de problemas.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Compreender o significado de figuras equivalentes e resolver problemas em diversos contextos.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Generalizar e justificar a expressão para o cálculo da medida da área do paralelogramo a partir do retângulo, com recurso a material manipulável e/ou tecnológico.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Identificar as alturas de um paralelogramo.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Generalizar e justificar a expressão para o cálculo da medida da área do triângulo a partir do paralelogramo, com recurso a material manipulável e/ou tecnológico.', @topic_figuras_planas);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Identificar as alturas de um triângulo e relacionar as respetivas posições com a classificação do triângulo.', @topic_figuras_planas);

-- Set UUID for Evaluation Topic 'Figuras no espaço'
SET @topic_figuras_espaco = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationCategoryId) VALUES (@topic_figuras_espaco, 'Figuras no espaço', @category_geometria);

-- Insert Subtopics for 'Figuras no espaço'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Identificar pares de faces paralelas e pares de faces perpendiculares em prismas.', @topic_figuras_espaco);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Explicar a classificação hierárquica entre prismas retos, paralelepípedos retângulos e cubos, apresentando e explicando raciocínios e representações.', @topic_figuras_espaco);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Formular e testar conjeturas identificando regularidades em classes de poliedros envolvendo os seus elementos e expressá-las usando linguagem corrente ou através de expressões algébricas.', @topic_figuras_espaco);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Justificar relações entre os elementos de classes de poliedros recorrendo à sua organização espacial, apresentando e explicando raciocínios e representações.', @topic_figuras_espaco);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Identificar e construir poliedros a partir das suas planificações, estabelecendo relações entre elementos da planificação e do poliedro.', @topic_figuras_espaco);
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Construir e reconhecer diferentes planificações para o mesmo poliedro.', @topic_figuras_espaco);

-- Set UUID for Evaluation Category 'Capacidades Matemáticas'
SET @category_capacidades = UUID();
INSERT INTO EvaluationCategory (id, name, year, subjectId) VALUES (@category_capacidades, 'Capacidades Matemáticas', '5', @subjectId);

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
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId) VALUES (UUID(), 'Procurar e corrigir erros, testar, refinar e otimizar uma dada resolução.', @topic_pensamento_computacional);

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
