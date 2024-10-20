import {PrismaClient} from "@prisma/client";
import {myContainer} from "../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../src/Infrastructure/DependencyInjection/types";

export default class DatabaseUtil {
    public static async truncateAllTables(prismaClient?: PrismaClient) {
        prismaClient = prismaClient ?? myContainer.get<PrismaClient>(TYPES.PrismaClient)

        await prismaClient.$executeRaw`SET FOREIGN_KEY_CHECKS=0`;
        await prismaClient.$executeRaw`TRUNCATE TABLE Class`;
        await prismaClient.$executeRaw`TRUNCATE TABLE ClassStudent`;
        await prismaClient.$executeRaw`TRUNCATE TABLE ClassSubjectTeacher`;
        await prismaClient.$executeRaw`TRUNCATE TABLE EvaluationTopic`;
        await prismaClient.$executeRaw`TRUNCATE TABLE Grade`;
        await prismaClient.$executeRaw`TRUNCATE TABLE Student`;
        await prismaClient.$executeRaw`TRUNCATE TABLE Subject`;
        await prismaClient.$executeRaw`TRUNCATE TABLE SubTopic`;
        await prismaClient.$executeRaw`TRUNCATE TABLE Teacher`;

        await prismaClient.$executeRaw`SET FOREIGN_KEY_CHECKS=1`;
    }
}