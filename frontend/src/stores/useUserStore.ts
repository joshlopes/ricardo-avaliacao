import { create } from 'zustand';
import { Teacher } from '../types/Teacher';
import {ApiSecurityTokens} from "../types/ApiSecurityTokens";

export type UserState = {
    user: Teacher | undefined;
    securityTokens: ApiSecurityTokens | null;
    setUser: (user: Teacher | undefined) => void;
    handleLoginResponse: (response: any) => ApiSecurityTokens;
    setApiSecurityTokens: (tokens: ApiSecurityTokens|null) => void;
};

function denormaliseTokens() {
    const securityTokens = JSON.parse(localStorage.getItem('securityTokens') ?? 'null');
    if (securityTokens === null) {
        return null;
    }

    return {
        accessToken: securityTokens.accessToken,
        accessTokenExpiresAt: new Date(securityTokens.accessTokenExpiresAt),
        refreshToken: securityTokens.refreshToken,
        refreshTokenExpiresAt: new Date(securityTokens.refreshTokenExpiresAt),
    }
}

export const useUserStore = create<UserState>((set) => ({
    securityTokens: denormaliseTokens(),
    user: undefined,
    setUser: (user) => set({ user }),
    setApiSecurityTokens: (apiSecurityTokens) => {
        if (apiSecurityTokens === null) {
            localStorage.removeItem('securityTokens')
        } else {
            localStorage.setItem('securityTokens', JSON.stringify(apiSecurityTokens));
        }
        set({ securityTokens: apiSecurityTokens });
    },
    handleLoginResponse: (response): ApiSecurityTokens => {
        console.debug('Handling login response', response)
        if (!response.ok || !response.body) {
            localStorage.removeItem('securityTokens')
            set({ securityTokens: null, user: undefined })
            throw new Error('Failed to log in!')
        }

        const apiSecurityTokens: ApiSecurityTokens = {
            accessToken: response.body.accessToken.token,
                accessTokenExpiresAt: new Date(response.body.accessToken.expiresAt),
                refreshToken: response.body.refreshToken.token,
                refreshTokenExpiresAt: new Date(response.body.refreshToken.expiresAt),
        }
        localStorage.setItem('securityTokens', JSON.stringify(apiSecurityTokens));
        set({
            securityTokens: apiSecurityTokens
        });

        return apiSecurityTokens;
    }
}));