import {Response} from 'supertest';
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Infrastructure/DependencyInjection/types";
import {PrismaClient} from "@prisma/client";
import {createTeacher} from "../../../../Helper/StaticFixtures";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import SuperTestRequestBuilder from "../../../../Helper/SuperTestRequestBuilder";

const prismaClient: PrismaClient = myContainer.get(TYPES.PrismaClient);

describe('GET /api/me', () => {
    beforeEach(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient)
    });

    it('should return the record', async () => {
        const teacher = await createTeacher();

        const response: Response = await SuperTestRequestBuilder
            .get('/api/me', true)
            .withUser(teacher)
            .build();

        expect(response.status).toEqual(200);

        // Assert
        expect(response.body.id).toBe(teacher.id.toString())
        expect(response.body.email).toBe(teacher.email)
        expect(response.body.name).toBe(teacher.name)
        expect(response.body.password).not.toBeDefined()
    });
});