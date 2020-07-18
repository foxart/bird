let canvas;
let context;
let bird;
let obstacle;
let obstacles = [];
window.addEventListener('load', function() {
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	console.log(canvas.height, canvas.width);
	bird = birdInit(canvas);
	obstacle = obstacleInit(canvas);
	obstacles.push(obstacle);
	console.log(obstacle);
	document.addEventListener('keydown', function() {
		birdFlyUp(bird);
	});
	document.getElementById('start').addEventListener('click', function() {
		document.getElementById('start').remove();
		loop();
	});
});

function birdInit(canvas) {
	const width = 25;
	return {
		size: width,
		x: canvas.width / 7,
		y: canvas.height / 2 - width / 2,
		swing: 25,
		gravity: 1,
	};
}

function birdFlyUp(bird) {
	bird.y -= bird.swing;
}

function birdFlyDown(bird) {
	bird.y += bird.gravity;
}

function drawBird(bird) {
	context.beginPath();
	context.arc(bird.x, bird.y, bird.size, 0, 2 * Math.PI);
	context.stroke();
}

function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}

function obstacleInit(canvas) {
	const gap = randomInt(canvas.height / 5, canvas.height - canvas.height / 5);
	const height = 75;
	const width = 50;
	return {
		x: canvas.width,
		width: width,
		topY: 1,
		topHeight: canvas.height - gap - height,
		bottomY: canvas.height - gap + height,
		bottomHeight: canvas.height - (canvas.height - gap + height) - 1,
		speed: 2,
	};
}

function drawObstable(obstacle) {
	context.fillStyle = 'blue';
	context.fillRect(obstacle.x, obstacle.topY, obstacle.width, obstacle.topHeight);
	context.fillStyle = 'brown';
	context.fillRect(obstacle.x, obstacle.bottomY, obstacle.width, obstacle.bottomHeight);
}

function loop() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawBird(bird);
	birdFlyDown(bird);
	/**/
	for (let i = 0; i < obstacles.length; i++) {
		let obstacle = obstacles[i];
		drawObstable(obstacle);
		obstacle.x -= obstacle.speed;
	}
	const firstObstacle = obstacles[0];
	if (firstObstacle.x + firstObstacle.width < 0) {
		obstacles.shift();
	}
	const lastObstacle = obstacles[obstacles.length - 1];
	if (lastObstacle.x + lastObstacle.width / 2 < canvas.width / 3) {
		obstacles.push(obstacleInit(canvas));
	}
	// console.log(obstacles.length);
	// if (birdY > canvas.height) {
	// 	birdX = 75;
	// 	birdY = 75;
	// 	// location.reload();
	// 	console.log('the end', birdY, canvas.height);
	// }
	requestAnimationFrame(loop);
}

