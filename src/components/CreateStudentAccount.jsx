import React, { useState } from 'react';
import '../styles.css'; // Ensure the path is correct

function CreateStudentAccount({ navigateTo }) {
  const [name, setName] = useState('');
  const [studentID, setStudentID] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState(100);
  const [classGroup, setClassGroup] = useState('A');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentID) {
      alert('Student ID is required');
      return;
    }

    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.push({ name, studentID, email, password, level, classGroup });
    localStorage.setItem('students', JSON.stringify(students));

    navigateTo('homepage');
  };

  return (
    <div className="form">
      <h2>Create Student Account</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </label>
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
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </label>
        <label>
          Level
          <select value={level} onChange={(e) => setLevel(parseInt(e.target.value))} className="input-field">
            {[100, 200, 300, 400].map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </label>
        <label>
          Class Group
          <select value={classGroup} onChange={(e) => setClassGroup(e.target.value)} className="input-field">
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(group => <option key={group} value={group}>{group}</option>)}
          </select>
        </label>
        <button type="submit" className="button">Create Account</button>
      </form>
    </div>
  );
}

export default CreateStudentAccount;
