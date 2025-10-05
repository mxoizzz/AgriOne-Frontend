import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './Pages/LandingPage'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Farmer/FarmerDashboard'
import Marketplace from './Pages/Farmer/FarmerMarketplace'
import AddListing from './Pages/Farmer/AddListing'
import FarmerProfile from './Pages/Farmer/FarmerProfile'
import GovSchemes from './Pages/Farmer/GovSchemes'
import Weather from './Pages/Farmer/Weather'
import FarmInputs from './Pages/Farmer/FarmInputs'
import Cart from './Pages/Farmer/Cart'
import Checkout from './Pages/Farmer/Checkout'
import EquipmentRentals from './Pages/Farmer/EquipmentRentals'
import Storage from './Pages/Farmer/Storage'
import CropGuidance from './Pages/Farmer/CropGuidance'
import Learning from './Pages/Farmer/Learning'
import BuyerMarketplace from './Pages/Buyer/Marketplace'

const App = () => {
  return (
    <div className='bg-black text-white min-h-screen'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/farmer-dashboard' element={<Dashboard/>} />
        <Route path='/farmer-marketplace' element={<Marketplace/>} />
        <Route path='/add-listing' element={<AddListing/>} />
        <Route path='/profile' element={<FarmerProfile/>} />
        <Route path='/gov-schemes' element={<GovSchemes />} />
        <Route path='/weather' element={<Weather />} />
        <Route path='/farm-inputs' element={<FarmInputs />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/equipment-rental' element={<EquipmentRentals />} />
        <Route path='/storage' element={<Storage />} />
        <Route path='/crop-guidance' element={<CropGuidance />} />
        <Route path='/learning' element={<Learning />} />
        <Route path='/marketplace' element={<BuyerMarketplace />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  )
}

export default App