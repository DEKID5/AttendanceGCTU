const express = require('express');
const bodyParser = require('body-parser');
// Remove firebase-admin and nodemailer imports

const app = express();
app.use(bodyParser.json());

// Replace this with your database setup
const database = {};

// Function to generate OTP
const generateOtp = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

// Send OTP endpoint
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  // Generate and save OTP in your database
  const otp = generateOtp();
  database[email] = { otp, timestamp: Date.now() };

  // Replace this with your preferred method to send OTP (e.g., an email service)
  console.log(`Send OTP ${otp} to email: ${email}`);

  res.status(200).send({ message: 'OTP sent to email' });
});

// Verify OTP endpoint
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  const record = database[email];
  if (!record) {
    return res.status(404).send({ error: 'OTP not found' });
  }

  const { otp: storedOtp, timestamp } = record;

  // Check OTP and validity (e.g., 10 minutes)
  const isValid = storedOtp === otp && Date.now() - timestamp < 10 * 60 * 1000;
  if (!isValid) {
    return res.status(400).send({ error: 'Invalid or expired OTP' });
  }

  res.status(200).send({ message: 'OTP verified' });
});

// Reset password endpoint
app.post('/reset-password', async (req, res) => {
  const { email, password } = req.body;

  // Replace this with your preferred method to update the password in your database
  database[email].password = password;

  // Remove OTP from your database
  delete database[email].otp;

  res.status(200).send({ message: 'Password updated' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
