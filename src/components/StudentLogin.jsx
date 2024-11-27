import React, { useState } from 'react';
import '../styles.css'; // Ensure this CSS file is correctly referenced

function StudentLogin({ onLogin, onResetPassword, navigateTo }) {
  const [studentID, setStudentID] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    const idRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;

    if (!idRegex.test(studentID)) {
      errors.studentID = 'Student ID must be 10 digits long.';
    }

    if (!passwordRegex.test(password) || password.length < 8) {
      errors.password = 'Password must be at least 8 characters long and contain at least one number or symbol.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onLogin(studentID, password);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Student Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Student ID
            <input
              type="text"
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
              className="input-field"
              required
            />
          </label>
          {errors.studentID && <p className="error">{errors.studentID}</p>}
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
          <button type="button" className="button" onClick={onResetPassword}>Reset Password</button>
        </form>
        <button className="button" onClick={() => navigateTo('homepage')}>Previous</button>
      </div>
    </div>
  );
}

export default StudentLogin;
