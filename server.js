require("dotenv").config({ path: "userpw.env" });

console.log("Email:", process.env.EMAIL_USER);
console.log("Password:", process.env.EMAIL_PASS ? "Tersedia" : "Tidak ada");
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,  // Email kamu
            pass: process.env.EMAIL_PASS,  // Password atau App Password
        },
    });

    let mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Pesan dari ${name}`,
        text: `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: "Email berhasil dikirim!" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Gagal mengirim email." });
    }
});

app.listen(5000, () => {
    console.log("Server berjalan di http://localhost:5000");
});