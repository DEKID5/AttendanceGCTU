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
    <div>
      <h2>Student Login</h2>
      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Student ID"
        value={studentID}
        onChange={(e) => setStudentID(e.target.value)}
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

export default StudentLogin;
