import React, { useEffect, useState } from 'react';
import { getStudents, getAdmins } from '../firebaseService'; // Ensure this path is correct based on your project structure
import './AccountList.css';

function AccountList() {
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const studentList = await getStudents();
      const adminList = await getAdmins();
      setStudents(studentList);
      setAdmins(adminList);
    };

    fetchData();
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
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.studentID}>
                <td>{`${student.surname} ${student.firstname}`}</td>
                <td>{student.studentID}</td>
                <td>{student.level}</td>
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
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.staffID}>
                <td>{`${admin.surname} ${admin.firstname}`}</td>
                <td>{admin.staffID}</td>
                <td>{admin.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccountList;
