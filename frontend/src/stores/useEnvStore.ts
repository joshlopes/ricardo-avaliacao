import { create } from 'zustand';

type EnvState = {
    getEnv: (key: string) => any
};

export const useEnvStore = create<EnvState>(() => ({
    getEnv: (key: string) => {
        // First try to get from window.globalConfig (runtime config)
        const globalConfig = (window as any)['globalConfig'];
        if (globalConfig && globalConfig[key] !== undefined) {
            return globalConfig[key];
        }

        // Then try to get from Vite's environment variables
        const envKey = `VITE_${key}` as keyof ImportMetaEnv;
        const value = import.meta.env[envKey];
        if (value !== undefined) {
            return value;
        }

        throw new Error(`Key ${key} not found in configuration`);
    }
}));
