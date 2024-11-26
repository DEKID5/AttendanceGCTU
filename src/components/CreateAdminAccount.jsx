import React, { useState } from 'react';

function CreateAdminAccount() {
  const [name, setName] = useState('');
  const [staffID, setStaffID] = useState('');
  const [password, setPassword] = useState('');
  const [courseName, setCourseName] = useState('');

  const handleCreateAccount = () => {
    if (name && staffID && password && courseName) {
      const admins = JSON.parse(localStorage.getItem('admins')) || [];
      const courses = JSON.parse(localStorage.getItem('courses')) || [];
      
      admins.push({ name, staffID, password });
      courses.push({ courseName, students: [] });

      localStorage.setItem('admins', JSON.stringify(admins));
      localStorage.setItem('courses', JSON.stringify(courses));

      alert(`Account Created for: ${name}, Staff ID: ${staffID}`);
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Create Admin Account</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        /><br />
        <input
          type="text"
          placeholder="Staff ID"
          value={staffID}
          onChange={(e) => setStaffID(e.target.value)}
          className="input-field"
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        /><br />
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="input-field"
        /><br />
        <button onClick={handleCreateAccount} className="button">Create Account</button>
      </div>
    </div>
  );
}

export default CreateAdminAccount;
