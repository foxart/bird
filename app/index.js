let canvas;
let context;
let bird;
let pipes = [];
const birdImage = new Image();
const backgroundImage = new Image();
const foregroundImage = new Image();
const pipeTopImage = new Image();
const pipeBottomImage = new Image();
birdImage.src = 'images/bird.png';
backgroundImage.src = 'images/background.png';
foregroundImage.src = 'images/foreground.png';
pipeTopImage.src = 'images/pipe-top.png';
pipeBottomImage.src = 'images/pipe-bottom.png';
const flySound = new Audio();
const scoreSound = new Audio();
flySound.src = 'sounds/fly.mp3';
scoreSound.src = 'sounds/score.mp3';
/**/
window.addEventListener('load', function() {
	canvas = document.getElementById('canvas');
	context = canvas.getContext('2d');
	console.log(canvas.height, canvas.width);
	bird = birdInit(canvas);
	pipes.push(pipeInit(canvas));
	document.addEventListener('keydown', function(event) {
		if (event.code === 'Space') {
			birdFlyUp(bird);
		}
	});
	document.getElementById('start').addEventListener('click', function() {
		document.getElementById('start').disabled = true;
		// bird = birdInit(canvas);
		// pipes.push(pipeInit(canvas));
		loop();
	});
});

function birdInit(canvas) {
	const width = 20;
	return {
		size: width,
		x: canvas.width / 7 - width,
		y: canvas.height / 2 - width,
		gravity: 1.5,
		swing: width * 1.5,
		score: 0,
	};
}

function pipeInit(canvas) {
	const randomInt = (min, max) => min + Math.floor((max - min) * Math.random());
	const gap = randomInt(canvas.height / 5, canvas.height - canvas.height / 5);
	const height = 60;
	const width = 120;
	return {
		x: canvas.width,
		width: width,
		topY: 0,
		topHeight: canvas.height - gap - height,
		bottomY: canvas.height - gap + height,
		bottomHeight: canvas.height - (canvas.height - gap + height),
		speed: 3,
	};
}

function birdFlyUp(bird) {
	bird.y -= bird.swing;
	flySound.play().then();
}

function birdFlyDown(bird) {
	bird.y += bird.gravity;
}

function drawAxis() {
	context.beginPath();
	context.moveTo(0, canvas.height / 2);
	context.lineTo(canvas.width, canvas.height / 2);
	context.stroke();
	context.beginPath();
	context.moveTo(canvas.width / 7, 0);
	context.lineTo(canvas.width / 7, canvas.height);
	context.stroke();
	context.beginPath();
	context.moveTo(canvas.width / 2, 0);
	context.lineTo(canvas.width / 2, canvas.height);
	context.stroke();
}

function drawBird(bird) {
	// context.beginPath();
	// context.arc(bird.x + bird.size, bird.y + bird.size, bird.size, 0, 2 * Math.PI);
	// context.stroke();
	context.drawImage(birdImage, bird.x, bird.y, bird.size * 2, bird.size * 2);
	/**/
	const font = 50;
	const text = 'Game Over!';
	context.font = '40px serif';
	context.fillStyle = 'black';
	context.fillText(`Score: ${bird.score}`, 10, 50);
}

function drawPipe(pipe) {
	// context.fillStyle = 'blue';
	// context.fillRect(pipe.x, pipe.topY, pipe.width, pipe.topHeight);
	// context.fillStyle = 'brown';
	// context.fillRect(pipe.x, pipe.bottomY, pipe.width, pipe.bottomHeight);
	context.drawImage(pipeTopImage, pipe.x, pipe.topY, pipe.width, pipe.topHeight);
	context.drawImage(pipeBottomImage, pipe.x, pipe.bottomY, pipe.width, pipe.bottomHeight);
}

function loop() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
	for (let i = 0; i < pipes.length; i++) {
		let pipe = pipes[i];
		pipe.x -= pipe.speed;
		drawPipe(pipe);
	}
	drawAxis();
	birdFlyDown(bird);
	drawBird(bird);
	const firstPipe = pipes[0];
	if (
		(bird.x + bird.size >= firstPipe.x && bird.x + bird.size <= firstPipe.x + firstPipe.width) &&
		(bird.y <= firstPipe.topHeight || bird.y + bird.size >= canvas.height - firstPipe.bottomHeight) ||
		(bird.y < 0 || bird.y + bird.size > canvas.height)
	) {
		const font = 50;
		const text = 'Game Over!';
		context.font = `${font}px serif`;
		context.fillStyle = 'red';
		context.fillText(text, canvas.width / 2 - text.length / 2 * font / 2, canvas.height / 2 + font / 4);
		document.getElementById('start').disabled = false;
		// requestAnimationFrame(loop);
	} else {
		if (firstPipe.x + firstPipe.width < 0) {
			pipes.shift();
			bird.score += 5;
			scoreSound.play().then();
		}
		const lastPipe = pipes[pipes.length - 1];
		if (lastPipe.x + lastPipe.width < canvas.width / 2) {
			pipes.push(pipeInit(canvas));
		}
		requestAnimationFrame(loop);
	}
}

