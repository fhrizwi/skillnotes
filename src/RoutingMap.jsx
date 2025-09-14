import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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
import Store from './pages/Store'
import MyPurchases from './pages/MyPurchases'
import ProductPreview from './pages/ProductPreview'
import Cart from './pages/Cart'

function Layout() {
  const location = useLocation();
  const hideHeaderFooter = ['/login', '/signup'].includes(location.pathname);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/preview/:id" element={<ProductPreview />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-purchases" element={<MyPurchases />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refund" element={<Refund />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default function RoutingMap() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
