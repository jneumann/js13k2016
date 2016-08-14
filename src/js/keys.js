var keys =  function () {
	this[37] = false;
	this[38] = false;
	this[39] = false;
	this[40] = false;
};

keys.prototype.press = function (k) {
	this[k] = true;
}

keys.prototype.release = function (k) {
	this[k] = false;
}

export default keys;
