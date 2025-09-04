import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import ProductPage from './pages/ProductPage'
import Contact from './pages/Contact'
import DistributorApply from './pages/DistributorApply'
import MoreProdutsPg from './pages/MoreProdutsPg'
import ChatBot from './components/ChatBot'
import Header from './components/Header'
import Footer from './components/Footer'

import Downloads from './pages/Downloads'

function App() {
  const location = useLocation()
  
  // Pages where you DON'T want Header & Footer
  const hideHeaderFooter = ['/admin/login','/admin/dashboard','/admin/products','/admin/products/add','/admin/enquiries','/admin/distributors']

  const shouldHide = hideHeaderFooter.includes(location.pathname)

  return (
    <>
      {!shouldHide && <Header />}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/products/:id' element={<ProductPage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/distributor' element={<DistributorApply />} />
        <Route path='/moreproducts' element={<MoreProdutsPg />} />
        <Route path='/download' element={<Downloads />} />

        





      </Routes>

      {!shouldHide && <ChatBot />}
      {!shouldHide && <Footer />}
    </>
  )
}

export default App
