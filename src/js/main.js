import level from './level.js';
import config from './config.js';
import keys from './keys.js';
import player from './player.js';

var p;

var time = 0,
		level_num = 0,
		canvas = document.getElementById('c'),
		c = canvas.getContext('2d');

var level_object = new level(),
		k = new keys();

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

level_object.load(level_num);

start(function (e) {
	if (!p) {
		p = new player(level_object.spawn[0], level_object.spawn[1]);
	}
	// UPDATE

	if ( (k[38] || k[32]) && p.jumping < 12) {
		p.y -= 6;
		p.jumping += 1;
	}

	level_object.walls.forEach(function (e) {
		if (p.intersects(e)) {
			// Collide on bottom
			p.y = e[1] + config.block_size;
			return;
		}
	});

	p.y += 2.5;

	if (p.y > canvas.height) {
		p = new player(level_object.spawn[0], level_object.spawn[1]);
	}

	level_object.walls.forEach(function (e) {
		if (p.intersects(e)) {
			// Collide on bottom
			p.y = e[1] - config.block_size;
			p.jumping = 0;
			return;
		}
	});

	if (k[37]) {
		p.x -= 3;
	}

	level_object.walls.forEach(function (e) {
		if (p.intersects(e)) {
			p.x = e[0] + config.block_size;
		}

		if (p.x < 0) {
			p.x = 0;
		}
		return;
	});

	if (k[39]) {
		p.x += 3;
	}

	level_object.walls.forEach(function (e) {
		if (p.intersects(e)) {
			p.x = e[0] - config.block_size;
		}
		if (p.x > canvas.width - config.block_size) {
			p.x = canvas.width - config.block_size;
		}
		return;
	});

	if (p.intersects(level_object.goal)) {
		level_num++;
		level_object.load(level_num);
	}

	// DRAW
	c.clearRect(0, 0, canvas.width, canvas.height);

	c.fillStyle = "rgba(0, 0, 0, 0.75)";
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

	if (p) {
		c.beginPath();
		c.rect(p.x, p.y, config.block_size, config.block_size);
		c.fillStyle = '#f0f';
		c.fill();
	}

	if (level_object.goal) {
		c.beginPath();
		c.rect(level_object.goal[0], level_object.goal[1], config.block_size, config.block_size);
		c.fillStyle = '#f00';
		c.fill();
	}

	// Add glitch effect
	if ( (e*1000) % 3 == 0 ) {
		for (var i = 0; i < 5; i++) {
			c.fillStyle = "#000";
			c.fillRect(0, Math.random() * canvas.height, canvas.width, 0.2);
			c.fillStyle = "#fff";
			c.fillRect(0, Math.random() * canvas.height, canvas.width, 0.2);
		}
	}
});

document.addEventListener('keydown', function (e) {
	k.press(e.keyCode);
});

document.addEventListener('keyup', function (e) {
	k.release(e.keyCode);
});

