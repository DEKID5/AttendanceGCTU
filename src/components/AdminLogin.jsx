import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../firebaseService';
import '../styles.css';

function AdminLogin({ onLogin }) {
  const navigate = useNavigate();
  const [staffID, setStaffID] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginFailed, setLoginFailed] = useState(false);

  const validate = () => {
    const errors = {};
    if (!staffID) {
      errors.staffID = 'Staff ID is required.';
    }
    if (!password) {
      errors.password = 'Password is required.';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await authenticateUser('admins', staffID, password);
        onLogin(staffID);
        navigate('/dashboard');
      } catch (error) {
        if (error.message === 'Invalid credentials.') {
          setLoginFailed(true);
        } else {
          console.error(error);
        }
      }
    }
  };

  const handleResetPassword = () => {
    navigate('/passwordReset');
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Staff ID
            <input
              type="text"
              value={staffID}
              onChange={(e) => setStaffID(e.target.value)}
              className="input-field"
              required
            />
          </label>
          {errors.staffID && <p className="error">{errors.staffID}</p>}
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
          {errors.password && <p className="error">{errors.password}</p>}
          <button type="submit" className="button">Login</button>
          <button type="button" className="button" onClick={handleResetPassword}>Reset Password</button>
        </form>
        {loginFailed && <p className="error">Invalid credentials. Please try again.</p>}
        <button className="button" onClick={() => navigate('/')}>Previous</button>
      </div>
    </div>
  );
}

export default AdminLogin;
