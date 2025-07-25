import React from 'react'
import SummarizeIcon from '@mui/icons-material/Summarize';
import Button from '@mui/material/Button';
import { Navigate, useNavigate } from 'react-router-dom';

function Navbar() {
        
    return (
        <div style={{ backgroundColor: '#001833', display: 'flex', justifyContent: 'space-between', width: '100%', height: '3rem' }}>
            <div style={{display:'flex', alignItems:'center'}}>
                <SummarizeIcon style={{ color: 'white' }} />
            </div>
            <div style={{display:'flex', alignItems:'center' }}>
                <Button style={{ color: 'white' }} href='/'>Home</Button>
                <Button style={{ color: 'white' }}>Leave Management</Button>
                <Button style={{ color: 'white' }}>Dashboard</Button>
            </div>
            <div style={{display:'flex', alignItems:'center'}}>
                <Button style={{ color: 'white' }} href='/login'>Login</Button>
                <Button style={{ color: 'white' }}>Sign Up</Button>
            </div>
        </div>
    )
}

export default Navbar