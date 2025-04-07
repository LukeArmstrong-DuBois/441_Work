const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// player 
class Player {
  constructor() {
    this.x = 10;
    this.y = 10;
    this.size = 20;
    this.dx = 0;
    this.dy = 0;
  }

  draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    // boundary 
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
    if (this.x + this.size > canvas.width) this.x = canvas.width - this.size;
    if (this.y + this.size > canvas.height) this.y = canvas.height - this.size;
  }
}

// interactables
class Interactable {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let interactables = [];
let score = 0;

function generateRandomInteractable() {
  const x = Math.floor(Math.random() * (canvas.width - 20));
  const y = Math.floor(Math.random() * (canvas.height - 20));
  return new Interactable(x, y, 20, 20);
}

while (interactables.length < 3) {
  interactables.push(generateRandomInteractable());
}

// interactables track player
function moveInteractablesToPlayer(interactable) {
  const speed = 3.1;

  const dx = player.x + player.size / 2 - (interactable.x + interactable.width / 2);
  const dy = player.y + player.size / 2 - (interactable.y + interactable.height / 2);
  const magnitude = Math.sqrt(dx * dx + dy * dy);

  if (magnitude > 0) {
    interactable.x += (dx / magnitude) * speed;
    interactable.y += (dy / magnitude) * speed;
  }

  if (interactable.x < 0) interactable.x = 0;
  if (interactable.y < 0) interactable.y = 0;
  if (interactable.x + interactable.width > canvas.width) interactable.x = canvas.width - interactable.width;
  if (interactable.y + interactable.height > canvas.height) interactable.y = canvas.height - interactable.height;
}

const player = new Player();

// player movemnt 
function handleKeyDown(e) {
  switch (e.key) {
    case "ArrowUp":
      player.dy = -3;
      break;
    case "ArrowDown":
      player.dy = 3;
      break;
    case "ArrowLeft":
      player.dx = -3;
      break;
    case "ArrowRight":
      player.dx = 3;
      break;
  }
}

function handleKeyUp(e) {
  if (["ArrowUp", "ArrowDown"].includes(e.key)) player.dy = 0;
  if (["ArrowLeft", "ArrowRight"].includes(e.key)) player.dx = 0;
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

function checkCollision(obj) {
  return (
    player.x < obj.x + obj.width &&
    player.x + player.size > obj.x &&
    player.y < obj.y + obj.height &&
    player.y + player.size > obj.y
  );
}
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  interactables = interactables.filter((item) => {
    if (checkCollision(item)) {
      score++;
      document.getElementById("score").textContent = `score: ${score}`;
      interactables.push(generateRandomInteractable());
      return false;
    }
    moveInteractablesToPlayer(item);
    item.draw();
    return true;
  });

  while (interactables.length < 750) {
    interactables.push(generateRandomInteractable());
  }

  player.move();
  player.draw();

  requestAnimationFrame(gameLoop);
}

document.getElementById("restart").addEventListener("click", () => {
  score = 0;
  document.getElementById("score").textContent = `score: ${score}`;
  interactables = [];
  while (interactables.length < 3) {
    interactables.push(generateRandomInteractable());
  }
});

gameLoop();
