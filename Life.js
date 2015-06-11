

function Life(gridW, gridH) {
	this.gridW = gridW;
	this.gridH = gridH;

	var INIT_DENSITY = 0.1;
	var OCCUPIED = 1;
	var EMPTY = 0;
	
	var boardRd = new Array(gridW * gridH);
	var boardWrt = new Array(gridW * gridH);

	this.initBoard = function() {
		for (var y = 0; y < this.gridH; ++y) {
			for (var x = 0; x < this.gridW; ++x) {
				if (Math.random() < INIT_DENSITY) {
					setCell(x, y);
				}
				else {
					clearCell(x,y);
				}
			}
		}
		swapBoards();	
	}

	this.live = function() {
		for (var y = 0; y < this.gridH; ++y) {
			for (var x = 0; x < this.gridW; ++x) {
				var n = countNeighbours(x, y);
				if (n < 2 || n > 3) {
					clearCell(x,y);
				}
				else if (n == 2) {
					copyCell(x,y);
				}
				else if (n == 3) {
					setCell(x,y);
				}
			}
		}
		swapBoards();	
	}
	
	this.cellChanged = function (x, y) {
		var ix = y * this.gridW + x;
		return boardWrt[ix] != boardRd[ix];		
	}
	
	this.get = function(x,y) {
		return boardRd[y * this.gridW + x];
	}
	
	this.set = function(x,y) {
		boardRd[y * this.gridW + x] = OCCUPIED;
	}

	function countNeighbours(x, y) {
		var count = 0;
		count += getCell(x - 1, y - 1);
		count += getCell(x, y - 1);
		count += getCell(x + 1, y - 1);
		count += getCell(x - 1, y);
		count += getCell(x + 1, y);
		count += getCell(x - 1, y  + 1);
		count += getCell(x, y  + 1);
		count += getCell(x + 1, y  + 1);
		return count;
	}
	
	function getCell(x, y) {
		if (x < 0) x += gridW;
		else if (x >= gridW) x -=gridW;
		if (y < 0) y += gridH;
		else if (y >= gridH) y -= gridH;
		
		return boardRd[y * gridW + x] == OCCUPIED;
	}

	function setCell(x, y) {
		boardWrt[y * gridW + x] = OCCUPIED;
	}
	
	function clearCell(x, y) {
		boardWrt[y * gridW + x] = EMPTY;
	}
	
	function copyCell(x, y) {
		var ix = y * gridW + x;
		boardWrt[ix] = boardRd[ix];
	}	
	
	function swapBoards() {
		var tmp = boardWrt;
		boardWrt = boardRd;
		boardRd = tmp;
	}
						
	this.initBoard();
}
