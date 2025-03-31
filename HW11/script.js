const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// music
const music = document.getElementById("backgroundMusic");
music.volume = 0.3;

// GAMEObject class
class GameObject {
    constructor(x, y, width, height, color, type = "rectangle") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
        this.speedX = 0;
        this.speedY = 0;
    }

    draw() {
        ctx.fillStyle = this.color;

        if (this.type === "circle") {
            ctx.beginPath();
            ctx.arc(
                this.x + this.width / 2, 
                this.y + this.height / 2,
                this.width / 2, 
                0,
                Math.PI * 2 
            );
            ctx.fill();
        } else {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0) this.x = 0;
        if (this.y < 0) this.y = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
        if (this.y + this.height > canvas.height) this.y = canvas.height - this.height;
    }
}

// Player and enemy
const player = new GameObject(50, 50, 50, 50, "blue", "circle");
const enemy = new GameObject(200, 200, 40, 40, "green"); 
const secondEnemy = new GameObject(400, 300, 80, 80, "purple");
const thirdEnemy = new GameObject(300, 150, 80, 80, "red");

// good enemy 1 movement
setInterval(() => {
    enemy.speedX = Math.random() * 4 - 2;
    enemy.speedY = Math.random() * 4 - 2;
}, 1000);

// bad enemy 2 movement
setInterval(() => {
    secondEnemy.speedX = Math.random() * 6 - 3;
    secondEnemy.speedY = Math.random() * 6 - 3;
}, 1000);

// bad  enemy 3 movement
setInterval(() => {
    thirdEnemy.speedX = Math.random() * 6 - 3;
    thirdEnemy.speedY = Math.random() * 6 - 3;
}, 1000);

function checkCollision(obj1, obj2) {
    return (
        obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y
    );
}

function handleCollisions() {
    if (checkCollision(player, enemy)) {
        canvas.style.backgroundColor = "#FFD700";

        const maxSize = 150; 
        if (player.width < maxSize && player.height < maxSize) {
            player.width += 10;
            player.height += 10;
        }
    } else {
        canvas.style.backgroundColor = "#87CEEB"; 
    }

    if (checkCollision(player, secondEnemy)) {
        canvas.style.backgroundColor = "#8A2BE2"; 
        player.width = Math.max(10, player.width - 15); 
        player.height = Math.max(10, player.height - 15);
    }

    if (checkCollision(player, thirdEnemy)) {
        canvas.style.backgroundColor = "#d30000";
        player.width = Math.max(10, player.width - 10);
        player.height = Math.max(10, player.height - 10);
    }
}

canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    player.x = mouseX - player.width / 2;
    player.y = mouseY - player.height / 2; 

    // out of bounds 
    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
});

canvas.addEventListener("mouseenter", () => {
    canvas.style.cursor = "none";
});

canvas.addEventListener("mouseleave", () => {
    canvas.style.cursor = "default"; 
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.move();
    enemy.move();
    secondEnemy.move();
    thirdEnemy.move();
    handleCollisions();
    player.draw();
    enemy.draw();
    secondEnemy.draw();
    thirdEnemy.draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
