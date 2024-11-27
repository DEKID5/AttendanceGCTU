import React, { useState } from 'react';
import '../styles.css'; // Ensure this CSS file is correctly referenced

function StudentLogin({ onLogin, onResetPassword, navigateTo }) {
  const [studentID, setStudentID] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(studentID, password);
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

export default StudentLogin;
