import * as nodemailer from 'nodemailer';
import 'dotenv/config';

// SECRET=RAMDOM_STRING
// SMTP_HOST=floow.fun
// SMTP_PORT=25
// SMTP_USER=vinicius_silva@floow.fun
// SMTP_PASSWORD=r2ii7O5$5
// SMTP_FROM=vinicius_silva@floow.fun
// Set up the SMTP connection
const smtpHost = process.env.SMTP_HOST!;
const smtpPort = parseInt(process.env.SMTP_PORT!);
const smtpUser = process.env.SMTP_USER!;
const smtpPassword = process.env.SMTP_PASSWORD!;
const smtpFrom = process.env.SMTP_FROM!;

// Create a test email message
const mailOptions = {
  from: smtpFrom,
  to: 'recipient@example.com',
  subject: 'Test Email',
  text: 'This is a test email.',
};

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: false,
  auth: {
    user: smtpUser,
    pass: smtpPassword,
  },
  tls: {
    rejectUnauthorized: false
}
});

// Send the test email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('An error occurred while sending the test email:', error);
  } else {
    console.log('Test email sent successfully.');
    console.log('Message ID:', info.messageId);
  }
});
