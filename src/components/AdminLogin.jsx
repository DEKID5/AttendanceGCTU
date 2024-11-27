import React, { useState } from 'react';
import '../styles.css'; // Ensure this CSS file is correctly referenced

function AdminLogin({ onLogin, onResetPassword, navigateTo }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </label>
          <button type="submit" className="button">Login</button>
          <button type="button" className="button" onClick={onResetPassword}>Reset Password</button>
        </form>
        <button className="button" onClick={() => navigateTo('homepage')}>Previous</button>
      </div>
    </div>
  );
}

export default AdminLogin;
