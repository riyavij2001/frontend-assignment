import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'


function App() {

  return (
    <div style={{padding:0, margin:0}}>
    <Navbar />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          {/* <Route path='' element={<Home />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
