import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Ensure this CSS file is correctly referenced

function CourseList({ courses }) {
  const navigate = useNavigate();

  const handleViewCourse = (courseID) => {
    navigate(`/course/${courseID}`);
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Course List</h2>
        <div>
          {courses.map((course, index) => (
            <div key={index} className="course-card">
              <h4>{course.courseName}</h4>
              <p>{course.description}</p>
              <button onClick={() => handleViewCourse(course.id)} className="button">View Course</button>
            </div>
          ))}
        </div>
        <button className="button" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    </div>
  );
}

export default CourseList;
