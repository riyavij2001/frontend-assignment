import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ApprovalLeave from './pages/Leavemanagement/ApprovalLeave'
import ApplyLeave from './pages/Leavemanagement/ApplyLeave'
import Dashboard from './pages/Dashboard'
import Attendance from './pages/Attendance'
import UserManagement from './pages/UserManagement'
import { Box } from '@mui/material'

function App() {
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  return (
    <div style={{ padding: 0, margin: 0, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <BrowserRouter>
        <Navbar collapsed={navbarCollapsed} setCollapsed={setNavbarCollapsed} />
        <Box sx={{ 
          marginLeft: navbarCollapsed ? '80px' : '280px', 
          minHeight: '100vh',
          transition: 'margin-left 0.3s ease'
        }}>
          <Routes>
            <Route path="/" element={<Home />}>
            </Route>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/leaveApproval' element={<ApprovalLeave />} />
              <Route path='/applyLeave' element={<ApplyLeave />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/attendance' element={<Attendance />} />
              <Route path='/userManagement' element={<UserManagement />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  )
}

export default App
