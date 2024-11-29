import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './styles.css';
import Login from './components/Login';
import StudentLogin from './components/StudentLogin';
import AdminLogin from './components/AdminLogin';
import CreateStudentAccount from './components/CreateStudentAccount';
import CreateAdminAccount from './components/CreateAdminAccount';
import AccountList from './components/AccountList';
import CourseList from './components/CourseList';
import Dashboard from './components/Dashboard';
import Homepage from './components/Homepage';
import StudentDashboard from './components/StudentDashboard';
import PasswordReset from './components/PasswordReset';
import { getCourses, addCourse as addCourseToDB } from './firebaseService';

function AppContent() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const courseList = await getCourses();
      setCourses(courseList);
    };

    fetchCourses();
  }, []);

  const handleLogin = (userType, id = null) => {
    setLoggedInUser(userType);
    if (userType === 'student') {
      localStorage.setItem('studentID', id);
      navigate('/studentDashboard');
    } else if (userType === 'admin') {
      localStorage.setItem('staffID', id);
      navigate('/dashboard');
    }
  };

  const addCourse = async (newCourse) => {
    await addCourseToDB(newCourse);
    setCourses([...courses, newCourse]);
  };

  return (
    <TransitionGroup>
      <CSSTransition timeout={500} classNames="slide">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/studentLogin" element={<StudentLogin onLogin={(studentID) => handleLogin('student', studentID)} />} />
          <Route path="/adminLogin" element={<AdminLogin onLogin={(staffID) => handleLogin('admin', staffID)} />} />
          <Route path="/createStudentAccount" element={<CreateStudentAccount />} />
          <Route path="/createAdminAccount" element={<CreateAdminAccount />} />
          <Route path="/accountList" element={loggedInUser === 'admin' ? <AccountList /> : <Homepage />} />
          <Route path="/courseList" element={loggedInUser === 'admin' ? <CourseList courses={courses} /> : <Homepage />} />
          <Route path="/dashboard" element={loggedInUser === 'admin' ? <Dashboard courses={courses} addCourse={addCourse} /> : <Homepage />} />
          <Route path="/studentDashboard" element={loggedInUser === 'student' ? <StudentDashboard courses={courses} /> : <Homepage />} />
          <Route path="/passwordReset" element={<PasswordReset />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
