import React, { useState } from 'react';

function StudentLogin() {
  const [name, setName] = useState('');
  const [studentID, setStudentID] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here
    alert(`Student Name: ${name}, Student ID: ${studentID}`);
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
    </div>
  );
}

export default StudentLogin;
