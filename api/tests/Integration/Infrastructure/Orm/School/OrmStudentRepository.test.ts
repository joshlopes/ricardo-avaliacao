import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {PrismaClient} from "@prisma/client";
import {TYPES} from "../../../../../src/Infrastructure/DependencyInjection/types";
import {createSchoolClass, createStudent, createTeacher} from "../../../../Helper/StaticFixtures";
import StudentRepository from "../../../../../src/Domain/School/StudentRepository";
import {StudentId} from "../../../../../src/Domain/School/StudentId";
import Student from "../../../../../src/Domain/School/Student";

describe('OrmSchoolClassRepository', () => {
    const prismaClient: PrismaClient = myContainer.get<PrismaClient>(TYPES.PrismaClient)
    const repository = myContainer.get<StudentRepository>(TYPES.StudentRepository)

    beforeAll(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('can create', async () => {
        const studentId = StudentId.generate();
        const student = await repository.upsert(new Student(
            studentId,
            'John Doe',
            [],
            []
        ))

        expect(student.id).toEqual(studentId)
        const savedStudent = await prismaClient.student.findUnique({where: {id: studentId.toString()}})
        expect(savedStudent).not.toBeNull()
        expect(savedStudent?.id).toEqual(studentId.toString())
    })

    it('can update', async () => {
        const student = await createStudent('John Doe')
        const savedStudent = await prismaClient.student.findUnique({where: {id: student.id.toString()}})
        expect(savedStudent).not.toBeNull()
        expect(savedStudent?.id).toEqual(student.id.toString())
        expect(savedStudent?.name).toEqual('John Doe')

        // Update the student
        student.name = 'Jane Doe'
        await repository.upsert(student)

        const updatedStudent = await prismaClient.student.findUnique({where: {id: student.id.toString()}})
        expect(updatedStudent).not.toBeNull()
        expect(updatedStudent?.id).toEqual(student.id.toString())
        expect(updatedStudent?.name).toEqual('Jane Doe')
    })
})
