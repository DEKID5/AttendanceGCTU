import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch and set courses from local storage
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(storedCourses);

    // Fetch and set students from local storage
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(storedStudents);
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      <div className="content">
        <div className="student-table">
          <h3>Student Accounts</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Student ID</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.studentID}</td>
                  <td>{student.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="course-list">
          <h3>Courses Available</h3>
          {courses.map((course, index) => (
            <div key={index} className="course-card">
              <h4>{course.courseName}</h4>
              <p>Number of Students Enrolled: {course.students.length}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
