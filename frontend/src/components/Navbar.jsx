import React from 'react'
import SummarizeIcon from '@mui/icons-material/Summarize';
import Button from '@mui/material/Button';

function Navbar() {
    return (
        <div style={{ backgroundColor: '#001833', display:'flex', justifyContent:'space-between', width:'100%', height:'2rem' }}>
            <SummarizeIcon style={{ color: 'white' }} />
                <div style={{color:'white'}}>
                    <Button style={{color:'white'}}>Home</Button>
                    <Button style={{color:'white'}}>Leave Management</Button>
                    <Button style={{color:'white'}}>Dashboard</Button>
                </div>
                <div>
                    <Button style={{color:'white'}}>Login</Button>
                    <Button style={{color:'white'}}>Sign Up</Button>
                </div>
        </div>
    )
}

export default Navbar