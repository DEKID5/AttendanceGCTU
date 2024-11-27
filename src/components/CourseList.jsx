import React, { useEffect, useState } from 'react';
import './CourseList.css'; // Ensure this CSS file is correctly referenced

function CourseList({ navigateTo }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(storedCourses);
  }, []);

  const levels = [...new Set(courses.map(course => course.level))].sort((a, b) => a - b);

  return (
    <div className="course-list-container">
      <button onClick={() => navigateTo('dashboard')} className="button">Back to Dashboard</button>
      <h2>Course List</h2>
      {levels.map(level => (
        <div key={level} className="level-section">
          <h3>Level {level}</h3>
          <div className="grid-container">
            {courses
              .filter(course => course.level === level)
              .map((course, index) => (
                <div key={index} className="course-card">
                  <h4>{course.courseName}</h4>
                  <p>Number of Students Enrolled: {course.students.length}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseList;
