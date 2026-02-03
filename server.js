const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

app.get("/thank-you.html", (req, res) => {
  res.sendFile(path.join(__dirname, "thank-you.html"));
});

// 📩 CONTACT FORM EMAIL
app.post("/contact", async (req, res) => {
  const { name, contact, message } = req.body;

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Ismaelabdulhakim54@gmail.com", // your Gmail
      pass: "ruub hzgd owri iorf"  // the 16-character app password
    }
  });

  const mailOptions = {
    from: `"Website Contact" <Ismaelabdulhakim54@gmail.com>`,
    to: "Ismaelabdulhakim54@gmail.com", // receive messages in the same email
    subject: "📩 New Website Message",
    text: `
Name: ${name}
Contact: ${contact}

Message:
${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.redirect("/thank-you.html"); // redirect to thank you page
  } catch (error) {
    console.error(error);
    res.send("❌ Error sending email");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
