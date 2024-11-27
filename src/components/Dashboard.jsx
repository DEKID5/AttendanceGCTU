import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { getCourses, addCourse as addCourseToDB } from '../firebaseService'; // Ensure this path is correct based on your project structure
import '../styles.css'; // Ensure this CSS file exists

function Dashboard({ navigateTo }) {
  const [courses, setCourses] = useState([]);
  const [qrCodes, setQrCodes] = useState({});
  const [newCourse, setNewCourse] = useState('');
  const [newCourseLevel, setNewCourseLevel] = useState(100);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const fetchData = async () => {
      const courseList = await getCourses();
      setCourses(courseList);
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const generateQrCode = (courseName) => {
    const newQrCode = `${courseName}-attendance-${Date.now()}`;
    setQrCodes(prevQrCodes => ({ ...prevQrCodes, [courseName]: newQrCode }));
  };

  const addCourse = async () => {
    if (newCourse) {
      const newCourseData = { courseID: `${newCourse}-${newCourseLevel}`, courseName: newCourse, level: newCourseLevel, students: [] };
      await addCourseToDB(newCourseData);
      setCourses([...courses, newCourseData]);
      setNewCourse('');
      setNewCourseLevel(100);
    }
  };

  const deleteCourse = (courseName) => {
    const updatedCourses = courses.filter(course => course.courseName !== courseName);
    setCourses(updatedCourses);
  };

  return (
    <div className="dashboard-container">
      <button onClick={() => setIsDarkMode(!isDarkMode)} className="toggle-button">
        🌙
      </button>
      <div className="sidebar">
        <div className="dropdown">
          <button className="menu-btn">☰ Menu</button>
          <div className="dropdown-menu">
            <button onClick={() => navigateTo('accountList')}>View Accounts</button>
            <button onClick={() => navigateTo('courseList')}>View Courses</button>
          </div>
        </div>
      </div>
      <div className="dashboard-content">
        <h2>Admin Dashboard</h2>
        <div className="content">
          <div className="course-list">
            <h3>Courses Available</h3>
            <input
              type="text"
              placeholder="Add new course"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
              className="input-field"
            />
            <select value={newCourseLevel} onChange={(e) => setNewCourseLevel(parseInt(e.target.value))} className="input-field">
              {[100, 200, 300, 400].map(level => <option key={level} value={level}>{level}</option>)}
            </select>
            <button onClick={addCourse} className="button">Add Course</button>
            {courses.map((course, index) => (
              <div key={index} className="course-card">
                <h4>{course.courseName}</h4>
                <p>Level: {course.level}</p>
                <p>Number of Students Enrolled: {course.students ? course.students.length : 0}</p>
                <button onClick={() => generateQrCode(course.courseName)} className="button">Generate QR Code</button>
                <button onClick={() => deleteCourse(course.courseName)} className="button">Delete Course</button>
                {qrCodes[course.courseName] && <QRCodeCanvas value={qrCodes[course.courseName]} />}
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Student ID</th>
                      <th>Level</th>
                      <th>Class Group</th>
                      {Array.from({ length: 31 }, (_, i) => (
                        <th key={i + 1}>{i + 1}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {course.students && course.students.map((student, studentIndex) => (
                      <tr key={studentIndex}>
                        <td>{`${student.surname} ${student.firstname}`}</td>
                        <td>{student.studentID}</td>
                        <td>{student.level}</td>
                        <td>{student.classGroup}</td>
                        {Array.from({ length: 31 }, (_, i) => (
                          <td key={i + 1}>
                            <input
                              type="checkbox"
                              checked={student.attendance && student.attendance[i + 1]}
                              readOnly
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
            <button onClick={() => navigateTo('homepage')} className="button">Go to Homepage</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
