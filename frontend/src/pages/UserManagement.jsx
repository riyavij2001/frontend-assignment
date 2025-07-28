import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Chip,
    Alert,
    Tooltip,
    Avatar,
    Divider
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as ViewIcon,
    Person,
    Email,
    Phone,
    Business,
    Security,
    Search
} from '@mui/icons-material';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [viewingUser, setViewingUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [currentUser, setCurrentUser] = useState(null);

    const departments = [
        'IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations', 'Engineering', 'Design'
    ];

    const roles = [
        { value: 'employee', label: 'Employee' },
        { value: 'admin', label: 'Administrator' }
    ];

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        department: '',
        role: '',
        password: ''
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        setCurrentUser(user);
        
        if (user.role !== 'admin') {
            setError('Access denied. Only administrators can manage users.');
            return;
        }

        loadUsers();
    }, []);

    useEffect(() => {
        const filtered = users.filter(user =>
            user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.department?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [users, searchTerm]);

    const loadUsers = () => {
        try {
            const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
            setUsers(storedUsers);
            setFilteredUsers(storedUsers);
        } catch (error) {
            setError('Error loading users');
        }
    };

    const handleInputChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            department: '',
            role: '',
            password: ''
        });
        setEditingUser(null);
    };

    const handleOpenDialog = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                phone: user.phone || '',
                department: user.department || '',
                role: user.role || '',
                password: ''
            });
        } else {
            resetForm();
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        resetForm();
    };

    const validateForm = () => {
        if (!formData.firstName || !formData.lastName || !formData.email || 
            !formData.phone || !formData.department || !formData.role) {
            setError('Please fill out all required fields');
            return false;
        }

        if (!editingUser && !formData.password) {
            setError('Password is required for new users');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        return true;
    };

    const handleSaveUser = () => {
        setError('');
        setSuccess('');

        if (!validateForm()) {
            return;
        }

        try {
            const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            
            if (editingUser) {
                const updatedUsers = existingUsers.map(user => 
                    user.id === editingUser.id 
                        ? { 
                            ...user, 
                            ...formData,
                            userName: `${formData.firstName.toLowerCase()}${formData.lastName.toLowerCase()}`,
                            updatedAt: new Date().toISOString()
                        }
                        : user
                );
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                setSuccess('User updated successfully!');
            } else {
                const newUser = {
                    id: Date.now(),
                    ...formData,
                    userName: `${formData.firstName.toLowerCase()}${formData.lastName.toLowerCase()}`,
                    createdAt: new Date().toISOString()
                };
                
                const emailExists = existingUsers.find(user => user.email === formData.email);
                if (emailExists) {
                    setError('User with this email already exists');
                    return;
                }

                existingUsers.push(newUser);
                localStorage.setItem('users', JSON.stringify(existingUsers));
                setSuccess('User created successfully!');
            }

            loadUsers();
            handleCloseDialog();
        } catch (error) {
            setError('Error saving user');
        }
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
                const updatedUsers = existingUsers.filter(user => user.id !== userId);
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                setUsers(updatedUsers);
                setSuccess('User deleted successfully!');
            } catch (error) {
                setError('Error deleting user');
            }
        }
    };

    const handleViewUser = (user) => {
        setViewingUser(user);
    };

    if (currentUser?.role !== 'admin') {
        return (
            <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '2rem' }}>
                <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
                    <Alert severity="error" sx={{ mb: 3 }}>
                        Access denied. Only administrators can manage users.
                    </Alert>
                </Box>
            </div>
        );
    }

    return (
        <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '2rem' }}>
            <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
                <Typography variant="h4" sx={{ 
                    fontWeight: 600, 
                    color: '#001833', 
                    mb: 3,
                    textAlign: 'center'
                }}>
                    User Management
                </Typography>

                <Card sx={{ 
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }}>
                    <CardContent sx={{ p: 4 }}>
                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert severity="success" sx={{ mb: 3 }}>
                                {success}
                            </Alert>
                        )}

                        {/* Header with Search and Add Button */}
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            mb: 3,
                            flexWrap: 'wrap',
                            gap: 2
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, minWidth: 300 }}>
                                <Search sx={{ color: '#666' }} />
                                <TextField
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    variant="outlined"
                                    size="small"
                                    sx={{ minWidth: 250 }}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => handleOpenDialog()}
                                sx={{
                                    bgcolor: '#001833',
                                    '&:hover': { bgcolor: '#001833' }
                                }}
                            >
                                Add User
                            </Button>
                        </Box>

                        {/* Users Table */}
                        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                                        <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Department</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredUsers.map((user) => (
                                        <TableRow key={user.id} hover>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar sx={{ bgcolor: '#001833', width: 32, height: 32 }}>
                                                        {user.firstName?.charAt(0).toUpperCase()}
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                            {user.firstName} {user.lastName}
                                                        </Typography>
                                                        <Typography variant="caption" sx={{ color: '#666' }}>
                                                            @{user.userName}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phone}</TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={user.department} 
                                                    size="small" 
                                                    sx={{ bgcolor: '#e3f2fd', color: '#1976d2' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={user.role} 
                                                    size="small" 
                                                    sx={{ 
                                                        bgcolor: user.role === 'admin' ? '#ffebee' : '#e8f5e8',
                                                        color: user.role === 'admin' ? '#d32f2f' : '#2e7d32'
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    <Tooltip title="View Details">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleViewUser(user)}
                                                            sx={{ color: '#2196f3' }}
                                                        >
                                                            <ViewIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Edit User">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleOpenDialog(user)}
                                                            sx={{ color: '#ff9800' }}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete User">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleDeleteUser(user.id)}
                                                            sx={{ color: '#f44336' }}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {filteredUsers.length === 0 && (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <Typography variant="body1" sx={{ color: '#666' }}>
                                    {searchTerm ? 'No users found matching your search.' : 'No users found.'}
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Box>

            {/* Add/Edit User Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingUser ? 'Edit User' : 'Add New User'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <TextField
                            fullWidth
                            label="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange('firstName')}
                            InputProps={{
                                startAdornment: <Person sx={{ mr: 1, color: '#666' }} />
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Last Name"
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
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        margin="normal"
                        InputProps={{
                            startAdornment: <Email sx={{ mr: 1, color: '#666' }} />
                        }}
                    />

                    <TextField
                        fullWidth
                        label="Phone"
                        value={formData.phone}
                        onChange={handleInputChange('phone')}
                        margin="normal"
                        InputProps={{
                            startAdornment: <Phone sx={{ mr: 1, color: '#666' }} />
                        }}
                    />

                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel>Department</InputLabel>
                            <Select
                                value={formData.department}
                                label="Department"
                                onChange={handleInputChange('department')}
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

                    {!editingUser && (
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange('password')}
                            margin="normal"
                            InputProps={{
                                startAdornment: <Security sx={{ mr: 1, color: '#666' }} />
                            }}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button 
                        onClick={handleSaveUser} 
                        variant="contained"
                        sx={{ bgcolor: '#001833', '&:hover': { bgcolor: '#001833' } }}
                    >
                        {editingUser ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* View User Dialog */}
            <Dialog open={!!viewingUser} onClose={() => setViewingUser(null)} maxWidth="sm" fullWidth>
                {viewingUser && (
                    <>
                        <DialogTitle>User Details</DialogTitle>
                        <DialogContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <Avatar sx={{ bgcolor: '#001833', width: 64, height: 64 }}>
                                    {viewingUser.firstName?.charAt(0).toUpperCase()}
                                </Avatar>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {viewingUser.firstName} {viewingUser.lastName}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#666' }}>
                                        @{viewingUser.userName}
                                    </Typography>
                                </Box>
                            </Box>

                            <Divider sx={{ mb: 3 }} />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Email sx={{ color: '#666' }} />
                                    <Typography variant="body2">
                                        <strong>Email:</strong> {viewingUser.email}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Phone sx={{ color: '#666' }} />
                                    <Typography variant="body2">
                                        <strong>Phone:</strong> {viewingUser.phone}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Business sx={{ color: '#666' }} />
                                    <Typography variant="body2">
                                        <strong>Department:</strong> {viewingUser.department}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Security sx={{ color: '#666' }} />
                                    <Typography variant="body2">
                                        <strong>Role:</strong> {viewingUser.role}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Typography variant="body2">
                                        <strong>Created:</strong> {new Date(viewingUser.createdAt).toLocaleDateString()}
                                    </Typography>
                                </Box>
                                {viewingUser.updatedAt && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography variant="body2">
                                            <strong>Last Updated:</strong> {new Date(viewingUser.updatedAt).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setViewingUser(null)}>Close</Button>
                            <Button 
                                onClick={() => {
                                    setViewingUser(null);
                                    handleOpenDialog(viewingUser);
                                }} 
                                variant="contained"
                                sx={{ bgcolor: '#001833', '&:hover': { bgcolor: '#001833' } }}
                            >
                                Edit User
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </div>
    );
}

export default UserManagement; 