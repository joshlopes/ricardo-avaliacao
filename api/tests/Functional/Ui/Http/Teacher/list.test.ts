import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {PrismaClient} from "@prisma/client";
import {createTeacher,} from "../../../../Helper/StaticFixtures";
import {TYPES} from "../../../../../src/Infrastructure/DependencyInjection/types";
import SuperTestRequestBuilder from "../../../../Helper/SuperTestRequestBuilder";

describe('GET /api/teachers', () => {
    const prismaClient: PrismaClient = myContainer.get(TYPES.PrismaClient);

    beforeAll(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient);
    })

    it('should return a list of records', async () => {
        const user = await createTeacher()

        const response = await SuperTestRequestBuilder
            .get('/api/teachers', true)
            .withUser(user)
            .build()

        expect(response.status).toEqual(200);

        expect(response.body.results).toHaveLength(1)
        expect(response.body.results[0].id).toBe(user.id.toString())
        expect(response.body.results[0].email).toBe(user.email)
        expect(response.body.results[0].name).toBe(user.name)
    });
})