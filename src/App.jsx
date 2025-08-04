import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import ProductViewer from './pages/ProductPage'
import ProductPage from './pages/ProductPage'
import Contact from './pages/Contact'
import DistributorApply from './pages/DistributorApply'
import Header from './components/Header'
import Footer from './components/Footer'
import MoreProdutsPg from './pages/MoreProdutsPg'
import ChatBot from './components/ChatBot'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/about' element={<About/>} ></Route>
      <Route path='/products' element={<ProductPage/>} ></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/distributor' element={<DistributorApply/>}></Route>
      <Route path='/moreproducts' element={<MoreProdutsPg/>}></Route>


    </Routes>
    <ChatBot/>
    <Footer/>
      
    </>
  )
}

export default App
