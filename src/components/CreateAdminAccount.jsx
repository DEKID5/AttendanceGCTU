import React, { useState } from 'react';
import { addAdmin } from '../firebaseService'; // Ensure this path is correct based on your project structure
import '../styles.css'; // Ensure this CSS file is correctly referenced

function CreateAdminAccount({ navigateTo }) {
  const [staffID, setStaffID] = useState('');
  const [surname, setSurname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    const idRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!idRegex.test(staffID)) {
      errors.staffID = 'Staff ID must be 10 digits long.';
    }

    if (!passwordRegex.test(password) || password.length < 8) {
      errors.password = 'Password must be at least 8 characters long and contain at least one number or symbol.';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const admin = { staffID, surname, firstname, email, password };
      await addAdmin(admin);
      navigateTo('adminLogin');
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Create Admin Account</h2>
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
            Surname
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="input-field"
              required
            />
          </label>
          <label>
            First Name
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="input-field"
              required
            />
          </label>
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
          {errors.email && <p className="error">{errors.email}</p>}
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
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          <button type="submit" className="button">Create Account</button>
        </form>
        <button className="button" onClick={() => navigateTo('adminLogin')}>Back to Login</button>
      </div>
    </div>
  );
}

export default CreateAdminAccount;
