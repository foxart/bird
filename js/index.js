let canvas;
let context;
window.addEventListener('load', function() {
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	document.addEventListener('keydown', function() {
		birdY -= birdSwing
	});
	document.getElementById('start').addEventListener('click', function() {
		start();
		document.getElementById('start').remove();
	})
});

function init() {
	const birdSize = 25;
	let birdX = 75;
	let birdY = canvas.height / 2 - birdSize / 2;
	let birdSwing = 30;
	let birdGravity = 1;
	let obstacleX = canvas.width;
	let obstacleY = 0;
	let obstacleSpeed = 4;
	let obstacleWidth = 50;
	let obstacleHeight = canvas.height / 2;
	let obstacleGap = Math.round((Math.random() * obstacleHeight));
	const obstacles = [{
		x: canvas.width,
		y: 0,
	}];
}

function birdFlyUp() {
}

function drawBird(x, y) {
	context.beginPath();
	context.arc(x, y, birdSize, 0, 2 * Math.PI);
	context.stroke();
}

function drawObstacleTop(x, y) {
	console.log(obstacleGap);
	context.fillRect(x, y, obstacleWidth, obstacleHeight);
	if (x < 0) {
		obstacles.shift();
		obstacleGap = Math.round((Math.random() * obstacleHeight / 2));
		obstacles.push({
			x: canvas.width,
			y: 0
		})
	}
}

function drawObstable() {
	for (let i = 0; i < obstacles.length; i++) {
		obstacles[i].x -= obstacleSpeed;
		drawObstacleTop(obstacles[i].x, obstacles[i].y);

	}
}

function start() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawBird(birdX, birdY);
	drawObstable();
	birdY += birdGravity;
	if (birdY > canvas.height) {
		birdX = 75;
		birdY = 75;
		// location.reload();
		console.log('the end', birdY, canvas.height);
	}
	requestAnimationFrame(start);
}


