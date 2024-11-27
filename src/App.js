import React, { useState } from 'react';
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

function App() {
  const [view, setView] = useState('homepage');
  const [previousView, setPreviousView] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleNavigate = (newView) => {
    setPreviousView(view);
    setView(newView);
  };

  const handleLogin = (userType, id = null) => {
    setLoggedInUser(userType);
    if (userType === 'student') {
      localStorage.setItem('studentID', id);
      handleNavigate('studentDashboard');
    } else if (userType === 'admin') {
      localStorage.setItem('staffID', id);
      handleNavigate('dashboard');
    }
  };

  const currentView = () => {
    switch(view) {
      case 'homepage':
        return <Homepage setView={handleNavigate} />;
      case 'login':
        return <Login setView={handleNavigate} loggedInUser={loggedInUser} />;
      case 'studentLogin':
        return <StudentLogin onLogin={(studentID) => handleLogin('student', studentID)} onResetPassword={() => handleNavigate('passwordReset')} navigateTo={handleNavigate} />;
      case 'adminLogin':
        return <AdminLogin onLogin={(staffID) => handleLogin('admin', staffID)} onResetPassword={() => handleNavigate('passwordReset')} navigateTo={handleNavigate} />;
      case 'createStudentAccount':
        return <CreateStudentAccount navigateTo={handleNavigate} />;
      case 'createAdminAccount':
        return <CreateAdminAccount navigateTo={handleNavigate} />;
      case 'accountList':
        return loggedInUser === 'admin' ? <AccountList navigateTo={handleNavigate} /> : <Homepage setView={handleNavigate} />;
      case 'courseList':
        return loggedInUser === 'admin' ? <CourseList navigateTo={handleNavigate} /> : <Homepage setView={handleNavigate} />;
      case 'dashboard':
        return loggedInUser === 'admin' ? <Dashboard navigateTo={handleNavigate} /> : <Homepage setView={handleNavigate} />;
      case 'studentDashboard':
        return loggedInUser === 'student' ? <StudentDashboard /> : <Homepage setView={handleNavigate} />;
      case 'passwordReset':
        return <PasswordReset onBack={() => handleNavigate('login')} />;
      default:
        return <Homepage setView={handleNavigate} />;
    }
  };

  return (
    <div className="app">
      <TransitionGroup>
        <CSSTransition
          key={view}
          timeout={300}
          classNames="slide"
        >
          <div>
            {currentView()}
            {previousView && (
              <button className="button" onClick={() => handleNavigate(previousView)}>Previous</button>
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
