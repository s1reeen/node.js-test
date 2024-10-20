const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thekrutoi4el@gmail.com",
    pass: "yohbuaxveercqjea",
  },
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/send-form", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: "thekrutoi4el@gmail.com",
    subject: "New Form Submission",
    text: `You have a new submission from:
      Name: ${name}
      Email: ${email}
      Message: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Form submitted successfully");
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
