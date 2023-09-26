const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: "tdemo651@gmail.com",
        pass: "tedihyjmypzstvwq"
    },
    port: 465,
    host: 'smtp.gmail.com'
});

function sendEmail(userEmail, message ,subject) {
  const mailOptions = {
    from: 'your_email@example.com',
    to: userEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

module.exports=sendEmail;