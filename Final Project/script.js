const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");
const audioButton = document.getElementById("playButton");
const audio = new Audio("assets/Final Song.mp3");

canvas.width = 800;
canvas.height = 600;

let avatar = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 30,
  color: "rgba(34, 150, 243, 0.8)",
  score: 0,
};

const images = [];
const triangles = [];

for (let i = 0; i < 10; i++) generateNewSquare();

function generateNewSquare() {
  images.push({
    x: Math.random() * (canvas.width - 50),
    y: Math.random() * (canvas.height - 50),
    size: 50,
    color: `hsl(${Math.random() * 360}, 60%, 50%)`,
  });
}

function generateNewTriangle() {
  triangles.push({
    x: Math.random() * (canvas.width - 50),
    y: Math.random() * (canvas.height - 50),
    size: 40,
    color: "red",
  });
}

function drawAvatar() {
  ctx.beginPath();
  ctx.arc(avatar.x, avatar.y, avatar.size, 0, Math.PI * 2);
  ctx.fillStyle = avatar.color;
  ctx.fill();
  ctx.closePath();
  
  ctx.font = "16px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(avatar.score, avatar.x, avatar.y);
}

function drawImages() {
  images.forEach((img) => {
    ctx.beginPath();
    ctx.rect(img.x, img.y, img.size, img.size);
    ctx.fillStyle = img.color;
    ctx.fill();
    ctx.closePath();
  });
}

function drawTriangles() {
  triangles.forEach((tri) => {
    ctx.beginPath();
    ctx.moveTo(tri.x, tri.y);
    ctx.lineTo(tri.x + tri.size, tri.y + tri.size / 2);
    ctx.lineTo(tri.x, tri.y + tri.size);
    ctx.closePath();
    ctx.fillStyle = tri.color;
    ctx.fill();
  });
}

function detectTriangleCollisions() {
  triangles.forEach((tri, index) => {
    const dx = tri.x + tri.size / 2 - avatar.x;
    const dy = tri.y + tri.size / 2 - avatar.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < avatar.size + tri.size / 2) {
      avatar.score = 0;
      triangles.splice(index, 1);
    }
  });
}

function detectAndHandleCollisions() {
  images.forEach((img, index) => {
    const dx = img.x + img.size / 2 - avatar.x;
    const dy = img.y + img.size / 2 - avatar.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < avatar.size + img.size / 2) {
      images.splice(index, 1);
      generateNewSquare();
      avatar.score++;

      if (avatar.score % 10 === 0) generateNewTriangle();
      if (avatar.score % 10 === 0) avatar.color = `hsl(${Math.random() * 360}, 70%, 50%)`;

      if (avatar.score >= 100) startWordsAnimation();
    }
  });

  detectTriangleCollisions();
}

canvas.addEventListener("mousemove", (event) => {
  const rect = canvas.getBoundingClientRect();
  avatar.x = Math.max(avatar.size, Math.min(canvas.width - avatar.size, event.clientX - rect.left));
  avatar.y = Math.max(avatar.size, Math.min(canvas.height - avatar.size, event.clientY - rect.top));
});

canvas.style.cursor = "none";
audioButton.addEventListener("click", () => audio.play());

const words = ["You're amazing!", "Spectacular!", "Unstoppable!", "Awesome!", "Fantastic!"];
const wordObjects = [];

function startWordsAnimation() {
  if (wordObjects.length === 0) {
    words.forEach((word) => {
      wordObjects.push({
        text: word,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * 1.2,
        dy: (Math.random() - 0.5) * 1.2,
        color: `hsl(${Math.random() * 360}, 80%, 50%)`,
      });
    });
  }
}

function animateWords() {
  wordObjects.forEach((word) => {
    word.x += word.dx;
    word.y += word.dy;

    if (word.x <= 0 || word.x + 200 >= canvas.width) word.dx *= -1;
    if (word.y <= 0 || word.y + 40 >= canvas.height) word.dy *= -1;

    ctx.font = "bold 32px Arial";
    ctx.fillStyle = word.color;
    ctx.fillText(word.text, word.x, word.y);
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawImages();
  drawAvatar();
  drawTriangles();
  detectAndHandleCollisions();
  
  if (avatar.score >= 100) animateWords();

  requestAnimationFrame(animate);
}

animate();
