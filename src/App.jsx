import React, { useState, useEffect } from 'react'
import LandingPage from '../LandingPage'
import AdminPanel from '../AdminPanel'
import './index.css'

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  // Check URL hash for admin panel
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('landing');
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="App">
      {currentPage === 'admin' ? <AdminPanel /> : <LandingPage />}
    </div>
  )
}

export default App
