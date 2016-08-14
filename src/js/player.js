import config from './config.js';

var player = function (x, y) {
	this.spawn_x = x;
	this.spawn_y = y;
	this.x = x;
	this.y = y;
	this.jumping = 999;
};

player.prototype.intersects = function (e) {
	return e[1] < this.y + config.block_size &&
				e[1] + config.block_size > this.y &&
				e[0] < this.x + config.block_size &&
				e[0] + config.block_size > this.x;
};

export default player;
