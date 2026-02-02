const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// read form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve static files
app.use(express.static(__dirname));

// pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

// FORM HANDLER
app.post('/contact', (req, res) => {
  console.log('NEW MESSAGE 🔥');
  console.log(req.body);

  res.redirect('/thank-you.html');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
