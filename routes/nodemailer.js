var express = require("express");
var router = express.Router();
const axios = require("axios");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Define middleware to rate limit email sending
const emailRateLimit = (req, res, next) => {
  const now = Date.now();
  const interval = 60 * 1000; // 1 minute

  if (!req.emailLastSent || now - req.emailLastSent >= interval) {
    req.emailLastSent = now;
    next(); // Allow sending the email
  } else {
    res
      .status(429)
      .send("Too many requests. Please wait before sending another email.");
  }
};

// Route to handle form submission
router.post("/send-email", emailRateLimit, async (req, res) => {
  try {
     const {recaptchaResponse} = req.body

    const secretKey = "6Lf0Yi4pAAAAAED5O3Ii9UP-Zw1LKuCwkYVqAnc8"; // Replace with your secret key obtained from reCAPTCHA admin console

    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;
   
    const googleResponse = await axios.post(verificationURL);
    const { success } = googleResponse.data;

   if(success){
    const { firstName, lastName, email, phone, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Use your email service provider
      secure: true,
      auth: {
        user: "elevatorplusapp@gmail.com", // Replace with your email
        pass: "rzujwwmjxicyucqu" // Replace with your password
      }
    });

    // Email data
    const mailOptions = {
      from: "elevatorplusapp@gmail.com",
      to: "elevatorplusapp@gmail.com", // Replace with recipient email
      subject: "ElevatorPlus Contact Form Submission",
      html: `
            <h2>ElevatorPlus Contact Us Form Submission By ${firstName +
              " " +
              lastName}</h2>
            <p><strong>Name:</strong> ${firstName + " " + lastName}</p>
             <p><strong> Email:</strong> ${email}</p>
             <p><strong> Phone Numbar:</strong> ${phone} </p>
             <p><strong> Message::</strong> ${message} </p>
            `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    // Send a response to the client
    res.status(200).json({
      data: info.response,
      message: "Email sent successfully",
      status: true
    });
   }else{
    console.error("Error sending email:", error);
    // Send an error response to the client
    res.status(500).json({
      message: "Error sending email",
      status: false
    });
   }

  } catch (error) {
    console.error("Error sending email:", error);
    // Send an error response to the client
    res.status(500).json({
      message: "Error sending email",
      status: false
    });
  }
});

module.exports = router;
