import React, { useEffect, useState } from 'react';
import QrScanner from 'react-qr-scanner';
import '../styles.css'; // Ensure this CSS file is correctly referenced

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [studentID] = useState(localStorage.getItem('studentID'));
  const [studentDetails, setStudentDetails] = useState({});
  const [scanning, setScanning] = useState(false);
  const [attendanceCourse, setAttendanceCourse] = useState(null);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(storedCourses);

    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students.find(stu => stu.studentID === studentID);
    setStudentDetails(student || {});
  }, [studentID]);

  const joinCourse = (courseName) => {
    const updatedCourses = courses.map(course => {
      if (course.courseName === courseName) {
        if (!course.students) {
          course.students = [];
        }
        if (!course.students.find(student => student.studentID === studentID)) {
          course.students.push(studentDetails);
        }
      }
      return course;
    });
    localStorage.setItem('courses', JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
  };

  const handleScan = (data) => {
    if (data) {
      const storedQrCode = localStorage.getItem(`qrCode-${attendanceCourse}`);
      if (data === storedQrCode) {
        markAttendance(attendanceCourse);
        setScanning(false);
        setAttendanceCourse(null);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setScanning(false);
    setAttendanceCourse(null);
  };

  const markAttendance = (courseName) => {
    const updatedCourses = courses.map(course => {
      if (course.courseName === courseName) {
        const student = course.students.find(student => student.studentID === studentID);
        if (student) {
          student.isPresent = true;
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
        <div className="grid-container">
          {courses
            .filter(course => course.level === studentDetails.level)
            .map((course, index) => (
              <div key={index} className={`course-card ${course.students.some(student => student.studentID === studentID) ? 'joined' : ''}`}>
                <h4>{course.courseName}</h4>
                {course.students.some(student => student.studentID === studentID) ? (
                  <button className="button" onClick={() => { setScanning(true); setAttendanceCourse(course.courseName); }}>Mark Attendance</button>
                ) : (
                  <button className="button" onClick={() => joinCourse(course.courseName)}>Join Course</button>
                )}
              </div>
            ))}
        </div>

        {scanning && (
          <div className="qr-scanner">
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '100%' }}
            />
            <button className="button" onClick={() => setScanning(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
