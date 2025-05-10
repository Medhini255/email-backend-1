const express = require("express");
const sgMail = require("@sendgrid/mail");
const cors = require("cors");
require("dotenv").config(); // Loads environment variables from .env


const app = express();
app.use(cors());
app.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
 // loaded from Render env

app.post("/sendEmail", async (req, res) => {
  const { name, email, to, message } = req.body;

  const msg = {
    to: to,
    from: "medhini2004m@gmail.com", // must be verified in SendGrid
    subject: `New Message from ${name}`,
    text: `Email: ${email}\nMessage: ${message}`,
    replyTo: email
  };

  try {
    await sgMail.send(msg);
    res.status(200).send("Email sent");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error sending email");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
