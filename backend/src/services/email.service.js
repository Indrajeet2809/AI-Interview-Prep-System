const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendWelcomeEmail = async (toEmail, name) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: "Welcome to AI Interview Prep ",
      html: `
        <h2>Hello ${name},</h2>
        <p>Welcome to AI Interview Prep System 🎯</p>
        <p>You can now practice interviews and improve your skills.</p>
        <br/>
        <p>Best of luck </p>
      `
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email error:", error);
  }
};

module.exports = { sendWelcomeEmail };