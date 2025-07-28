import React, { useState, useEffect } from 'react';
import { 
    Box, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    Typography,
    Divider,
    Avatar,
    Menu,
    MenuItem,
    IconButton,
    Tooltip
} from '@mui/material';
import { 
    Dashboard as DashboardIcon,
    Home as HomeIcon,
    EventNote as LeaveIcon,
    HowToReg as ApprovalIcon,
    PersonAdd as ApplyIcon,
    Login as LoginIcon,
    PersonAdd as SignUpIcon,
    Menu as MenuIcon,
    ChevronLeft as ChevronLeftIcon,
    Logout as LogoutIcon,
    People as PeopleIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import SummarizeIcon from '@mui/icons-material/Summarize';

function Navbar({ collapsed, setCollapsed }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const checkLoginStatus = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setIsLoggedIn(true);
            console.log('Checking login status:', { user: userData, isLoggedIn: true });
        } else {
            setUser(null);
            setIsLoggedIn(false);
            console.log('Checking login status:', { user: null, isLoggedIn: false });
        }
    };

    useEffect(() => {
        checkLoginStatus();
        
        const handleStorageChange = () => {
            console.log('Storage event detected');
            checkLoginStatus();
        };

        window.addEventListener('storage', handleStorageChange);
        
        const handleRouteChange = () => {
            console.log('Route change detected');
            checkLoginStatus();
        };

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [location.pathname]);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (path) => {
        navigate(path);
        handleMenuClose();
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setIsLoggedIn(false);
        navigate('/');
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, path: '/' },
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Attendance', icon: <SummarizeIcon />, path: '/attendance' },
    ];

    const leaveMenuItems = [
        { text: 'Apply Leave', icon: <ApplyIcon />, path: '/applyLeave' },
        { text: 'Leave Approval', icon: <ApprovalIcon />, path: '/leaveApproval' },
    ];

    const getUserInitials = () => {
        if (!user || !user.userName) return 'U';
        return user.userName.charAt(0).toUpperCase();
    };

    const getUserEmail = () => {
        if (!user) return '';
        return `${user.userName}@company.com`;
    };

    return (
        <Box
            sx={{
                width: collapsed ? 80 : 280,
                height: '100vh',
                backgroundColor: 'white',
                borderRight: '1px solid #e0e0e0',
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 1000,
                boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
                transition: 'width 0.3s ease',
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    backgroundColor: '#001833',
                    color: 'white',
                    p: collapsed ? 2 : 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: collapsed ? 0 : 2,
                    justifyContent: collapsed ? 'center' : 'flex-start',
                }}
            >
                {!collapsed && <SummarizeIcon sx={{ fontSize: 32 }} />}
                {!collapsed && (
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontWeight: 600,
                            cursor: 'pointer',
                            '&:hover': { opacity: 0.8 }
                        }}
                        onClick={() => navigate('/')}
                    >
                        RaaD HR
                    </Typography>
                )}
                <IconButton
                    onClick={() => setCollapsed(!collapsed)}
                    sx={{
                        color: 'white',
                        ml: collapsed ? 0 : 'auto',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                    }}
                >
                    {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </Box>

            {/* Navigation Menu */}
            <Box sx={{ p: collapsed ? 1 : 2 }}>
                {isLoggedIn ? (
                    <>
                        {!collapsed && (
                            <Typography variant="overline" sx={{ color: '#666', fontWeight: 600, mb: 1 }}>
                                MAIN MENU
                            </Typography>
                        )}
                        <List sx={{ p: 0 }}>
                            {menuItems.map((item) => (
                                <ListItem key={item.text} sx={{ p: 0, mb: 0.5 }}>
                                    <Tooltip title={collapsed ? item.text : ''} placement="right">
                                        <ListItemButton
                                            onClick={() => navigate(item.path)}
                                            sx={{
                                                borderRadius: 2,
                                                backgroundColor: isActive(item.path) ? '#001833' : 'transparent',
                                                color: isActive(item.path) ? 'white' : '#333',
                                                minHeight: collapsed ? 48 : 40,
                                                justifyContent: collapsed ? 'center' : 'flex-start',
                                                '&:hover': {
                                                    backgroundColor: isActive(item.path) ? '#001833' : '#f5f5f5',
                                                    color: isActive(item.path) ? 'white' : '#001833',
                                                },
                                                '& .MuiListItemIcon-root': {
                                                    color: isActive(item.path) ? 'white' : '#666',
                                                    minWidth: collapsed ? 0 : 40,
                                                },
                                            }}
                                        >
                                            <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40 }}>
                                                {item.icon}
                                            </ListItemIcon>
                                            {!collapsed && (
                                                <ListItemText 
                                                    primary={item.text} 
                                                    sx={{ 
                                                        '& .MuiTypography-root': { 
                                                            fontWeight: isActive(item.path) ? 600 : 400 
                                                        } 
                                                    }} 
                                                />
                                            )}
                                        </ListItemButton>
                                    </Tooltip>
                                </ListItem>
                            ))}

                            {/* User Management - Only for Admin */}
                            {user?.role === 'admin' && (
                                <ListItem sx={{ p: 0, mb: 0.5 }}>
                                    <Tooltip title={collapsed ? 'User Management' : ''} placement="right">
                                        <ListItemButton
                                            onClick={() => navigate('/userManagement')}
                                            sx={{
                                                borderRadius: 2,
                                                backgroundColor: isActive('/userManagement') ? '#001833' : 'transparent',
                                                color: isActive('/userManagement') ? 'white' : '#333',
                                                minHeight: collapsed ? 48 : 40,
                                                justifyContent: collapsed ? 'center' : 'flex-start',
                                                '&:hover': {
                                                    backgroundColor: isActive('/userManagement') ? '#001833' : '#f5f5f5',
                                                    color: isActive('/userManagement') ? 'white' : '#001833',
                                                },
                                                '& .MuiListItemIcon-root': {
                                                    color: isActive('/userManagement') ? 'white' : '#666',
                                                    minWidth: collapsed ? 0 : 40,
                                                },
                                            }}
                                        >
                                            <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40 }}>
                                                <PeopleIcon />
                                            </ListItemIcon>
                                            {!collapsed && (
                                                <ListItemText 
                                                    primary="User Management" 
                                                    sx={{ 
                                                        '& .MuiTypography-root': { 
                                                            fontWeight: isActive('/userManagement') ? 600 : 400 
                                                        } 
                                                    }} 
                                                />
                                            )}
                                        </ListItemButton>
                                    </Tooltip>
                                </ListItem>
                            )}
                        </List>

                        {!collapsed && <Divider sx={{ my: 3 }} />}

                        {!collapsed && (
                            <Typography variant="overline" sx={{ color: '#666', fontWeight: 600, mb: 1 }}>
                                LEAVE MANAGEMENT
                            </Typography>
                        )}
                        <List sx={{ p: 0 }}>
                            <ListItem sx={{ p: 0, mb: 0.5 }}>
                                <Tooltip title={collapsed ? 'Leave Management' : ''} placement="right">
                                    <ListItemButton
                                        onClick={handleMenuClick}
                                        sx={{
                                            borderRadius: 2,
                                            backgroundColor: anchorEl ? '#001833' : 'transparent',
                                            color: anchorEl ? 'white' : '#333',
                                            minHeight: collapsed ? 48 : 40,
                                            justifyContent: collapsed ? 'center' : 'flex-start',
                                            '&:hover': {
                                                backgroundColor: anchorEl ? '#001833' : '#f5f5f5',
                                                color: anchorEl ? 'white' : '#001833',
                                            },
                                            '& .MuiListItemIcon-root': {
                                                color: anchorEl ? 'white' : '#666',
                                                minWidth: collapsed ? 0 : 40,
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40 }}>
                                            <LeaveIcon />
                                        </ListItemIcon>
                                        {!collapsed && (
                                            <ListItemText 
                                                primary="Leave Management" 
                                                sx={{ 
                                                    '& .MuiTypography-root': { 
                                                        fontWeight: anchorEl ? 600 : 400 
                                                    } 
                                                }} 
                                            />
                                        )}
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                PaperProps={{
                                    sx: {
                                        mt: 1,
                                        ml: collapsed ? 4 : 4,
                                        minWidth: 200,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                        borderRadius: 2,
                                    }
                                }}
                            >
                                {leaveMenuItems.map((item) => (
                                    <MenuItem 
                                        key={item.text}
                                        onClick={() => handleNavigate(item.path)}
                                        sx={{
                                            py: 1.5,
                                            px: 2,
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5',
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: 36, color: '#666' }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </MenuItem>
                                ))}
                            </Menu>
                        </List>

                        {!collapsed && <Divider sx={{ my: 3 }} />}

                        {/* User Profile Section at Bottom */}
                        {!collapsed && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 60,
                                    left: 0,
                                    right: 0,
                                    p: 2,
                                    borderTop: '1px solid #e0e0e0',
                                    backgroundColor: '#fafafa',
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar sx={{ bgcolor: '#001833', width: 40, height: 40 }}>
                                        {getUserInitials()}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#333' }}>
                                            {user?.userName ? user.userName.charAt(0).toUpperCase() + user.userName.slice(1) : 'User'}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#666' }}>
                                            {getUserEmail()}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#001833', fontWeight: 500, display: 'block' }}>
                                            {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        )}

                        {/* Logout Button */}
                        <Box sx={{ 
                            position: 'absolute', 
                            bottom: 0, 
                            left: 0, 
                            right: 0, 
                            p: 2,
                            borderTop: '1px solid #e0e0e0',
                            backgroundColor: '#fafafa',
                        }}>
                            <Tooltip title={collapsed ? 'Logout' : ''} placement="right">
                                <ListItemButton
                                    onClick={handleLogout}
                                    sx={{
                                        borderRadius: 2,
                                        color: '#F44336',
                                        minHeight: collapsed ? 38 : 30,
                                        justifyContent: collapsed ? 'center' : 'flex-start',
                                        '&:hover': {
                                            backgroundColor: '#ffebee',
                                            color: '#d32f2f',
                                        },
                                        '& .MuiListItemIcon-root': {
                                            color: '#F44336',
                                            minWidth: collapsed ? 0 : 40,
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40 }}>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    {!collapsed && (
                                        <ListItemText 
                                            primary="Logout" 
                                            sx={{ 
                                                '& .MuiTypography-root': { 
                                                    fontWeight: 600 
                                                } 
                                            }} 
                                        />
                                    )}
                                </ListItemButton>
                            </Tooltip>
                        </Box>
                    </>
                ) : (
                    <>
                        {!collapsed && (
                            <Typography variant="overline" sx={{ color: '#666', fontWeight: 600, mb: 1 }}>
                                ACCOUNT
                            </Typography>
                        )}
                        <List sx={{ p: 0 }}>
                            <ListItem sx={{ p: 0, mb: 0.5 }}>
                                <Tooltip title={collapsed ? 'Login' : ''} placement="right">
                                    <ListItemButton
                                        onClick={() => navigate('/login')}
                                        sx={{
                                            borderRadius: 2,
                                            backgroundColor: isActive('/login') ? '#001833' : 'transparent',
                                            color: isActive('/login') ? 'white' : '#333',
                                            minHeight: collapsed ? 48 : 40,
                                            justifyContent: collapsed ? 'center' : 'flex-start',
                                            '&:hover': {
                                                backgroundColor: isActive('/login') ? '#001833' : '#f5f5f5',
                                                color: isActive('/login') ? 'white' : '#001833',
                                            },
                                            '& .MuiListItemIcon-root': {
                                                color: isActive('/login') ? 'white' : '#666',
                                                minWidth: collapsed ? 0 : 40,
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40 }}>
                                            <LoginIcon />
                                        </ListItemIcon>
                                        {!collapsed && (
                                            <ListItemText 
                                                primary="Login" 
                                                sx={{ 
                                                    '& .MuiTypography-root': { 
                                                        fontWeight: isActive('/login') ? 600 : 400 
                                                    } 
                                                }} 
                                            />
                                        )}
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                            <ListItem sx={{ p: 0, mb: 0.5 }}>
                                <Tooltip title={collapsed ? 'Sign Up' : ''} placement="right">
                                    <ListItemButton
                                        onClick={() => navigate('/signup')}
                                        sx={{
                                            borderRadius: 2,
                                            color: '#333',
                                            minHeight: collapsed ? 48 : 40,
                                            justifyContent: collapsed ? 'center' : 'flex-start',
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5',
                                                color: '#001833',
                                            },
                                            '& .MuiListItemIcon-root': {
                                                color: '#666',
                                                minWidth: collapsed ? 0 : 40,
                                            },
                                        }}
                                    >
                                        <ListItemIcon sx={{ minWidth: collapsed ? 0 : 40 }}>
                                            <SignUpIcon />
                                        </ListItemIcon>
                                        {!collapsed && <ListItemText primary="Sign Up" />}
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </List>
                    </>
                )}
            </Box>
        </Box>
    );
}

export default Navbar;
