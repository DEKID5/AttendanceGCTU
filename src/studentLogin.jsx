import React, { useState } from 'react';

function StudentLogin({ onLogin, onResetPassword }) {
  const [name, setName] = useState('');
  const [studentID, setStudentID] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (name && studentID && password) {
      onLogin(studentID);
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Student Login</h2>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        /><br />
        <input
          type="text"
          placeholder="Student ID"
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
          className="input-field"
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        /><br />
        <button onClick={handleLogin} className="login-button">Login</button>
        <button onClick={onResetPassword} className="reset-button">Reset Password</button>
      </div>
    </div>
  );
}

export default StudentLogin;
