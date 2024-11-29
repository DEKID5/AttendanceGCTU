import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStudent } from '../firebaseService'; 
import '../styles.css';

function CreateStudentAccount() {
  const navigate = useNavigate();
  const [studentID, setStudentID] = useState('');
  const [surname, setSurname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [level, setLevel] = useState('');
  const [errors, setErrors] = useState({});
  const [accountExists, setAccountExists] = useState(false);

  const validate = () => {
    const errors = {};

    const idRegex = /^\d{10}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!idRegex.test(studentID)) {
      errors.studentID = 'Student ID must be 10 digits long.';
    }

    if (!passwordRegex.test(password) || password.length < 8) {
      errors.password = 'Password must be at least 8 characters long and contain at least one number or symbol.';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const student = { studentID, surname, firstname, email, password, level };
      try {
        await addStudent(student);
        navigate('/studentLogin');
      } catch (error) {
        if (error.message === 'Student ID already exists.') {
          setAccountExists(true);
        } else {
          console.error(error);
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Create Student Account</h2>
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
            Surname
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="input-field"
              required
            />
          </label>
          <label>
            First Name
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
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
              required
            />
          </label>
          {errors.email && <p className="error">{errors.email}</p>}
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
          <label>
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              required
            />
          </label>
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          <label>
            Level
            <input
              type="text"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="input-field"
              required
            />
          </label>
          <button type="submit" className="button">Create Account</button>
        </form>
        {accountExists && <p className="error">Account with this Student ID already exists.</p>}
        <button className="button" onClick={() => navigate('/studentLogin')}>Back to Login</button>
      </div>
    </div>
  );
}

export default CreateStudentAccount;
