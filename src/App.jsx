import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import PlatDetail from './pages/PlatDetail'
import Checkout from './pages/Checkout'
import OrderHistory from './pages/OrderHistory'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/plats/:id" element={<PlatDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/commandes" element={<OrderHistory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
