const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (HTML, CSS, images)
app.use(express.static(__dirname));

// Pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

// CONTACT FORM
app.post("/contact", async (req, res) => {
  const { name, contact, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "📩 New Website Message",
      text: `
Name: ${name}
Contact: ${contact}

Message:
${message}
      `
    });

    // SUCCESS → redirect
    res.redirect("/thank-you.html");

  } catch (error) {
    console.error("EMAIL ERROR:", error);
    res.status(500).send("❌ Failed to send message");
  }
});

// START SERVER (RENDER NEEDS THIS)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
