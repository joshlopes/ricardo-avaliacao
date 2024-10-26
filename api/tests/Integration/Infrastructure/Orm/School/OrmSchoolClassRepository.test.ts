import DatabaseUtil from "../../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {PrismaClient} from "@prisma/client";
import {TYPES} from "../../../../../src/Infrastructure/DependencyInjection/types";
import {createSchoolClass, createTeacher} from "../../../../Helper/StaticFixtures";

describe('OrmSchoolClassRepository', () => {
    const prismaClient: PrismaClient = myContainer.get<PrismaClient>(TYPES.PrismaClient)

    beforeAll(async () => {
        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('findByTeacherId', async () => {
        const teacher = await createTeacher();
        const schoolClass = await createSchoolClass('5a', '5');


    })
})
