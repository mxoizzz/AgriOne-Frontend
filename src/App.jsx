import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import Login from './Pages/Login'
import Register from './Pages/Register'

const App = () => {
  return (
    <div className='bg-black text-white min-h-screen'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  )
}

export default App