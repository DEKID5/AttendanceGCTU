import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; // Ensure this CSS file exists and is referenced correctly

function Homepage() {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [showSignupOptions, setShowSignupOptions] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div className="homepage-container">
      <button onClick={() => setIsDarkMode(!isDarkMode)} className="toggle-button">
        🌙 {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className="glass-effect">
        <h1 className="title">GCTU ATTENDANCE SYSTEM</h1>
        <div className="top-banner"></div> {/* Add the top banner */}
        <div className="form-container">
          {!showLoginOptions && !showSignupOptions ? (
            <>
              <button className="button" onClick={() => setShowLoginOptions(true)}>Login</button>
              <button className="button" onClick={() => setShowSignupOptions(true)}>Signup</button>
            </>
          ) : (
            <>
              {showLoginOptions ? (
                <>
                  <Link to="/studentLogin">
                    <button className="button">Student Login</button>
                  </Link>
                  <Link to="/adminLogin">
                    <button className="button">Admin Login</button>
                  </Link>
                  <button className="button" onClick={() => setShowLoginOptions(false)}>Back</button>
                </>
              ) : (
                <>
                  <Link to="/createStudentAccount">
                    <button className="button">Create Student Account</button>
                  </Link>
                  <Link to="/createAdminAccount">
                    <button className="button">Create Admin Account</button>
                  </Link>
                  <button className="button" onClick={() => setShowSignupOptions(false)}>Back</button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
