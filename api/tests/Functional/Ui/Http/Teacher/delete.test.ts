import {createTeacher} from "../../../../Helper/StaticFixtures";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Infrastructure/DependencyInjection/types";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {PrismaClient} from "@prisma/client";
import SuperTestRequestBuilder from "../../../../Helper/SuperTestRequestBuilder";

describe('DELETE /api/teachers/:id', () => {
    const prismaClient: PrismaClient = myContainer.get(TYPES.PrismaClient);

    beforeAll(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient);
    })

    it('should delete a record', async () => {
        const teacher = await createTeacher();

        expect((await prismaClient.teacher.findMany()).length).toBe(1);

        const response = await SuperTestRequestBuilder
            .delete('/api/teachers/' + teacher.id.toString(), true)
            .withUser(teacher)
            .build();

        expect(response.status).toBe(200);
        expect((await prismaClient.teacher.findMany()).length).toBe(0);
    });
})