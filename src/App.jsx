import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home.jsx'
import Cart from './Pages/Cart/Cart.jsx'
import ProductDetail from './Pages/ProductDetail/ProductDetail.jsx'
import Login from './Pages/Login/Login.jsx'

function App() {
  return (
    <div>

      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/detail/:id' element={<ProductDetail/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      
    </div>
  )
}

export default App