import React, { useState } from 'react';

function CreateAdminAccount() {
  const [name, setName] = useState('');
  const [staffID, setStaffID] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    const admins = JSON.parse(localStorage.getItem('admins')) || [];
    admins.push({ name, staffID, password });
    localStorage.setItem('admins', JSON.stringify(admins));
    alert(`Account Created for: ${name}, Staff ID: ${staffID}`);
  };

  return (
    <div>
      <h2>Create Admin Account</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Staff ID"
        value={staffID}
        onChange={(e) => setStaffID(e.target.value)}
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

export default CreateAdminAccount;
