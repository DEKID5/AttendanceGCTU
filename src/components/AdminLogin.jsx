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
    <div>
      <h2>Admin Login</h2>
      <input
        type="text"
        placeholder="Admin Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Staff ID"
        value={staffID}
        onChange={(e) => setStaffID(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={onResetPassword}>Reset Password</button> {/* Add Reset Password button */}
    </div>
  );
}

export default AdminLogin;
