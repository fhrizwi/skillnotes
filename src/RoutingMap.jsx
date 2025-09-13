import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Header from './components/Header'
import Footer from './components/Footer'
import Notes from './pages/Notes'
import ContactUs from './pages/ContactUs'
import Login from './components/ui/Login'
import SignUp from './components/ui/SignUp'
import FAQ from './pages/FAQ'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Refund from './pages/Refund'

export default function RoutingMap() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refund" element={<Refund />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
