import React, { useState, useEffect } from 'react';
import '../styles.css'; // Ensure this CSS file exists and is referenced correctly

function Homepage({ setView }) {
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [showCreateOptions, setShowCreateOptions] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div className="homepage-container">
      <button onClick={() => setIsDarkMode(!isDarkMode)} className="toggle-button">
        🌙 {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className="overlay"></div>
      <div className="content" style={{ marginRight: '5%' }}>
        <img src="/top-banner.png" alt="Top Banner" className="banner" />
        {!showLoginOptions ? (
          <button className="button" onClick={() => setShowLoginOptions(true)}>Login</button>
        ) : (
          <div>
            <button className="button" onClick={() => setView('adminLogin')}>Admin Login</button>
            <button className="button" onClick={() => setView('studentLogin')}>Student Login</button>
            <button className="button" onClick={() => setShowLoginOptions(false)}>Back</button>
          </div>
        )}
      </div>
      <div className="content">
        <h2>Hi There!</h2>
        <p>If you don't have an account, you can Sign Up here!</p>
        {showCreateOptions ? (
          <div className="create-options">
            <button onClick={() => setView('createStudentAccount')} className="button">Create Student Account</button>
            <button onClick={() => setView('createAdminAccount')} className="button">Create Admin Account</button>
            <button onClick={() => setShowCreateOptions(false)} className="button">Back</button>
          </div>
        ) : (
          <button onClick={() => setShowCreateOptions(true)} className="button">SIGN UP</button>
        )}
      </div>
    </div>
  );
}

export default Homepage;
