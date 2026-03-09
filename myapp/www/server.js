const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 10000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Nodemailer transporter (Gmail App Password)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes for pages
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.get("/about", (req, res) =>
  res.sendFile(path.join(__dirname, "about.html"))
);

app.get("/contact", (req, res) =>
  res.sendFile(path.join(__dirname, "contact.html"))
);

app.get("/thank-you.html", (req, res) =>
  res.sendFile(path.join(__dirname, "thank-you.html"))
);

// AI chat page
app.get("/chat", (req, res) =>
  res.sendFile(path.join(__dirname, "chat.html"))
);

// Contact form POST
app.post("/contact", async (req, res) => {
  const { name, contact, message } = req.body;

  if (!name || !contact || !message) {
    return res.status(400).send("All fields required");
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "📩 New Contact Form Message",
    text: `Name: ${name}\nContact: ${contact}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent ✅");
    res.redirect("/thank-you.html");
  } catch (error) {
    console.error("Email failed ❌", error);
    res.status(500).send("Email failed");
  }
});

// ---- AI Endpoint ----
// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
