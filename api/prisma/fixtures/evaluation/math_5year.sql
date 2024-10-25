-- Create Evaluation Topic Category for 'números e operações'
SET @NumerosOperacoesCategoryId = UUID();
INSERT INTO EvaluationTopicCategory (id, name, year, subjectId)
VALUES
    (@NumerosOperacoesCategoryId, 'Números e operações', '5', (SELECT id FROM Subject WHERE name = 'Math'));

-- Create Evaluation Topics for 'números e operações'
SET @NumerosNaturaisTopicId = UUID();
SET @FracoesDecimaisTopicId = UUID();
SET @PercentagensTopicId = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationTopicCategoryId)
VALUES
    (@NumerosNaturaisTopicId, 'Números Naturais', @NumerosOperacoesCategoryId),
    (@FracoesDecimaisTopicId, 'Frações Decimais', @NumerosOperacoesCategoryId),
    (@PercentagensTopicId, 'Percentagens', @NumerosOperacoesCategoryId);

-- Create Evaluation Subtopics for 'números naturais'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId)
VALUES
    (UUID(), 'Reconhecer múltiplos e divisores de números naturais, dar exemplos na resolução de problemas em contextos matemáticos e não matemáticos', @NumerosNaturaisTopicId),
    (UUID(), 'Identificar números primos e compostos e decompor um número em fatores primos', @NumerosNaturaisTopicId),
    (UUID(), 'Reconhecer uma potência de expoente natural como um produto de fatores iguais e calcular potências de base e expoente natural', @NumerosNaturaisTopicId),
    (UUID(), 'Representar potências de base 10 e calcular o seu valor', @NumerosNaturaisTopicId);

-- Create Evaluation Subtopics for 'frações decimais'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId)
VALUES
    (UUID(), 'Compreender e usar um número racional como quociente e relação parte-todo e comparar frações com a unidade', @FracoesDecimaisTopicId),
    (UUID(), 'Escrever números na forma de fração e na forma decimal', @FracoesDecimaisTopicId),
    (UUID(), 'Leitura, escrita e representação de frações', @FracoesDecimaisTopicId),
    (UUID(), 'Identificar e dar exemplos de frações equivalentes a uma fração dada e escrever uma fração na sua forma irredutível', @FracoesDecimaisTopicId),
    (UUID(), 'Comparar e ordenar números racionais representados por frações com o mesmo denominador, com o mesmo numerador e com denominador e numerador diferentes', @FracoesDecimaisTopicId),
    (UUID(), 'Determinar valores aproximados e valores arredondados', @FracoesDecimaisTopicId),
    (UUID(), 'Adicionar e subtrair números racionais não negativos nas diversas representações, recorrendo ao cálculo mental e a algoritmos, e fazer estimativas plausíveis', @FracoesDecimaisTopicId),
    (UUID(), 'Multiplicar frações por números naturais e reconhecer a multiplicação de um número natural por uma fração como a adição sucessiva dessa fração', @FracoesDecimaisTopicId),
    (UUID(), 'Efetuar multiplicações envolvendo frações, decimais e números naturais', @FracoesDecimaisTopicId);

-- Create Evaluation Subtopics for 'percentagens'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId)
VALUES
    (UUID(), 'Compreender a noção de percentagem e calcular o seu valor', @PercentagensTopicId),
    (UUID(), 'Dividir números por decimais', @PercentagensTopicId);

-- Create Evaluation Topic Category for 'geometria e medida'
SET @GeometriaMedidaCategoryId = UUID();
INSERT INTO EvaluationTopicCategory (id, name, year, subjectId)
VALUES
    (@GeometriaMedidaCategoryId, 'Geometria e medida', '5', (SELECT id FROM Subject WHERE name = 'Math'));

-- Create Evaluation Topics for 'geometria e medida'
SET @FigurasPlanasTopicId = UUID();
SET @TriangulosTopicId = UUID();
SET @AreasTopicId = UUID();
SET @SolidosGeometricosTopicId = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationTopicCategoryId)
VALUES
    (@FigurasPlanasTopicId, 'Figuras Planas', @GeometriaMedidaCategoryId),
    (@TriangulosTopicId, 'Triângulos', @GeometriaMedidaCategoryId),
    (@AreasTopicId, 'Áreas', @GeometriaMedidaCategoryId),
    (@SolidosGeometricosTopicId, 'Sólidos Geométricos', @GeometriaMedidaCategoryId);

-- Create Evaluation Subtopics for 'figuras planas'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId)
VALUES
    (UUID(), 'Identificar e representar ponto, retas, semirretas e segmentos de reta', @FigurasPlanasTopicId),
    (UUID(), 'Identificar e reconhecer a posição relativa de retas no plano (retas paralelas e retas concorrentes)', @FigurasPlanasTopicId),
    (UUID(), 'Construir retas concorrentes e retas paralelas usando material adequado e usando um ambiente de geometria dinâmica, Geogebra', @FigurasPlanasTopicId);

-- Create Evaluation Subtopics for 'triângulos'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId)
VALUES
    (UUID(), 'Identificar ângulos retos, agudos e obtusos', @TriangulosTopicId),
    (UUID(), 'Medir a amplitude de ângulos (usando o transferidor) e classificar ângulos', @TriangulosTopicId),
    (UUID(), 'Construção de ângulos', @TriangulosTopicId),
    (UUID(), 'Classificar triângulos quanto aos ângulos e quanto aos lados', @TriangulosTopicId),
    (UUID(), 'Relacionar lados e ângulos num triângulo recorrendo a esquemas ou usando o Geogebra', @TriangulosTopicId),
    (UUID(), 'Aplicar a Desigualdade triangular recorrendo a material manipulável', @TriangulosTopicId),
    (UUID(), 'Reconhecer casos de possibilidade de construção de triângulos e construir triângulos a partir de elementos dados (amplitude de ângulos, comprimento de lados)', @TriangulosTopicId),
    (UUID(), 'Utilizar os critérios de igualdade de triângulos na sua construção e na resolução de problemas em contextos matemáticos e não matemáticos', @TriangulosTopicId);

-- Create Evaluation Subtopics for 'áreas'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId)
VALUES
    (UUID(), 'Reconhecer figuras equivalentes utilizando material manipulável (Tangran)', @AreasTopicId),
    (UUID(), 'Calcular perímetros e áreas de polígonos (quadrado, retângulo, paralelogramo e triângulo) e calcular áreas por decomposição de figuras planas', @AreasTopicId),
    (UUID(), 'Utilizar as unidades de medida de área do sistema métrico', @AreasTopicId);

-- Create Evaluation Subtopics for 'sólidos geométricos'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId)
VALUES
    (UUID(), 'Distinguir poliedros de não poliedros, utilizando material manipulável (polidrons)', @SolidosGeometricosTopicId),
    (UUID(), 'Distinguir Prismas de Pirâmides e conhecer os seus diferentes elementos', @SolidosGeometricosTopicId),
    (UUID(), 'Identificar e desenhar planificações de sólidos geométricos e reconhecer um sólido a partir da sua planificação', @SolidosGeometricosTopicId);

-- Create Evaluation Topic Category for 'álgebra'
SET @ÁlgebraCategoryId = UUID();
INSERT INTO EvaluationTopicCategory (id, name, year, subjectId)
VALUES
    (@ÁlgebraCategoryId, 'Álgebra', '5', (SELECT id FROM Subject WHERE name = 'Math'));

-- Create Evaluation Topic for 'Sequências e regularidades'
SET @SequenciasTopicId = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationTopicCategoryId)
VALUES
    (@SequenciasTopicId, 'Sequências e regularidades', @ÁlgebraCategoryId);

-- Create Evaluation Subtopics for 'Sequências e regularidades'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId)
VALUES
    (UUID(), 'Determinar uma lei de formação de uma sequência numérica ou não numérica e, uma expressão algébrica que represente uma sequência numérica em que a diferença entre termos consecutivos é constante', @SequenciasTopicId),
    (UUID(), 'Utilizar expressões algébricas com letras', @SequenciasTopicId);

-- Create Evaluation Topic Category for 'organização e tratamento de dados'
SET @OrganizacaoCategoryId = UUID();
INSERT INTO EvaluationTopicCategory (id, name, year, subjectId)
VALUES
    (@OrganizacaoCategoryId, 'Organização e tratamento de dados', '5', (SELECT id FROM Subject WHERE name = 'Math'));

-- Create Evaluation Topics for 'organização e tratamento de dados'
SET @DadosTopicId = UUID();
SET @ProblemasTopicId = UUID();
SET @RaciocinioTopicId = UUID();
SET @ComunicacaoTopicId = UUID();
INSERT INTO EvaluationTopic (id, name, evaluationTopicCategoryId)
VALUES
    (@DadosTopicId, 'Dados e probabilidades', @OrganizacaoCategoryId),
    (@ProblemasTopicId, 'Resolução de problemas', @OrganizacaoCategoryId),
    (@RaciocinioTopicId, 'Raciocínio matemático', @OrganizacaoCategoryId),
    (@ComunicacaoTopicId, 'Comunicação matemática', @OrganizacaoCategoryId);

-- Create Evaluation Subtopics for 'dados e probabilidades'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId)
VALUES
    (UUID(), 'Distinguir as diferentes fontes de recolha de dados', @DadosTopicId),
    (UUID(), 'Recolher, organizar e representar dados recorrendo a tabelas de frequência absoluta e relativa, gráficos de barras e gráficos circulares e interpretar a informação representada', @DadosTopicId),
    (UUID(), 'Análisar dados e calcular a Média de um conjunto de dados', @DadosTopicId),
    (UUID(), 'Estimar a probabilidade da realização de um acontecimento, recorrendo à frequência relativa ou percentagem', @DadosTopicId);

-- Create Evaluation Subtopics for 'resolução de problemas'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId)
VALUES
    (UUID(), 'Conceber e aplicar estratégias na resolução de problemas em contextos matemáticos e não matemáticos e avaliar a plausibilidade dos resultados', @ProblemasTopicId),
    (UUID(), 'Conceber e aplicar estratégias na resolução de problemas usando ideias geométricas, em contextos matemáticos e não matemáticos e avaliando a plausibilidade dos resultados', @ProblemasTopicId),
    (UUID(), 'Resolver problemas envolvendo a organização e tratamento de dados em contextos familiares variados e utilizar medidas estatísticas (moda e amplitude) para os interpretar e tomar decisões', @ProblemasTopicId);

-- Create Evaluation Subtopics for 'raciocínio matemático'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId)
VALUES
    (UUID(), 'Compreender e construir explicações e justificações matemáticas, incluindo o recurso a exemplos e contraexemplos', @RaciocinioTopicId),
    (UUID(), 'Desenvolver a capacidade de abstração e de generalização e de compreender e construir explicações e justificações matemáticas e raciocínios lógicos, incluindo o recurso a exemplos e contraexemplos', @RaciocinioTopicId),
    (UUID(), 'Desenvolver a capacidade de visualização e construir explicações e justificações matemáticas e raciocínios lógicos, incluindo o recurso a exemplos e contraexemplos', @RaciocinioTopicId);

-- Create Evaluation Subtopics for 'comunicação matemática'
INSERT INTO EvaluationSubTopic (id, name, evaluationTopicId)
VALUES
    (UUID(), 'Exprimir, oralmente e por escrito, ideias matemáticas, com precisão e rigor, e justificar raciocínios, procedimentos e conclusões, recorrendo ao vocabulário e linguagem próprios da matemática (convenções, notações, terminologia e simbologia)', @ComunicacaoTopicId),
    (UUID(), 'Desenvolver interesse pela Matemática e valorizar o seu papel no desenvolvimento das outras ciências e domínios da atividade humana e social', @ComunicacaoTopicId),
    (UUID(), 'Desenvolver confiança nas suas capacidades e conhecimentos matemáticos, e a capacidade de analisar o próprio trabalho e regular a sua aprendizagem', @ComunicacaoTopicId),
    (UUID(), 'Desenvolver persistência, autonomia e à-vontade em lidar com situações que envolvam a Matemática no seu percurso escolar e na vida em sociedade', @ComunicacaoTopicId);
