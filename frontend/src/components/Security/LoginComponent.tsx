import React, { useState } from 'react';
import { Button, TextField, Box, Paper, Typography, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { AxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';
import { useApi } from "../../context/ApiProvider";
import { useUserStore } from "../../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginComponent: React.FC = () => {
    const api = useApi();
    const { handleLoginResponse } = useUserStore();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await api?.post('/login', {
                username: username,
                password: password
            });

            handleLoginResponse(response);
            navigate('/');
        } catch (error: any) {
            console.error('Error:', error);
            if (error instanceof AxiosError && error.response?.data.message !== undefined) {
                enqueueSnackbar(error.response.data.message, { variant: 'error' });
            } else {
                enqueueSnackbar('Failed to log in!', { variant: 'error' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#f5f5f5'
            }}
        >
            <Paper
                elevation={2}
                sx={{
                    p: 4,
                    width: '100%',
                    maxWidth: 400,
                    borderRadius: 2
                }}
            >
                <Typography
                    variant="h5"
                    align="center"
                    sx={{
                        mb: 4,
                        fontWeight: 500,
                        color: '#1976d2'
                    }}
                >
                    Sign In
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleLogin}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3
                    }}
                >
                    <TextField
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        size="small"
                    />

                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isLoading}
                        sx={{
                            mt: 1,
                            textTransform: 'none',
                            fontSize: '1rem'
                        }}
                    >
                        {isLoading ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CircularProgress size={20} color="inherit" />
                                <span>Signing in...</span>
                            </Box>
                        ) : (
                            'Sign In'
                        )}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default LoginComponent;