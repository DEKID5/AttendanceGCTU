import React, { useState } from 'react';

function Homepage({ setView }) {
  const [showCreateOptions, setShowCreateOptions] = useState(false);

  const homepageStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundImage: `url('/GCTU.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    color: '#000000' // Set text color to black
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)'  // White overlay with transparency
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 1
  };

  const bannerStyle = {
    width: '100%',
    maxWidth: '600px', // Adjust as needed
    marginBottom: '20px'
  };

  return (
    <div style={homepageStyle}>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <img src="/top-banner.png" alt="Top Banner" style={bannerStyle} />
        <h1 style={{ fontWeight: 'bold' }}>GCTU STUDENT ATTENDANCE SYSTEM</h1>
        {showCreateOptions ? (
          <div className="create-options">
            <button onClick={() => setView('createStudentAccount')}>Create Student Account</button>
            <button onClick={() => setView('createAdminAccount')}>Create Admin Account</button>
            <button onClick={() => setShowCreateOptions(false)}>Back</button> {/* Add a back button to return to main options */}
          </div>
        ) : (
          <div className="buttons">
            <button onClick={() => setView('login')}>Login</button>
            <button onClick={() => setShowCreateOptions(true)}>Create Account</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
