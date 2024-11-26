import React from 'react';

function Login({ setView, loggedInUser }) {
  return (
    <div className="container">
      <div className="form">
        <h2>Login</h2>
        <button onClick={() => setView('studentLogin')} className="button">Student Login</button>
        <button onClick={() => setView('adminLogin')} className="button">Admin Login</button>
        {loggedInUser === 'admin' && (
          <>
            <button onClick={() => setView('accountList')} className="button">View Accounts</button>
            <button onClick={() => setView('courseList')} className="button">View Courses</button>
          </>
        )}
        <button onClick={() => setView('homepage')} className="button">Back</button> {/* Add Back button */}
      </div>
    </div>
  );
}

export default Login;
