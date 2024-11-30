import React, { useEffect, useState } from 'react';

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(storedCourses);
  }, []);

  return (
    <div>
      <h2>Course List</h2>
      {courses.map((course, index) => (
        <div key={index}>
          <h3>{course.courseName}</h3>
          <p>Number of Students Enrolled: {course.students.length}</p>
          <ul>
            {course.students.map((student, studentIndex) => (
              <li key={studentIndex}>
                {student.name} (Level: {student.level}, ID: {student.studentID})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CourseList;
