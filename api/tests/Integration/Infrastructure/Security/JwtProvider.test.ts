import DatabaseUtil from "../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {PrismaClient} from "@prisma/client";
import {TYPES} from "../../../../src/Infrastructure/DependencyInjection/types";
import SecurityProvider from "../../../../src/Domain/Security/SecurityProvider";
import {createTeacher} from "../../../Helper/StaticFixtures";

describe('JwtProvider', () => {
    beforeAll(async () => {
        const prismaClient: PrismaClient = myContainer.get<PrismaClient>(TYPES.PrismaClient)

        await DatabaseUtil.truncateAllTables(prismaClient)
    })

    it('should generate access and refresh tokens', async () => {
        const user = await createTeacher();
        const securityProvider = myContainer.get<SecurityProvider>(TYPES.SecurityProvider)

        const token = securityProvider.generateTokens(user)
        const verification = await securityProvider.verifyToken(token.accessToken)

        expect(verification.id.toString()).toBe(user.id.toString())
    })
})