import React, { useState } from 'react';

function CreateStudentAccount() {
  const [studentName, setStudentName] = useState('');
  const [studentID, setStudentID] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    if (studentName && studentID && password) {
      // Add logic to create a student account
      alert('Student account created successfully!');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Create Student Account</h2>
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
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
        <button onClick={handleCreateAccount} className="button">Create Account</button>
      </div>
    </div>
  );
}

export default CreateStudentAccount;
