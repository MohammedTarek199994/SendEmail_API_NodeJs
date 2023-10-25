const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
app.use(express.json()); // for parsing application/json
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors');
// Enable CORS for all routes
app.use(cors());

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use the email service you prefer (e.g., Gmail, SMTP)
  auth: {
    user: "m.naga199994@gmail.com", // Your email address
    pass: "razwejzulackrdrq", // Your email password
  },
});

function sendEmail(to, subject, text, res) {
  const mailOptions = {
    from: "m.naga199994@gmail.com", // Sender's email address
    to, // Recipient's email address
    subject, // Email subject
    text, // Email body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email error:", error);
      res.status(500).send("Email not sent: " + error.message);
    } else {
      console.log("Email sent:", info.response);
      res.send("Email sent successfully.");
    }
  });
}
app.post("/email", function (req, res) {
  console.log(req.body);
  let name = req.body.name;
  let email = req.body.email;
  let message = req.body.message;
  let content = `Name ::> ${name} \n\n Message ::> ${message}`;
  console.log(content);
  //to me ...
  sendEmail("m.naga199994@gmail.com", "Portfolio Contact Form", content, res);
  //to client ..
  content = `Your Message will be read within 24 Hours >> \n\n Name ::> ${name} \n\n Email ::> ${email} \n\n Your Message that sended ::> ${message}`;
  sendEmail(email, "Mohammed Tarek Contact Form", content, res);
  res.json({ status: "done" });
});

app.listen(3000, () => {
  console.log("Server is running on port:", 3000);
});
