import React, { useState } from 'react';

function AdminLogin({ onLogin, onResetPassword }) {
  const [name, setName] = useState('');
  const [staffID, setStaffID] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (name && staffID && password) {
      onLogin();
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Admin Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        /><br />
        <input
          type="text"
          placeholder="Staff ID"
          value={staffID}
          onChange={(e) => setStaffID(e.target.value)}
          className="input-field"
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        /><br />
        <button onClick={handleLogin} className="button">Login</button>
        <button onClick={onResetPassword} className="button">Reset Password</button>
      </div>
    </div>
  );
}

export default AdminLogin;
