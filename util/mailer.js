const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "phamdinhcang350@gmail.com",
    pass: "zcfo ustz vtmu otlb",
  },
});

const sendMail = async (data) => {
  try {
    const { email, subject, content } = data;
    const info = {
      from: '"Lavu`s shop" <phamdinhcang350@gmail.com>', // sender address
      to: email, // list of receivers
      subject:subject, // Subject line
      html: content,
      // html: "<b>Hello world?</b>", // html body
    };
    const result = await transporter.sendMail(info);
    console.log("Email sent: ", result.response);
  } catch (error) {
    console.log("Send email: ", error.message);
  }
};

module.exports = { sendMail };
