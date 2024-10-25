import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        customGrey: {
            light: string;
            main: string;
            dark: string;
        };
    }
    interface PaletteOptions {
        customGrey?: {
            light: string;
            main: string;
            dark: string;
        };
    }
    interface PaletteColor {
        lighter?: string;
    }
    interface SimplePaletteColorOptions {
        lighter?: string;
    }
}

export const theme = createTheme({
    palette: {
        primary: {
            main: '#2563eb',
            light: '#3b82f6',
            lighter: '#eff6ff',
            dark: '#1d4ed8',
        },
        secondary: {
            main: '#7c3aed',
            light: '#8b5cf6',
            dark: '#6d28d9',
        },
        customGrey: {
            light: '#f5f7fb',
            main: '#e5e7eb',
            dark: '#9ca3af',
        },
        background: {
            default: '#f5f7fb',
        },
        grey: {
            50: '#f9fafb',
            100: '#f3f4f6',
            200: '#e5e7eb',
            300: '#d1d5db',
            400: '#9ca3af',
            500: '#6b7280',
            600: '#4b5563',
            700: '#374151',
            800: '#1f2937',
            900: '#111827',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h5: {
            fontWeight: 600,
        },
        h6: {
            fontWeight: 600,
        },
        subtitle1: {
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 8,
                    fontWeight: 500,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#ffffff',
                    border: 'none',
                },
            },
        },
    },
});