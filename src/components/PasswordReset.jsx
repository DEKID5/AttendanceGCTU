import React, { useState } from 'react';

function PasswordReset({ onBack }) {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    if (email) {
      alert(`Password reset link sent to ${email}.`);
      onBack();
    } else {
      alert('Please enter your email.');
    }
  };

  return (
    <div>
      <h2>Password Reset</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <button onClick={handleReset}>Send Reset Link</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default PasswordReset;
