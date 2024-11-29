import React, { useState } from 'react';
import { sendOtp, verifyOtp, resetPassword } from './AuthService';
import '../styles.css';  // Ensure this path is correct

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);

  const handleSendOtp = async () => {
    try {
      await sendOtp(email);
      setStep(2);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await verifyOtp(email, otp);
      setStep(3);
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword(email, password);
      alert('Password updated successfully');
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="container">
      <div className="form password-reset">
        {step === 1 && (
          <div>
            <h3>Enter your email to receive an OTP</h3>
            <input
              className="input-field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <button className="button" onClick={handleSendOtp}>Send OTP</button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h3>Enter the OTP sent to your email</h3>
            <input
              className="input-field"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              required
            />
            <button className="button" onClick={handleVerifyOtp}>Verify OTP</button>
          </div>
        )}
        {step === 3 && (
          <div>
            <h3>Enter your new password</h3>
            <input
              className="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              required
            />
            <button className="button" onClick={handleResetPassword}>Reset Password</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PasswordReset;
