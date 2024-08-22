const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'Gmail', // or another service like 'Outlook', 'Yahoo'
  auth: {
    user: process.env.EMAIL_USER, // your email address to send from
    pass: process.env.EMAIL_PASS, // your email password or app-specific password
  },
});

const sendEmail = (to, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    html: htmlContent,
  };

  console.log("Sending email to:", to); // Log the recipient email

  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error); // Log any errors
    } else {
      console.log("Email sent successfully:", info.response); // Log success message
    }
  });
};

module.exports = sendEmail;
