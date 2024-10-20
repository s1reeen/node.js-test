const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express(); // Инициализация переменной app

// Добавление парсера для POST-запросов
app.use(bodyParser.urlencoded({ extended: true }));

// Настройка Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thekrutoi4el@gmail.com",
    pass: "yohbuaxveercqjea",
  },
});

// Маршрут для главной страницы
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Маршрут для обработки формы
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

// Запуск сервера
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
