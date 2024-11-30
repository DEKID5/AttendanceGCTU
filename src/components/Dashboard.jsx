import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import '../styles.css';
import { addCourse as addCourseToDB, getCourseListener } from '../firebaseService';

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
      toggleMenu('add-course-form');
    } catch (error) {
      console.error('Failed to add course:', error);
    }
  };

  const toggleMenu = (menuId) => {
    const menu = document.getElementById(menuId);
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
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

  return (
    <div className="dashboard-container full-page">
      <div className="sidebar">
        <h2>HiTech University</h2>
        <div className="menu-container">
          <button className="menu-btn" onClick={() => toggleMenu('view-courses')}>View Courses</button>
          <button className="menu-btn" onClick={() => toggleMenu('add-course-form')}>Add Course</button>
          <button className="menu-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
            🌙 Toggle Dark Mode
          </button>
          <div id="view-courses" style={{ display: 'none' }}>
            {courses.map((course) => (
              <div
                key={course.id}
                className="course-section square-tile"
                style={{ padding: '10px', margin: '5px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                onClick={() => {
                  toggleCourse(course.courseName);
                  toggleMenu('view-courses');
                }}
              >
                <h3>{course.courseName}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="dashboard-content" style={{ marginLeft: '260px', padding: '20px' }}>
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
        {expandedCourse && (
          <div className="course-details" style={{ marginTop: '20px' }}>
            <div className="attendance-sheet" style={{ marginRight: '20px' }}>
              {courses.filter(course => course.courseName === expandedCourse).map(course => (
                <div key={course.id}>
                  {getClassGroupTables(course)}
                </div>
              ))}
            </div>
            <div className="qr-code-section" style={{ display: 'inline-block', verticalAlign: 'top' }}>
              <button onClick={() => generateQrCode(expandedCourse)} className="button">Generate QR Code</button>
              {qrCodes[expandedCourse] && (
                <div onClick={() => handleQrClick(expandedCourse)} style={{ cursor: 'pointer' }}>
                  <QRCodeCanvas value={qrCodes[expandedCourse]} size={256} />
                </div>
              )}
            </div>
          </div>
        )}
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
