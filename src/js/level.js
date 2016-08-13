import maps from './maps.js';
import config from './config.js';

var level = function () {
	this.walls = [];
	this.player = [];
	this.goal = [];
};

level.prototype.load = function (l) {
	var that = this;
	var col = 0;
	var row = 0;

	maps[l].forEach(function (e) {
		if (e === 1) {
			that.walls.push([
				col * config.block_size,
				row * config.block_size
			]);
		}

		if (e === 'a') {
			// Player
			this.player = [
				col * config.block_size,
				row * config.block_size
			];
		}

		if (e === 'z') {
			// Goal
			this.goal = [
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
