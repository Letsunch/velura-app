// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomeScreen from './screens/HomeScreen';
import StylistsList from './screens/StylistsList';
import BookingScreen from './screens/BookingScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import AdminLogin from './screens/AdminLogin';
import AdminDashboard from './screens/AdminDashboard';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/stylists" element={<StylistsList />} />
        <Route path="/booking" element={<BookingScreen />} />
        <Route path="/confirmation" element={<ConfirmationScreen />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Lato:wght@400;700&family=Playfair+Display:wght@500;700&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background-color: #E5E8EC;
          color: #1B1F3B;
        }

        button {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </Router>
  );
}

// ScrollToTop Component to auto-scroll on route change
function ScrollToTop() {
  React.useEffect(() => {
    const unlisten = window.scrollTo(0, 0);
    return () => unlisten;
  }, []);
  return null;
}
