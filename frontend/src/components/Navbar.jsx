import React, { useState } from 'react';
import SummarizeIcon from '@mui/icons-material/Summarize';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

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

    return (
        <div
            style={{
                backgroundColor: '#001833',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                height: '3rem',
                padding: '0 1rem',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <SummarizeIcon style={{ color: 'white', height:'2rem', width:'2rem' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button style={{ color: 'white' }} onClick={() => navigate('/')}>
                    Home
                </Button>

                <Button
                    style={{ color: 'white' }}
                    onClick={handleMenuClick}
                >
                    Leave Management
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => handleNavigate('/applyLeave')}>
                        Apply Leave
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigate('/leaveApproval')}>
                        Leave Approval
                    </MenuItem>
                </Menu>

                <Button style={{ color: 'white' }} onClick={() => navigate('/dashboard')}>
                    Dashboard
                </Button>
                <Button style={{ color: 'white' }} onClick={() => navigate('/attendance')}>
                    Attendance
                </Button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button style={{ color: 'white' }} onClick={() => navigate('/login')}>
                    Login
                </Button>
                <Button style={{ color: 'white' }}>Sign Up</Button>
            </div>
        </div>
    );
}

export default Navbar;
