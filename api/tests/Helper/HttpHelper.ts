import request = require("supertest");
import {server} from "../../src/Infrastructure/Http/Server";
import Teacher from "../../src/Domain/Teacher/Teacher";
import {createTeacher} from "./StaticFixtures";
import {createUserToken} from "./SecurityHelper";

export async function createAuthenticatedRequest(method: string, path: string, user?: Teacher, body?: any): Promise<Response|any>
{
    user = user ?? await createTeacher()

    return request(server)
        [method](path)
        .set('Authorization', createUserToken(user).accessToken.toString())
        .send(body);
}
