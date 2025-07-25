import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Login from './pages/Login'
import ApprovalLeave from './pages/Leavemanagement/ApprovalLeave'
import ApplyLeave from './pages/Leavemanagement/ApplyLeave'
import Dashboard from './pages/Dashboard'
import Attendance from './pages/Attendance'


function App() {

  return (
    <div style={{ padding: 0, margin: 0 }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/leaveApproval' element={<ApprovalLeave />} />
            <Route path='/applyLeave' element={<ApplyLeave />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/attendance' element={<Attendance />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
