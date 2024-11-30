import React, { useEffect, useState } from 'react';

function StudentDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Example data structure for courses
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [
      {
        courseName: 'Mathematics 101',
        students: [
          { name: 'Alice', level: '100', studentID: 'S12345', attendance: [] },
          { name: 'Bob', level: '100', studentID: 'S12346', attendance: [] }
        ]
      },
      {
        courseName: 'Physics 101',
        students: [
          { name: 'Charlie', level: '200', studentID: 'S12347', attendance: [] }
        ]
      }
    ];

    // Assuming the student's ID is stored in session or local storage after login
    const studentID = localStorage.getItem('studentID');

    const studentCourses = storedCourses.filter(course =>
      course.students.some(student => student.studentID === studentID)
    ).map(course => ({
      ...course,
      students: course.students.filter(student => student.studentID === studentID)
    }));

    setCourses(studentCourses);
  }, []);

  const markAttendance = (courseName) => {
    const studentID = localStorage.getItem('studentID');
    const updatedCourses = courses.map(course => {
      if (course.courseName === courseName) {
        course.students = course.students.map(student => {
          if (student.studentID === studentID) {
            student.attendance.push(new Date().toLocaleString());
          }
          return student;
        });
      }
      return course;
    });

    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      {courses.map((course, index) => (
        <div key={index} className="course-card">
          <h3>{course.courseName}</h3>
          <p>Attendance:</p>
          <ul>
            {course.students[0].attendance.map((date, idx) => (
              <li key={idx}>{date}</li>
            ))}
          </ul>
          <button onClick={() => markAttendance(course.courseName)}>Mark Attendance</button>
        </div>
      ))}
    </div>
  );
}

export default StudentDashboard;
