import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { GradeEnum } from "../src/Domain/School/Grade";
import * as path from 'path';
import {exec} from "child_process";
import * as util from "node:util";

const prisma = new PrismaClient();
const execPromise = util.promisify(exec);

async function loadSQLFile(filePath: string) {
    try {
        const { stdout } = await execPromise(`mysql -h database -u root -proot ricardo-avaliacao < ${filePath}`);
        console.log(`SQL file loaded: ${stdout}`);
    } catch (error) {
        console.error(`Error loading SQL file`, error);
        throw error;
    }
}

async function main() {
    // Create constants for relational data
    const teacher1Id = uuidv4();
    const teacher2Id = uuidv4();
    const subject1Id = uuidv4();
    const subject2Id = uuidv4();
    const class1Id = uuidv4();
    const class2Id = uuidv4();

    // Create teachers
    await prisma.teacher.create({
        data: {
            id: teacher1Id,
            name: 'Matt',
            email: 'matt@example.com',
            password: 'hashed_password',
            lastLoggedIn: new Date(),
        },
    });

    await prisma.teacher.create({
        data: {
            id: teacher2Id,
            name: 'Luis',
            email: 'luis@example.com',
            password: 'hashed_password',
            lastLoggedIn: new Date(),
        },
    });

    // Create subjects
    await prisma.subject.create({
        data: {
            id: subject1Id,
            name: 'Math',
        },
    });

    await prisma.subject.create({
        data: {
            id: subject2Id,
            name: 'Portuguese',
        },
    });

    // Create classes
    await prisma.class.create({
        data: {
            id: class1Id,
            name: '5A',
            year: '2023',
        },
    });

    await prisma.class.create({
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
                    id: uuidv4(),
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
                    id: uuidv4(),
                    classId: index < 5 ? class1Id : class2Id,
                    studentId: student.id,
                },
            })
        )
    );

    // Create relations in ClassSubjectTeacher
    await prisma.classSubjectTeacher.createMany({
        data: [
            {
                id: uuidv4(),
                teacherId: teacher1Id,
                classId: class1Id,
                subjectId: subject1Id,
            },
            {
                id: uuidv4(),
                teacherId: teacher2Id,
                classId: class2Id,
                subjectId: subject2Id,
            },
        ],
    });

    // Load Evaluation topics from SQL file using Prisma
    const sqlFilePath = path.resolve(__dirname, 'fixtures/evaluation/math_5year.sql');
    await loadSQLFile(sqlFilePath);

    // Retrieve EvaluationSubTopic IDs for Grade creation
    const evaluationSubTopics = await prisma.evaluationSubTopic.findMany({
        select: { id: true }
    });

    if (evaluationSubTopics.length === 0) {
        console.error("No evaluation subtopics found, cannot create grades.");
        return;
    }

    const evaluationSubTopicIds = evaluationSubTopics.map((subTopic) => subTopic.id);

    // Create grades for some subtopics
    await prisma.grade.createMany({
        data: [
            { id: uuidv4(), evaluationSubTopicId: evaluationSubTopicIds[0], studentId: students[0].id, grade: GradeEnum.NOT_WORKED, createdAt: new Date() },
            { id: uuidv4(), evaluationSubTopicId: evaluationSubTopicIds[1], studentId: students[0].id, grade: GradeEnum.EMERGENT, createdAt: new Date() },
            { id: uuidv4(), evaluationSubTopicId: evaluationSubTopicIds[2], studentId: students[0].id, grade: GradeEnum.DEVELOPING, createdAt: new Date() },
            { id: uuidv4(), evaluationSubTopicId: evaluationSubTopicIds[0], studentId: students[1].id, grade: GradeEnum.EMERGENT, createdAt: new Date() },
            { id: uuidv4(), evaluationSubTopicId: evaluationSubTopicIds[1], studentId: students[5].id, grade: GradeEnum.DEVELOPING, createdAt: new Date() },
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
