import React, { useEffect, useState } from 'react';

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
    <div>
      <h2>Accounts</h2>
      <h3>Students</h3>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {student.name} (ID: {student.studentID})
          </li>
        ))}
      </ul>
      <h3>Admins</h3>
      <ul>
        {admins.map((admin, index) => (
          <li key={index}>
            {admin.name} (Staff ID: {admin.staffID})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AccountList;
