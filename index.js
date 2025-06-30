const express = require("express");
const sgMail = require("@sendgrid/mail");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/sendEmail", async (req, res) => {
  const { to, subject, message } = req.body;

  const msg = {
    to,
    from: "medhini2004m@gmail.com", // verified sender
    subject,
    text: message,
    html: `<p>${message}</p>` // optional HTML content
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
  console.log("Email API running on port 3000");
});
