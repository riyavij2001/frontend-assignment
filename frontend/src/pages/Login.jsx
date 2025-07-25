import React, { useState } from 'react';
import {
    Alert,
    Button,
    TextField,
    Typography,
    Box,
    Paper,
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
            navigate('/dashboard');
        } else if (userName === 'admin' && password === 'adminPassword') {
            localStorage.setItem(
                'user',
                JSON.stringify({ userName: 'admin', role: 'admin' }),
            );
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
            <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
                <Typography variant="h4" align="center" gutterBottom>
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
                    sx={{ mt: 2 }}
                    onClick={handleLogin}
                    style={{backgroundColor:'#001833'}}
                >
                    Log In
                </Button>
            </Paper>
        </Box>
    );
}

export default Login;
