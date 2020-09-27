var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width;
var ch = canvas.height;

var rows = 10;
var cols = 10;
var delay = 0;

var img = new Image();
img.onload = start;
img.src = "meteora.jpg";

var pieces = [];

function start() {

  var counter = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      pieces.push({
        col: j,
        row: i,
		index: counter
      });
	  counter++;
    }
  }

  shuffle(pieces);
  drawPicture(pieces);
  //printSequence(pieces);
  
  bubbleSort(pieces);

}

function printSequence(pieces){
	for(var i = 0; i < pieces.length; i++)
	console.log(pieces[i].index);
}

function bubbleSort(pieces){
	// helper function
	var delayed = (function() {
	  var queue = [];

	 function processQueue() {
		if (queue.length > 0) {
		  setTimeout(function () {
			queue.shift().cb();
			processQueue();
		  }, queue[0].delay);
		}
	  }

	  return function delayed(delay, cb) {
		queue.push({ delay: delay, cb: cb });

		if (queue.length === 1) {
		  processQueue();
		}
	  };
	}());
	
	for (let i = 0; i < pieces.length-1; i++) {
	  for (let j = 1; j < pieces.length-i; j++) {
		delayed(delay, function(i, j) {
		  return function() {
			if (pieces[j-1].index > pieces[j].index){
				swapPiece(pieces, j-1, j);
			}	
		  };
		}(i, j));
	  }
	}
}


function swapPiece(pieces, a, b){
    var temp = pieces[a];
	pieces[a] = pieces[b];
	pieces[b] = temp;
	drawPicture(pieces);
}

function drawPicture(pieces){
  var iw = canvas.width = img.width;
  var ih = canvas.height = img.height;
  var pieceWidth = iw / cols;
  var pieceHeight = ih / rows;
  
  var i = 0;
  for (var y = 0; y < rows; y++) {
    for (var x = 0; x < cols; x++) {
      var p = pieces[i++];
      ctx.drawImage(
        // from the original image
        img,
        // take the next x,y piece
        x * pieceWidth, y * pieceHeight, pieceWidth, pieceHeight,
        // draw it on canvas based on the shuffled pieces[] array
        p.col * pieceWidth, p.row * pieceHeight, pieceWidth, pieceHeight
      );
    }
  }
  
}

function shuffle(pieces) {
  for (var i = pieces.length-1; i > 0; --i){
	  var random = Math.floor(Math.random() * i);
	  var temp = pieces[i];
	  pieces[i] = pieces[random];
	  pieces[random] = temp;
  };
  return pieces;
};
