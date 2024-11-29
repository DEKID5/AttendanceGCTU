import React, { useEffect, useState } from 'react';
import { getStudents } from '../firebaseService';
import '../styles.css';

function AccountList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const studentsList = await getStudents();
      setStudents(studentsList);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="form">
        <h2>Student Accounts</h2>
        <table className="student-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Surname</th>
              <th>Firstname</th>
              <th>Email</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.studentID}</td>
                <td>{student.surname}</td>
                <td>{student.firstname}</td>
                <td>{student.email}</td>
                <td>{student.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccountList;
