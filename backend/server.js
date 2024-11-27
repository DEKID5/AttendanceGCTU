const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const app = express();

// Middleware
app.use(express.json());

// In-memory storage for OTPs (for demonstration purposes)
const otpStorage = {};

// Generate OTP
app.post('/generate-otp', (req, res) => {
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999).toString();
  otpStorage[email] = otp;

  // Send OTP via email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password', // Use an App Password if you're using Gmail with 2-step verification
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error); // Log the specific error
      return res.status(500).send('Error sending email');
    }
    res.status(200).send('OTP sent');
  });
});

// Verify OTP and reset password
app.post('/reset-password', (req, res) => {
  const { email, otp, newPassword, confirmPassword } = req.body;

  if (otpStorage[email] !== otp) {
    return res.status(400).send('Invalid OTP');
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  // Reset the password in your database (for demonstration, not implemented)
  // db.updatePassword(email, newPassword);

  res.status(200).send('Password reset successful');
});

app.listen(30001, () => {
  console.log('Server running on port 3001');
});
