import React, { useEffect, useState } from 'react';
import { getCourses, addCourse } from '../firebaseService'; // Ensure this path is correct based on your project structure
import './CourseList.css'; // Ensure this CSS file is correctly referenced

function CourseList({ navigateTo }) {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    courseID: '',
    courseName: '',
    level: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const courseList = await getCourses();
      setCourses(courseList);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    await addCourse(newCourse);
    setCourses([...courses, newCourse]);
    setNewCourse({ courseID: '', courseName: '', level: '' });
  };

  const levels = [...new Set(courses.map(course => course.level))].sort((a, b) => a - b);

  return (
    <div className="course-list-container">
      <button onClick={() => navigateTo('dashboard')} className="button">Back to Dashboard</button>
      <h2>Course List</h2>

      <form onSubmit={handleAddCourse} className="add-course-form">
        <label>
          Course ID
          <input
            type="text"
            name="courseID"
            value={newCourse.courseID}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Course Name
          <input
            type="text"
            name="courseName"
            value={newCourse.courseName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Level
          <input
            type="text"
            name="level"
            value={newCourse.level}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="button">Add Course</button>
      </form>

      {levels.map(level => (
        <div key={level} className="level-section">
          <h3>Level {level}</h3>
          <div className="grid-container">
            {courses
              .filter(course => course.level === level)
              .map(course => (
                <div key={course.courseID} className="course-card">
                  <h4>{course.courseName}</h4>
                  <p>Number of Students Enrolled: {course.students ? course.students.length : 0}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseList;
