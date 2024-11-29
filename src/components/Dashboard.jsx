import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import '../styles.css';
import { deleteCourseFromDB, addCourse as addCourseToDB, getCourseListener } from '../firebaseService'; // Removed getCourses import

function Dashboard() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [courses, setCourses] = useState([]);
  const [qrCodes, setQrCodes] = useState({});
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    courseName: '',
    level: '',
    classGroup: 'A'
  });
  const [showDelete, setShowDelete] = useState(null);
  const [qrPopup, setQrPopup] = useState({ show: false, courseName: '' });

  useEffect(() => {
    const unsubscribe = getCourseListener((coursesList) => {
      setCourses(coursesList);
    });

    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    return () => {
      unsubscribe(); // Cleanup listener on unmount
    };
  }, [isDarkMode]);

  const generateQrCode = (courseName) => {
    const newQrCode = `${courseName}-attendance-${Date.now()}`;
    setQrCodes(prevQrCodes => ({ ...prevQrCodes, [courseName]: newQrCode }));
  };

  const toggleCourse = (courseName) => {
    if (expandedCourse === courseName) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseName);
    }
  };

  const handleAddCourse = async () => {
    try {
      await addCourseToDB(newCourse);
      setNewCourse({ courseName: '', level: '', classGroup: 'A' });
      document.getElementById('add-course-form').style.display = 'none';
    } catch (error) {
      console.error('Failed to add course:', error);
    }
  };

  const handleDeleteCourse = async (courseID) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourseFromDB(courseID);
      } catch (error) {
        console.error('Failed to delete course:', error);
      }
    }
  };

  const getClassGroupTables = (course) => {
    if (!course.students || !Array.isArray(course.students)) {
      return null;
    }

    const classGroups = [...new Set(course.students.map(student => student.classGroup))];

    return classGroups.map((group, index) => (
      <div key={index}>
        <h4>Class Group: {group}</h4>
        <table className="student-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              {Array.from({ length: 15 }).map((_, week) => (
                <th key={week}>Week {week + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {course.students
              .filter(student => student.classGroup === group)
              .map((student, studentIndex) => (
                <tr key={studentIndex}>
                  <td>{student.studentID}</td>
                  <td>{`${student.surname} ${student.firstname}`}</td>
                  {Array.from({ length: 15 }).map((_, week) => (
                    <td key={week}>
                      <input
                        type="checkbox"
                        name={`attendance-${studentIndex}-week${week + 1}`}
                        checked={student.attendance?.[week] || false}
                        readOnly
                        style={{ backgroundColor: student.attendance?.[week] ? 'green' : 'transparent' }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    ));
  };

  const handleQrClick = (courseName) => {
    setQrPopup({ show: true, courseName });
  };

  const closeQrPopup = () => {
    setQrPopup({ show: false, courseName: '' });
  };

  const handleContextMenu = (event, courseID) => {
    event.preventDefault();
    setShowDelete(courseID);
  };

  const handleMouseDown = (courseID) => {
    let timer;
    timer = setTimeout(() => {
      setShowDelete(courseID);
    }, 800);

    return () => clearTimeout(timer);
  };

  return (
    <div className="dashboard-container full-page">
      <div className="sidebar">
        <h2>HiTech University</h2>
        <div className="menu-container">
          <button className="menu-btn" onClick={() => navigate('/courseList')}>View Courses</button>
          <button className="menu-btn" onClick={() => document.getElementById('add-course-form').style.display = 'block'}>Add Course</button>
          <button className="menu-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
            🌙 Toggle Dark Mode
          </button>
        </div>
      </div>
      <div className="dashboard-content">
        <h2>Admin Dashboard</h2>
        <div id="add-course-form" style={{ display: 'none' }}>
          <h3>Add a New Course</h3>
          <input
            type="text"
            placeholder="Course Name"
            value={newCourse.courseName}
            onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Level"
            value={newCourse.level}
            onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
            className="input-field"
          />
          <select
            value={newCourse.classGroup}
            onChange={(e) => setNewCourse({ ...newCourse, classGroup: e.target.value })}
            className="input-field"
          >
            {[...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'].map(letter => (
              <option key={letter} value={letter}>{letter}</option>
            ))}
          </select>
          <button onClick={handleAddCourse} className="button">Add Course</button>
        </div>
        <div className="course-list-grid">
          {courses.map((course, index) => (
            <div
              key={index}
              className="course-section square-tile"
              onContextMenu={(event) => handleContextMenu(event, course.id)}
              onMouseDown={() => handleMouseDown(course.id)}
            >
              <h3 onClick={() => toggleCourse(course.courseName)}>{course.courseName}</h3>
              {showDelete === course.id && (
                <button className="button delete" onClick={() => handleDeleteCourse(course.id)}>
                  Delete Course
                </button>
              )}
              {expandedCourse === course.courseName && (
                <>
                  <button onClick={() => generateQrCode(course.courseName)} className="button">Generate QR Code</button>
                  {qrCodes[course.courseName] && (
                    <div onClick={() => handleQrClick(course.courseName)} style={{ cursor: 'pointer' }}>
                      <QRCodeCanvas value={qrCodes[course.courseName]} />
                    </div>
                  )}
                  {getClassGroupTables(course)}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="navigation-buttons">
        <button onClick={() => navigate('/')} className="nav-button">Back</button>
        <button onClick={() => navigate('/dashboard')} className="nav-button previous-button">Previous</button>
      </div>

      {qrPopup.show && (
        <div className="qr-popup">
          <div className="qr-popup-content">
            <button className="close-button" onClick={closeQrPopup}>Close</button>
            <QRCodeCanvas value={qrCodes[qrPopup.courseName]} size={256} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
