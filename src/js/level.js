import maps from './maps.js';
import config from './config.js';

var level = function () {
	this.walls = [];
	this.spawn = [];
	this.goal = [];
};

level.prototype.load = function (l) {
	this.walls = [];
	this.spawn = [];
	this.goal = [];

	var that = this;
	var col = 0;
	var row = 0;

	if (!maps[l]) {
	}

	maps[l].forEach(function (e) {
		if (e === 1) {
			that.walls.push([
				col * config.block_size,
				row * config.block_size
			]);
		}

		if (e === 9) {
			// Player
			that.spawn = [
				col * config.block_size,
				row * config.block_size
			];
		}

		if (e === 8) {
			// Goal
			that.goal = [
				col * config.block_size,
				row * config.block_size
			];
		}

		col += 1;
		if ( col >= config.columns) {
			row += 1;
			col = 0;
		}
	});
};

export default level;
