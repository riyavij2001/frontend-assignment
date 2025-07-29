import React, { useState } from 'react';
import {
    Alert,
    Button,
    TextField,
    Typography,
    Box,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    Link
} from '@mui/material';
import {
    PersonAdd,
    Person,
    Email,
    Lock,
    Business
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        role: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const departments = [
        'IT',
        'HR',
        'Finance',
        'Marketing',
        'Sales',
        'Operations',
        'Engineering',
        'Design'
    ];

    const roles = [
        { value: 'employee', label: 'Employee' },
        { value: 'admin', label: 'Administrator' }
    ];

    const handleInputChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const validateForm = () => {
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.department || !formData.role || 
            !formData.password || !formData.confirmPassword) {
            setError('Please fill out all fields');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        return true;
    };

    const handleSignUp = async () => {
        setError('');
        setSuccess('');

        if (!validateForm()) {
            return;
        }

        try {
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const userExists = existingUsers.find(user => 
                user.email === formData.email || 
                user.userName === `${formData.firstName.toLowerCase()}${formData.lastName.toLowerCase()}`
            );

            if (userExists) {
                setError('User already exists with this email or username');
                return;
            }

            const newUser = {
                id: Date.now(),
                firstName: formData.firstName,
                lastName: formData.lastName,
                userName: `${formData.firstName.toLowerCase()}${formData.lastName.toLowerCase()}`,
                email: formData.email,
                department: formData.department,
                role: formData.role,
                password: formData.password,
                createdAt: new Date().toISOString()
            };

            existingUsers.push(newUser);
            localStorage.setItem('users', JSON.stringify(existingUsers));

            setSuccess('Account created successfully! You can now log in.');
            
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                department: '',
                role: '',
                password: '',
                confirmPassword: ''
            });

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            setError('An error occurred during registration. Please try again.');
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="#f5f5f5"
            padding={2}
        >
            <Paper elevation={3} sx={{ 
                padding: 4, 
                width: '100%', 
                maxWidth: 500,
                borderRadius: 3
            }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <PersonAdd sx={{ fontSize: 48, color: '#001833', mb: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 600, color: '#001833' }}>
                        Create Account
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                        Join RaaD HR Management System
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        value={formData.firstName}
                        onChange={handleInputChange('firstName')}
                        InputProps={{
                            startAdornment: <Person sx={{ mr: 1, color: '#666' }} />
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        value={formData.lastName}
                        onChange={handleInputChange('lastName')}
                        InputProps={{
                            startAdornment: <Person sx={{ mr: 1, color: '#666' }} />
                        }}
                    />
                </Box>

                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    InputProps={{
                        startAdornment: <Email sx={{ mr: 1, color: '#666' }} />
                    }}
                />

                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel>Department</InputLabel>
                        <Select
                            value={formData.department}
                            label="Department"
                            onChange={handleInputChange('department')}
                            startAdornment={<Business sx={{ mr: 1, color: '#666' }} />}
                        >
                            {departments.map((dept) => (
                                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={formData.role}
                            label="Role"
                            onChange={handleInputChange('role')}
                        >
                            {roles.map((role) => (
                                <MenuItem key={role.value} value={role.value}>
                                    {role.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    InputProps={{
                        startAdornment: <Lock sx={{ mr: 1, color: '#666' }} />
                    }}
                />

                <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={formData.confirmPassword}
                    onChange={handleInputChange('confirmPassword')}
                    InputProps={{
                        startAdornment: <Lock sx={{ mr: 1, color: '#666' }} />
                    }}
                />

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ 
                        mt: 3, 
                        py: 1.5,
                        fontSize: '1.1rem',
                        bgcolor: '#001833',
                        '&:hover': { bgcolor: '#001833' }
                    }}
                    onClick={handleSignUp}
                >
                    Create Account
                </Button>

                <Divider sx={{ my: 3 }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                        OR
                    </Typography>
                </Divider>

                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                        Already have an account?{' '}
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate('/login')}
                            sx={{ 
                                color: '#001833',
                                textDecoration: 'none',
                                fontWeight: 600,
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            Sign In
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}

export default SignUp; 