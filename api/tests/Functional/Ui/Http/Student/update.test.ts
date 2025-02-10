import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Infrastructure/DependencyInjection/types";
import {PrismaClient} from "@prisma/client";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {createTeacher, createStudent, createSchoolClass, createSubject} from "../../../../Helper/StaticFixtures";
import SuperTestRequestBuilder from "../../../../Helper/SuperTestRequestBuilder";
import {StudentId} from "../../../../../src/Domain/School/StudentId";

const prismaClient: PrismaClient = myContainer.get(TYPES.PrismaClient);

describe('PUT /api/students/:id', () => {
    beforeEach(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient);
    });

    it('should update student name', async () => {
        const newName = 'Updated Student Name';
        const student = await createStudent('Student Name');

        const response = await SuperTestRequestBuilder
            .put(`/api/students/${student.id.toString()}`, {name: newName}, true)
            .build();

        expect(response.status).toBe(204);

        const updatedStudent = await prismaClient.student.findUnique({
            where: { id: student.id.toString()}
        });
        expect(updatedStudent?.name).toBe(newName);
    });

    it('should return 400 when name is missing', async () => {
        const studentId = StudentId.generate().toString();
        const response = await SuperTestRequestBuilder
            .put(`/api/students/${studentId}`, {}, true)
            .build();

        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing required field: name');
    });

    it('should return 404 when student does not exist', async () => {
        const nonExistentId = StudentId.generate().toString();
        
        const response = await SuperTestRequestBuilder
            .put(`/api/students/${nonExistentId}`, {name: 'New Name'}, true)
            .build();

        expect(response.status).toBe(404);
    });

    it('should return 401 when not authenticated', async () => {
        const studentId = StudentId.generate().toString();
        const response = await SuperTestRequestBuilder
            .put(`/api/students/${studentId}`, {name: 'New Name'}, false)
            .build();

        expect(response.status).toBe(401);
    });
});
