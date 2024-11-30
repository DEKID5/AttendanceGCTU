import React from 'react';

function Login({ setView, loggedInUser }) {
  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => setView('studentLogin')}>Student Login</button>
      <button onClick={() => setView('adminLogin')}>Admin Login</button>
      {loggedInUser === 'admin' && (
        <>
          <button onClick={() => setView('accountList')}>View Accounts</button>
          <button onClick={() => setView('courseList')}>View Courses</button>
        </>
      )}
      <button onClick={() => setView('homepage')}>Back</button> {/* Add Back button */}
    </div>
  );
}

export default Login;
