import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../../src/Infrastructure/DependencyInjection/types";
import {PrismaClient} from "@prisma/client";
import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import Teacher from "../../../../../src/Domain/Teacher/Teacher";
import SuperTestRequestBuilder from "../../../../Helper/SuperTestRequestBuilder";

const prismaClient: PrismaClient = myContainer.get(TYPES.PrismaClient);

describe('POST /api/teachers', () => {
    beforeEach(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient)
    });

    it('should create a new record', async () => {
        const data = {
            email: 'name@email.com',
            name: 'test',
            raw_password: 'password'
        };

        const response = await SuperTestRequestBuilder
            .post('/api/teachers', data, true)
            .build();

        expect(response.status).toEqual(201);

        const user = await prismaClient.teacher.findFirst();
        expect(user).toBeDefined();
        if (user instanceof Teacher) {
            expect(user.toObject()).toMatchObject(data);
        }
    });
});