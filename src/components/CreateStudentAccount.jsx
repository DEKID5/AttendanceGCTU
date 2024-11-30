import React, { useState } from 'react';

function CreateStudentAccount() {
  const [name, setName] = useState('');
  const [studentID, setStudentID] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.push({ name, studentID, password });
    localStorage.setItem('students', JSON.stringify(students));
    alert(`Account Created for: ${name}, Student ID: ${studentID}`);
  };

  return (
    <div>
      <h2>Create Student Account</h2>
      <input
        type="text"
        placeholder="Name"
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
      <button onClick={handleCreateAccount}>Create Account</button>
    </div>
  );
}

export default CreateStudentAccount;
