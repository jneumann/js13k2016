import level from './level.js';
import config from './config.js';

var time = 0,
		level_num = 0,
		m = Math,
		canvas = document.getElementById('c'),
		c = canvas.getContext('2d');


function raf(fn) {
	return window.requestAnimationFrame(function () {
		var now = Date.now();
		var e = now - time;

		if (e > 999) {
			e = 1/60;
		} else {
			e /= 1e3;
		}

		time = now;
		fn(e);
	});
}

function start(fn) {
	return raf(function tick(e) {
		fn(e);
		raf(tick);
	});
}

var level_object = new level();
level_object.load(level_num);

start(function () {
	c.clearRect(0, 0, canvas.width, canvas.height);

	c.fillStyle = "rgba(0, 0, 0, 0.75)",
	c.fillRect(0, 0, canvas.width, canvas.height);

	level_object.walls.forEach(function (e) {
		c.beginPath();
		c.rect(e[0], e[1], config.block_size, config.block_size);
		c.fillStyle = '#fff';
		c.fill();
		c.lineWidth = 1;
		c.strokeStyle = '#000';
		c.stroke();
	});

		c.beginPath();
		c.rect(level_object.player[0], level_object.player[1], config.block_size, config.block_size);
		c.fillStyle = '#fff';
		c.fill();
});
