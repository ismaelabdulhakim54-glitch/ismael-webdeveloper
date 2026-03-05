// ==============================
// TEMPLE RUN - WORKING VERSION
// ==============================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// FULL SCREEN
function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// GAME STATE
let score = 0;
let speed = 4;
let isNight = false;

// LANES
function getLanes(){
  return [
    canvas.width/2 - 90,
    canvas.width/2,
    canvas.width/2 + 90
  ];
}
let lanes = getLanes();
window.addEventListener("resize", ()=> lanes = getLanes());

// PLAYER
let player = {
  lane: 1,
  x: lanes[1] - 25,
  y: canvas.height - 150,
  w: 50,
  h: 80,
  frame: 0
};

// OBJECTS
let coins = [];
let obstacles = [];
let clouds = [
  {x:100,y:80},
  {x:400,y:120}
];

// SPAWN
setInterval(()=> {
  coins.push({
    lane: Math.floor(Math.random()*3),
    y: -40
  });
}, 1500);

setInterval(()=> {
  obstacles.push({
    side: Math.random() < 0.5 ? "left" : "right",
    y: -120,
    type: Math.random() < 0.5 ? "tree" : "house"
  });
}, 2000);

// INPUT
document.addEventListener("keydown", e=>{
  if(e.key === "ArrowLeft" && player.lane > 0){
    player.lane--;
  }
  if(e.key === "ArrowRight" && player.lane < 2){
    player.lane++;
  }
  if(e.key === "n" || e.key === "N"){
    isNight = !isNight;
  }
  player.x = lanes[player.lane] - 25;
});

// DRAW SKY
function drawSky(){
  ctx.fillStyle = isNight ? "#001" : "#5ecbff";
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

// DRAW ROAD
function drawRoad(){
  ctx.fillStyle = "#333";
  ctx.beginPath();
  ctx.moveTo(canvas.width/2 - 120, 0);
  ctx.lineTo(canvas.width/2 + 120, 0);
  ctx.lineTo(canvas.width/2 + 280, canvas.height);
  ctx.lineTo(canvas.width/2 - 280, canvas.height);
  ctx.closePath();
  ctx.fill();
}

// CLOUDS
function drawClouds(){
  ctx.fillStyle="white";
  clouds.forEach(c=>{
    ctx.beginPath();
    ctx.arc(c.x,c.y,25,0,Math.PI*2);
    ctx.fill();
    c.x += 0.4;
    if(c.x > canvas.width) c.x = -50;
  });
}

// PLAYER
function drawPlayer(){
  ctx.fillStyle = "orange";
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

// COLLISION
function hit(a,b){
  return a.x < b.x+30 && a.x+player.w > b.x &&
         a.y < b.y+30 && a.y+player.h > b.y;
}

// GAME LOOP
function update(){
  drawSky();
  drawClouds();
  drawRoad();

  // COINS
  coins.forEach((c,i)=>{
    c.y += speed;
    let cx = lanes[c.lane]-15;
    ctx.fillStyle="gold";
    ctx.beginPath();
    ctx.arc(cx,c.y,10,0,Math.PI*2);
    ctx.fill();

    if(hit(player,{x:cx,y:c.y})){
      score+=10;
      coins.splice(i,1);
    }
    if(c.y > canvas.height) coins.splice(i,1);
  });

  // OBSTACLES
  obstacles.forEach((o,i)=>{
    o.y += speed;
    let ox = o.side==="left" ? 80 : canvas.width-140;
    ctx.fillStyle = o.type==="tree" ? "green" : "brown";
    ctx.fillRect(ox,o.y,60,90);

    if(hit(player,{x:ox,y:o.y})){
      alert("Game Over! Score: "+score);
      location.reload();
    }
  });

  drawPlayer();
  speed += 0.0008; // gradual speed increase
  requestAnimationFrame(update);
}

update();
