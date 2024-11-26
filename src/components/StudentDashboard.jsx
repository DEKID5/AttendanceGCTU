import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [studentID] = useState(localStorage.getItem('studentID'));
  const [scanning, setScanning] = useState(false);
  const [attendanceCourse, setAttendanceCourse] = useState(null);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(storedCourses);
  }, []);

  const joinCourse = (courseName) => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    const updatedCourses = storedCourses.map(course => {
      if (course.courseName === courseName) {
        course.students.push({ studentID });
      }
      return course;
    });
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
  };

  const handleScan = (data) => {
    if (data) {
      markAttendance(attendanceCourse, data);
      setScanning(false);
      setAttendanceCourse(null);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setScanning(false);
    setAttendanceCourse(null);
  };

  const markAttendance = (courseName, data) => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    const updatedCourses = storedCourses.map(course => {
      if (course.courseName === courseName) {
        const student = course.students.find(student => student.studentID === studentID);
        if (student) {
          student.attendance = (student.attendance || 0) + 1;
        }
      }
      return course;
    });
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Student Dashboard</h2>
        <h3>Available Courses</h3>
        {courses.map((course, index) => (
          <div key={index} className="course-card">
            <h4>{course.courseName}</h4>
            <button onClick={() => joinCourse(course.courseName)} className="button">Join Course</button>
            <button onClick={() => { setScanning(true); setAttendanceCourse(course.courseName); }} className="button">Mark Attendance</button>
          </div>
        ))}

        {scanning && (
          <div className="qr-scanner">
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%' }}
            />
            <button onClick={() => setScanning(false)} className="button">Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
