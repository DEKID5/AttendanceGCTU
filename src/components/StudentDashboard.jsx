import React, { useEffect, useState } from 'react';
import QrScanner from 'react-qr-scanner';
import { getCourses, getStudents, updateCourse } from '../firebaseService'; // Ensure this path is correct based on your project structure
import '../styles.css'; // Ensure this CSS file is correctly referenced

function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [studentID] = useState(localStorage.getItem('studentID'));
  const [studentDetails, setStudentDetails] = useState({});
  const [scanning, setScanning] = useState(false);
  const [attendanceCourse, setAttendanceCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const courseList = await getCourses();
      setCourses(courseList);

      const studentList = await getStudents();
      const student = studentList.find(stu => stu.studentID === studentID);
      setStudentDetails(student || {});
    };

    fetchData();
  }, [studentID]);

  const joinCourse = async (courseName) => {
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
    
    setCourses(updatedCourses);
    await updateCourse(courseName, updatedCourses.find(course => course.courseName === courseName));
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

  const markAttendance = async (courseName) => {
    const updatedCourses = courses.map(course => {
      if (course.courseName === courseName) {
        const student = course.students.find(student => student.studentID === studentID);
        if (student) {
          student.isPresent = true;
        }
      }
      return course;
    });

    setCourses(updatedCourses);
    await updateCourse(courseName, updatedCourses.find(course => course.courseName === courseName));
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
