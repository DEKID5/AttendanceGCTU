import React, { useState, useEffect } from 'react';
import { joinCourse, getCourses, updateAttendance, deleteCourseFromDB } from '../firebaseService';
import QRCodeScanner from './QRCodeScanner'; 
import '../styles.css';

function StudentDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [courses, setCourses] = useState([]);
  const [studentID] = useState(localStorage.getItem('studentID')); 
  const [joinedCourses, setJoinedCourses] = useState([]);
  const [errors, setErrors] = useState({});
  const [scanningCourse, setScanningCourse] = useState(null); // State to handle QR scanning

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseList = await getCourses();
        setCourses(courseList);
        const joined = courseList.filter(course => course.students?.some(student => student.studentID === studentID)).map(course => course.id);
        setJoinedCourses(joined);
      } catch (error) {
        setErrors({ fetch: 'Failed to fetch courses' });
      }
    };

    fetchCourses();
  }, [studentID]);

  const handleJoinCourse = async (courseID) => {
    try {
      await joinCourse(courseID, { studentID });
      setJoinedCourses([...joinedCourses, courseID]);
    } catch (error) {
      setErrors({ join: 'Failed to join course' });
    }
  };

  const handleDeleteCourse = async (courseID) => {
    try {
      await deleteCourseFromDB(courseID);
      setCourses(courses.filter(course => course.id !== courseID));
      setJoinedCourses(joinedCourses.filter(id => id !== courseID));
    } catch (error) {
      setErrors({ delete: 'Failed to delete course' });
    }
  };

  const handleQrScan = async (data) => {
    try {
      if (data) {
        await updateAttendance(scanningCourse, studentID); // Use scanningCourse to update attendance
        setScanningCourse(null); // Stop scanning after successful scan
      }
    } catch (error) {
      setErrors({ qr: 'Failed to scan QR code' });
    }
  };

  return (
    <div className="dashboard-container full-page">
      <button onClick={() => setIsDarkMode(!isDarkMode)} className="toggle-button">
        🌙
      </button>
      <div className="full-height-width">
        <h2>Student Dashboard</h2>
        <div className="course-list-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-section">
              <h3>{course.courseName}</h3>
              <p>Level: {course.level}</p>
              <p>Class Group: {course.classGroup}</p>
              <button
                className={`button ${joinedCourses.includes(course.id) ? 'joined' : ''}`}
                onClick={() => handleJoinCourse(course.id)}
              >
                {joinedCourses.includes(course.id) ? 'Joined' : 'Join Course'}
              </button>
              <button
                className="button delete"
                onClick={() => handleDeleteCourse(course.id)}
              >
                Delete Course
              </button>
              {joinedCourses.includes(course.id) && (
                <div>
                  <button
                    className="button"
                    onClick={() => setScanningCourse(course.id)}
                  >
                    Scan QR Code
                  </button>
                  {scanningCourse === course.id && <QRCodeScanner onScan={handleQrScan} />}
                </div>
              )}
            </div>
          ))}
        </div>
        {errors.fetch && <p className="error">{errors.fetch}</p>}
        {errors.join && <p className="error">{errors.join}</p>}
        {errors.delete && <p className="error">{errors.delete}</p>}
        {errors.qr && <p className="error">{errors.qr}</p>}
      </div>
    </div>
  );
}

export default StudentDashboard;
