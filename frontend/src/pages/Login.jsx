import React, { useState } from 'react';
import {
    Alert,
    Button,
    TextField,
    Typography,
    Box,
    Paper,
    Divider,
    Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (userName === 'employee' && password === 'password') {
            localStorage.setItem(
                'user',
                JSON.stringify({ userName: 'employee', role: 'employee' }),
            );
            window.dispatchEvent(new Event('storage'));
            navigate('/dashboard');
        } else if (userName === 'admin' && password === 'adminPassword') {
            localStorage.setItem(
                'user',
                JSON.stringify({ userName: 'admin', role: 'admin' }),
            );
            window.dispatchEvent(new Event('storage'));
            navigate('/dashboard');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f5f5"
        >
            <Paper elevation={3} sx={{ 
                padding: 4, 
                width: '100%', 
                maxWidth: 400,
                borderRadius: 3
            }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ color: '#001833', fontWeight: 600 }}>
                    Login
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    margin="normal"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ 
                        mt: 2,
                        py: 1.5,
                        fontSize: '1.1rem',
                        bgcolor: '#001833',
                        '&:hover': { bgcolor: '#001833' }
                    }}
                    onClick={handleLogin}
                >
                    Log In
                </Button>

                <Divider sx={{ my: 3 }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                        OR
                    </Typography>
                </Divider>

                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                        Don't have an account?{' '}
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate('/signup')}
                            sx={{ 
                                color: '#001833',
                                textDecoration: 'none',
                                fontWeight: 600,
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            Sign Up
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}

export default Login;
