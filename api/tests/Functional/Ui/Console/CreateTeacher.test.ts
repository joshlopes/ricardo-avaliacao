import { exec } from 'child_process';
import DatabaseUtil from "../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../../../src/Infrastructure/DependencyInjection/types";
import {PrismaClient} from "@prisma/client";
import CreateTeacher from "../../../../src/Ui/Console/CreateTeacher";

jest.setTimeout(30000)

describe('CreateTeacher', () => {
    let prismaClient: PrismaClient;

    beforeAll(async () => {
        prismaClient = await myContainer.get<PrismaClient>(TYPES.PrismaClient);
        await DatabaseUtil.truncateAllTables(prismaClient);
    })

    it('should create a user', (done) => {
        // Arrange
        const email = 'test@email.com';
        const name = 'Test User';
        const password = 'test';
        const command = `ts-node bin/console ${CreateTeacher.commandName} ${email} "${name}" ${password}`;

        expect(prismaClient.teacher.findMany()).resolves.toHaveLength(0);

        // Act
        exec(command, async (error, stdout, stderr) => {
            // If the command execution failed, fail the test
            if (error) {
                done(error);
                return;
            }

            // If the command execution succeeded, check if the user was created
            const result = await prismaClient.teacher.findMany();

            // Assert
            expect(result.length).toBe(1);
            expect(result[0]!.email).toBe(email);
            expect(result[0]!.name).toBe(name);
            expect(result[0]!.password).not.toBe(password); // The password should be hashed

            // Check the command output
            expect(stdout).toContain('Done!'); // Replace with the actual output of your command
            expect(stderr).toBe('');

            done();
        });
    });
});