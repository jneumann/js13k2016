"use strict";

let fs = require('fs'),
		png = require('png-js');

fs.readdir('level-img', (err, files) => {
	files.forEach((fileName, i) => {
		if (fileName.split(".")[1] == 'png') {
			png.decode('level-img/' + fileName, function(pixels) {
				let pixel_data =  pixels.toJSON();

				let buf_index = 0,
						pixel_index = 0;

				for (var k in pixel_data) {
					if (buf_index !== 0) {
						let pixel_arr = [],
								temp_arr = [],
								level_arr = [];

						pixel_data[k].forEach((el, i) => {
							temp_arr.push(el);
							pixel_index += 1;
							if (pixel_index % 4 === 0) {
								pixel_arr.push(temp_arr);
								temp_arr = [];
							}
						});

						pixel_arr.forEach((e, i) => {
							if (
									e[0] === 0 &&
									e[1] === 0 &&
									e[2] === 0
							) {
								// Null
								level_arr.push(0);
							}
							if (
									e[0] === 255 &&
									e[1] === 255 &&
									e[2] === 255
							) {
								// Wall
								level_arr.push(1);
							}
							if (
									e[0] === 255 &&
									e[1] === 255 &&
									e[2] === 0
							) {
								// Wall
								level_arr.push(2);
							}
							if (
									e[0] === 255 &&
									e[1] === 0 &&
									e[2] === 0
							) {
								// Goal
								level_arr.push(8);
							}
							if (
									e[0] === 0 &&
									e[1] === 0 &&
									e[2] === 255
							) {
								// Glitch
								level_arr.push(7);
							}
							if (
									e[0] === 255 &&
									e[1] === 0 &&
									e[2] === 255
							) {
								// Player
								level_arr.push(9);
							}
						});

						fs.writeFile( 'export/' + fileName.split('.')[0] + '.json', level_arr.toString(), (err) => {
							if (err) {
								console.log(err);
							}
						});
					}

					buf_index += 1;
				}
			});
		}
	});
});
