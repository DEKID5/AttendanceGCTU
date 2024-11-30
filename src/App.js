import React, { useState, useEffect, useCallback } from 'react';
import './styles.css'; // Import the CSS file
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

function App() {
  const [view, setView] = useState('homepage'); // 'homepage', 'studentLogin', 'adminLogin', 'createStudentAccount', 'createAdminAccount', 'accountList', 'courseList', 'dashboard', 'studentDashboard', 'passwordReset'
  const [loggedInUser, setLoggedInUser] = useState(null); // 'student' or 'admin'
  const [history, setHistory] = useState(['homepage']); // Store navigation history
  const [historyIndex, setHistoryIndex] = useState(0); // Track the current position in history

  const navigateTo = useCallback((page) => {
    const newHistory = [...history.slice(0, historyIndex + 1), page];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setView(page);
  }, [history, historyIndex]);

  const navigateBack = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setView(history[newIndex]);
    }
  }, [history, historyIndex]);

  const navigateForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setView(history[newIndex]);
    }
  }, [history, historyIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        navigateBack();
      } else if (e.key === 'ArrowRight') {
        navigateForward();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigateBack, navigateForward]);

  const handleLogin = (userType, studentID = null) => {
    setLoggedInUser(userType);
    if (userType === 'student') {
      localStorage.setItem('studentID', studentID); // Store student ID in local storage
      navigateTo('studentDashboard');
    } else if (userType === 'admin') {
      navigateTo('dashboard');
    }
  };

  return (
    <div>
      {view === 'homepage' && <Homepage setView={navigateTo} />}
      {view === 'login' && <Login setView={navigateTo} loggedInUser={loggedInUser} />}
      {view === 'studentLogin' && <StudentLogin onLogin={(studentID) => handleLogin('student', studentID)} onResetPassword={() => navigateTo('passwordReset')} />}
      {view === 'adminLogin' && <AdminLogin onLogin={() => handleLogin('admin')} onResetPassword={() => navigateTo('passwordReset')} />}
      {view === 'createStudentAccount' && <CreateStudentAccount />}
      {view === 'createAdminAccount' && <CreateAdminAccount />}
      {view === 'accountList' && loggedInUser === 'admin' && <AccountList />}
      {view === 'courseList' && loggedInUser === 'admin' && <CourseList />}
      {view === 'dashboard' && loggedInUser === 'admin' && <Dashboard />}
      {view === 'studentDashboard' && loggedInUser === 'student' && <StudentDashboard />}
      {view === 'passwordReset' && <PasswordReset onBack={() => navigateTo('login')} />} {/* Add PasswordReset component */}
    </div>
  );
}

export default App;
