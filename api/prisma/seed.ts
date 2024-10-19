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
    const evaluation1Id = uuidv7();
    const evaluation2Id = uuidv7();

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

    // Create evaluation topics
    const evaluationTopic1 = await prisma.evaluationTopic.create({
        data: {
            id: evaluation1Id,
            name: 'Understanding Numbers',
            year: '2023',
        },
    });

    const evaluationTopic2 = await prisma.evaluationTopic.create({
        data: {
            id: evaluation2Id,
            name: 'Grammar Basics',
            year: '2023',
        },
    });

    // Create subtopics
    const subTopic1Id = uuidv7();
    const subTopic2Id = uuidv7();
    const subTopic3Id = uuidv7();
    const subTopic4Id = uuidv7();

    await prisma.subTopic.createMany({
        data: [
            { id: subTopic1Id, name: 'Addition and Subtraction', evaluationTopicId: evaluationTopic1.id },
            { id: subTopic2Id, name: 'Multiplication and Division', evaluationTopicId: evaluationTopic1.id },
            { id: subTopic3Id, name: 'Sentence Structure', evaluationTopicId: evaluationTopic2.id },
            { id: subTopic4Id, name: 'Verb Conjugation', evaluationTopicId: evaluationTopic2.id },
        ],
    });

    // Create grades for some subtopics
    await prisma.grade.createMany({
        data: [
            { id: uuidv7(), subTopicId: subTopic1Id, studentId: students[0].id, classId: class1.id, grade: 'A', createdAt: new Date() },
            { id: uuidv7(), subTopicId: subTopic2Id, studentId: students[1].id, classId: class1.id, grade: 'B', createdAt: new Date() },
            { id: uuidv7(), subTopicId: subTopic3Id, studentId: students[5].id, classId: class2.id, grade: 'A', createdAt: new Date() },
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
