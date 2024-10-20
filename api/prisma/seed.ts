import { PrismaClient } from '@prisma/client';
import { v7 as uuidv7 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
    // Create constants for relational data
    const teacher1Id = uuidv7();
    const teacher2Id = uuidv7();
    const subject1Id = uuidv7();
    const subject2Id = uuidv7();
    const class1Id = uuidv7();
    const class2Id = uuidv7();

    // Create teachers
    const teacher1 = await prisma.teacher.create({
        data: {
            id: teacher1Id,
            name: 'Matt',
            email: 'matt@example.com',
            password: 'hashed_password',
            lastLoggedIn: new Date(),
        },
    });

    const teacher2 = await prisma.teacher.create({
        data: {
            id: teacher2Id,
            name: 'Luis',
            email: 'luis@example.com',
            password: 'hashed_password',
            lastLoggedIn: new Date(),
        },
    });

    // Create subjects
    const subject1 = await prisma.subject.create({
        data: {
            id: subject1Id,
            name: 'Math',
        },
    });

    const subject2 = await prisma.subject.create({
        data: {
            id: subject2Id,
            name: 'Portuguese',
        },
    });

    // Create classes
    const class1 = await prisma.class.create({
        data: {
            id: class1Id,
            name: '5A',
            year: '2023',
        },
    });

    const class2 = await prisma.class.create({
        data: {
            id: class2Id,
            name: '5B',
            year: '2023',
        },
    });

    // Create students
    const students = await Promise.all(
        ['John Doe', 'Jane Doe', 'Sam Smith', 'Emily Johnson', 'Michael Brown', 'Emma Davis', 'Daniel Wilson', 'Olivia Taylor', 'James Anderson', 'Sophia Martinez'].map((name) =>
            prisma.student.create({
                data: {
                    id: uuidv7(),
                    name,
                },
            })
        )
    );

    // Create relations in ClassStudent
    await Promise.all(
        students.map((student, index) =>
            prisma.classStudent.create({
                data: {
                    id: uuidv7(),
                    classId: index < 5 ? class1Id : class2Id, // Assign first 5 to class1, rest to class2
                    studentId: student.id,
                },
            })
        )
    );

    // Create relations in ClassSubjectTeacher
    await prisma.classSubjectTeacher.createMany({
        data: [
            {
                id: uuidv7(),
                teacherId: teacher1Id,
                classId: class1Id,
                subjectId: subject1Id,
            },
            {
                id: uuidv7(),
                teacherId: teacher2Id,
                classId: class2Id,
                subjectId: subject2Id,
            },
        ],
    });

    // Create evaluation topics
    const evaluationTopics = await prisma.evaluationTopic.createMany({
        data: [
            { id: uuidv7(), name: 'Números e Operações', year: '2023' },
            { id: uuidv7(), name: 'Geometria e Medida', year: '2023' },
            { id: uuidv7(), name: 'Álgebra', year: '2023' },
            { id: uuidv7(), name: 'Organização e Tratamento de Dados', year: '2023' },
            { id: uuidv7(), name: 'Resolução de Problemas e Raciocínio', year: '2023' },
        ],
    });

    // Create subtopics for each evaluation topic
    const evaluationTopicIds = await prisma.evaluationTopic.findMany({
        select: { id: true, name: true },
    });

    const subTopicsData = [
        { name: 'Reconhecer múltiplos e divisores de números naturais', topicName: 'Números e Operações' },
        { name: 'Identificar números primos e compostos', topicName: 'Números e Operações' },
        { name: 'Decompor um número em fatores primos', topicName: 'Números e Operações' },
        { name: 'Calcular potências de base e expoente', topicName: 'Números e Operações' },
        { name: 'Compreender números racionais como quociente e parte-todo', topicName: 'Números e Operações' },
        { name: 'Escrever números como frações e decimais', topicName: 'Números e Operações' },
        { name: 'Identificar frações equivalentes e reduzir à forma mais simples', topicName: 'Números e Operações' },
        { name: 'Somar e subtrair números racionais', topicName: 'Números e Operações' },
        { name: 'Multiplicar frações por números naturais', topicName: 'Números e Operações' },
        { name: 'Compreender percentagens e calcular seus valores', topicName: 'Números e Operações' },
        { name: 'Dividir números envolvendo decimais', topicName: 'Números e Operações' },
        { name: 'Identificar pontos, linhas e segmentos', topicName: 'Geometria e Medida' },
        { name: 'Identificar e construir linhas paralelas e concorrentes', topicName: 'Geometria e Medida' },
        { name: 'Medir ângulos usando um transferidor', topicName: 'Geometria e Medida' },
        { name: 'Classificar triângulos por lados e ângulos', topicName: 'Geometria e Medida' },
        { name: 'Calcular perímetros e áreas de polígonos', topicName: 'Geometria e Medida' },
        { name: 'Distinguir entre prismas e pirâmides', topicName: 'Geometria e Medida' },
        { name: 'Desenhar e identificar planificações de sólidos geométricos', topicName: 'Geometria e Medida' },
        { name: 'Determinar a regra para uma sequência numérica', topicName: 'Álgebra' },
        { name: 'Utilizar expressões algébricas com letras', topicName: 'Álgebra' },
        { name: 'Recolher e organizar dados', topicName: 'Organização e Tratamento de Dados' },
        { name: 'Representar dados usando tabelas e gráficos', topicName: 'Organização e Tratamento de Dados' },
        { name: 'Calcular a média de um conjunto de dados', topicName: 'Organização e Tratamento de Dados' },
        { name: 'Estimar probabilidades com base na frequência', topicName: 'Organização e Tratamento de Dados' },
        { name: 'Aplicar estratégias de resolução de problemas', topicName: 'Resolução de Problemas e Raciocínio' },
        { name: 'Utilizar ideias geométricas na resolução de problemas', topicName: 'Resolução de Problemas e Raciocínio' },
        { name: 'Resolver problemas envolvendo organização de dados', topicName: 'Resolução de Problemas e Raciocínio' },
        { name: 'Desenvolver habilidades de raciocínio lógico', topicName: 'Resolução de Problemas e Raciocínio' },
        { name: 'Expressar o raciocínio matemático oralmente e por escrito', topicName: 'Resolução de Problemas e Raciocínio' },
    ];

    const subtopics = [];
    for (const subTopic of subTopicsData) {
        const topic = evaluationTopicIds.find(t => t.name === subTopic.topicName);
        if (topic) {
            subtopics.push(await prisma.subTopic.create({
                data: {
                    id: uuidv7(),
                    name: subTopic.name,
                    evaluationTopicId: topic.id,
                },
            }));
        } else {
            console.error(`Could not find topic with name ${subTopic.topicName}`);
        }
    }

    // Create grades for some subtopics
    await prisma.grade.createMany({
        data: [
            { id: uuidv7(), subTopicId: subtopics[0].id, studentId: students[0].id, classId: class1.id, grade: 'A', createdAt: new Date() },
            { id: uuidv7(), subTopicId: subtopics[0].id, studentId: students[1].id, classId: class1.id, grade: 'B', createdAt: new Date() },
            { id: uuidv7(), subTopicId: subtopics[1].id, studentId: students[5].id, classId: class2.id, grade: 'A', createdAt: new Date() },
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
