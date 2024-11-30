import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCodeScanner from './QRCodeScanner'; // Ensure this is correctly imported
import '../styles.css';
import { getCourses, joinCourse, checkIfJoined } from '../firebaseService';

function StudentDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [joinedCourses, setJoinedCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const courseList = await getCourses();
      setCourses(courseList);
      const studentID = localStorage.getItem('studentID');
      const joined = await Promise.all(courseList.map(course => checkIfJoined(course.id, studentID)));
      setJoinedCourses(joined.map((isJoined, idx) => isJoined ? courseList[idx].id : null).filter(Boolean));
    };

    fetchCourses();
  }, []);

  const handleCourseJoin = async (courseID) => {
    const studentID = localStorage.getItem('studentID');
    if (studentID) {
      await joinCourse(courseID, { studentID });
      setJoinedCourses([...joinedCourses, courseID]);
      alert('You have successfully joined the course!');
    }
  };

  const handleCourseClick = (courseID) => {
    setShowQrScanner(true);
  };

  return (
    <div className="dashboard-container full-page">
      <div className="analog-clock">
        <iframe 
          src="https://free.timeanddate.com/clock/i8bfr09r/n2338/tluk/fn16/fs24/fcfff/tct/pct/ftb/bls0/brt0/bas2/bac00/pa7" 
          frameBorder="0" 
          width="104" 
          height="104" 
          title="Analog Clock"
        ></iframe>
      </div>
      <div className="student-sidebar">
        <h2>Available Courses</h2>
        <div className="course-list-grid">
          {courses.map((course) => (
            <div
              key={course.id}
              className="course-section square-tile"
              onContextMenu={(e) => {
                e.preventDefault();
                if (!joinedCourses.includes(course.id)) {
                  handleCourseJoin(course.id);
                }
              }}
              onClick={() => handleCourseClick(course.id)}
            >
              <h3>{course.courseName}</h3>
              {joinedCourses.includes(course.id) ? (
                <button className="button disabled">Course Joined</button>
              ) : (
                <button className="button">Join Course</button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="dashboard-content">
        <h2>Student Dashboard</h2>
        {showQrScanner && (
          <div className="qr-scanner-container">
            <QRCodeScanner 
              onScan={(data) => {
                console.log(data); // Handle QR scan result
                setShowQrScanner(false);
              }} 
              onError={(error) => {
                console.error(error);
                setShowQrScanner(false);
              }} 
            />
            <button className="button" onClick={() => setShowQrScanner(false)}>Close Scanner</button>
          </div>
        )}
      </div>
      <div className="navigation-buttons">
        <button onClick={() => navigate('/')} className="nav-button">Back</button>
        <button onClick={() => navigate('/dashboard')} className="nav-button previous-button">Previous</button>
      </div>
    </div>
  );
}

export default StudentDashboard;
