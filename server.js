const express = require("express");
const app = express();
const path = require("path");

app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Ismael Full Stack Website Developer</title>

<style>
body{
  margin:0;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  background:#0d0d0d;
  color:#fff;
}

header{
  padding:30px;
  text-align:center;
  background:linear-gradient(135deg,#111,#1a1a1a);
}

header h1{
  font-size:38px;
  font-weight:800;
  letter-spacing:1px;
  color:#f5c16c;
}

header p{
  font-size:16px;
  color:#ccc;
}

.gallery{
  max-width:900px;
  margin:40px auto;
}

.card{
  margin-bottom:50px;
}

.card img{
  width:100%;
  border-radius:16px;
  cursor:pointer;
  box-shadow:0 10px 30px rgba(0,0,0,0.7);
}

.card h3{
  margin-top:15px;
  font-size:22px;
  font-weight:700;
  color:#f5c16c;
}

.about{
  max-width:900px;
  margin:60px auto;
  padding:30px;
  background:#151515;
  border-radius:18px;
}

.about h2{
  color:#f5c16c;
  font-size:28px;
  margin-bottom:15px;
}

.about p{
  color:#ddd;
  line-height:1.8;
  font-size:16px;
}

.contact{
  max-width:900px;
  margin:40px auto 80px;
  padding:30px;
  background:#101010;
  border-radius:18px;
  text-align:center;
}

.contact h2{
  color:#f5c16c;
  margin-bottom:15px;
}

.contact p{
  font-size:16px;
  color:#ddd;
}

footer{
  padding:20px;
  text-align:center;
  color:#777;
  font-size:14px;
}

/* FULL IMAGE VIEW */
.viewer{
  display:none;
  position:fixed;
  top:0;left:0;
  width:100%;height:100%;
  background:rgba(0,0,0,0.95);
  justify-content:center;
  align-items:center;
  flex-direction:column;
  z-index:9999;
}

.viewer img{
  max-width:90%;
  max-height:75%;
  border-radius:12px;
}

.viewer h3{
  margin-top:20px;
  color:#f5c16c;
  text-align:center;
  max-width:80%;
}

.viewer span{
  margin-top:25px;
  padding:10px 22px;
  border:1px solid #f5c16c;
  border-radius:30px;
  cursor:pointer;
}
</style>
</head>

<body>

<header>
  <h1>Ismael Full Stack Website Developer</h1>
  <p>Modern • Secure • Income-Focused Web Solutions</p>
</header>

<section class="gallery">

  <div class="card">
    <img src="/images/pexels-kevin-ku-92347-577585.jpg"
    onclick="openView(this.src,'Clear Vision, Precision & Professional Web Development That Helps Businesses Grow')">
    <h3>Clear Vision, Precision & Professional Web Development That Helps Businesses Grow</h3>
  </div>

  <div class="card">
    <img src="/images/website-9049204_1280-1.jpg"
    onclick="openView(this.src,'Websites Designed To Increase Income, Trust & Long-Term Business Growth')">
    <h3>Websites Designed To Increase Income, Trust & Long-Term Business Growth</h3>
  </div>

  <div class="card">
    <img src="/images/pexels-fotios-photos-2363482.jpg"
    onclick="openView(this.src,'Turning Big Ideas Into Powerful Digital Systems With Clean Code')">
    <h3>Turning Big Ideas Into Powerful Digital Systems With Clean Code</h3>
  </div>

  <div class="card">
    <img src="/images/pexels-fotios-photos-16129705.jpg"
    onclick="openView(this.src,'Focused Development, Problem Solving & Reliable Software Creation')">
    <h3>Focused Development, Problem Solving & Reliable Software Creation</h3>
  </div>

  <div class="card">
    <img src="/images/pexels-negativespace-160107.jpg"
    onclick="openView(this.src,'Clean Code Structure That Delivers Performance & Stability')">
    <h3>Clean Code Structure That Delivers Performance & Stability</h3>
  </div>

  <div class="card">
    <img src="/images/pexels-thepaintedsquare-4200831.jpg"
    onclick="openView(this.src,'Online Presence That Builds Credibility & Real Opportunities')">
    <h3>Online Presence That Builds Credibility & Real Opportunities</h3>
  </div>

</section>

<section class="about">
  <h2>About Me</h2>
  <p>
    I am Ismael, a full-stack website developer specializing in modern,
    secure and professional web solutions.
    I build websites that are not only visually strong
    but also focused on performance, clarity and business growth.
  </p>
  <p>
    My experience includes developing business websites,
    portfolios, product showcases and custom systems.
    Every project is crafted with attention to detail,
    scalability and long-term reliability.
  </p>
  <p>
    I believe a powerful website builds trust,
    increases visibility and directly supports income growth.
    My mission is to help individuals and companies
    succeed in the digital world with confidence.
  </p>
</section>

<section class="contact">
  <h2>Contact</h2>
  <p>Email: Ismaelabdulhakim54@gmail.com</p>
  <p>Phone: 2519 54 53 96 19 | 2519 11 46 41 68</p>
</section>

<footer>
  © 2026 Ismael — Full Stack Website Developer
</footer>

<div class="viewer" id="viewer">
  <img id="viewImg">
  <h3 id="viewTitle"></h3>
  <span onclick="closeView()">Close</span>
</div>

<script>
function openView(src,title){
  document.getElementById("viewer").style.display="flex";
  document.getElementById("viewImg").src=src;
  document.getElementById("viewTitle").innerText=title;
}
function closeView(){
  document.getElementById("viewer").style.display="none";
}
</script>

</body>
</html>
`);
});

app.listen(3000, () => {
  console.log("Ismael Website running → http://localhost:3000");
});
