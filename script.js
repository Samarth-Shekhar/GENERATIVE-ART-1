const canvas = document.getElementById('artCanvas');
const ctx = canvas.getContext('2d');
const circles = [];
const numCircles = 100;

class Circle {
    constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

for (let i = 0; i < numCircles; i++) {
    const radius = getRandomInt(10, 30);
    const x = getRandomInt(radius, canvas.width - radius);
    const y = getRandomInt(radius, canvas.height - radius);
    const dx = getRandomInt(-2, 2);
    const dy = getRandomInt(-2, 2);
    const color = getRandomColor();
    circles.push(new Circle(x, y, dx, dy, radius, color));
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(circle => circle.update());
    requestAnimationFrame(animate);
}

animate();
