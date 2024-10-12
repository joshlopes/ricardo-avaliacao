import Teacher from "../../src/Domain/Teacher/Teacher";
import {myContainer} from "../../src/Infrastructure/DependencyInjection/inversify.config";
import {TYPES} from "../../src/Infrastructure/DependencyInjection/types";
import SecurityProvider from "../../src/Domain/Security/SecurityProvider";
import Token from "../../src/Domain/Security/Token";

export function createUserToken(user: Teacher): { accessToken: Token, refreshToken: Token} {
    const securityProvider = myContainer.get<SecurityProvider>(TYPES.SecurityProvider);

    return securityProvider.generateTokens(user);
}