import React, { useEffect, useState } from 'react';
import './AccountList.css';

function AccountList() {
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    const storedAdmins = JSON.parse(localStorage.getItem('admins')) || [];
    setStudents(storedStudents);
    setAdmins(storedAdmins);
  }, []);

  return (
    <div className="account-list-container">
      <h2>Accounts</h2>
      <div className="accounts-section">
        <h3>Students</h3>
        <table className="accounts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Student ID</th>
              <th>Level</th>
              <th>Class Group</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.studentID}</td>
                <td>{student.level}</td>
                <td>{student.classGroup}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="accounts-section">
        <h3>Admins</h3>
        <table className="accounts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Staff ID</th>
              <th>Course</th>
              <th>Level</th>
              <th>Class Group</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={index}>
                <td>{admin.name}</td>
                <td>{admin.studentID}</td>
                <td>{admin.course}</td>
                <td>{admin.level}</td>
                <td>{admin.classGroup}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccountList;
