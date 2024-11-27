import React, { useState } from 'react';
import '../styles.css'; // Ensure this CSS file is correctly referenced

function CreateAdminAccount({ navigateTo }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to create an admin account here
    navigateTo('adminLogin');
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Create Admin Account</h2>
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
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              required
            />
          </label>
          <button type="submit" className="button">Create Account</button>
        </form>
        <button className="button" onClick={() => navigateTo('adminLogin')}>Back to Login</button>
      </div>
    </div>
  );
}

export default CreateAdminAccount;
