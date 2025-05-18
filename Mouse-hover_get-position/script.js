
var data = document.getElementById("data");
var custom = document.getElementById("custom");

var img = new Image();	
img.src = '../resource/happy_icon.png';

var picHeight = 30;
var picWidth = 30;


// When true, moving the mouse draws on the canvas
let isDrawing = false;
let x = 0;
let y = 0;

const context = custom.getContext('2d');

// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

// Add the event listeners for mousedown, mousemove, and mouseup
custom.addEventListener('mousedown', e => {
  isDrawing = true;
});

custom.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    x = e.offsetX;
    y = e.offsetY;

    //move img-----
    context.clearRect(0, 0, custom.width, custom.height);    
  	context.drawImage(img, x-picWidth/2, y-picHeight/2, picWidth, picHeight);

    //draw Text
    context.font = "15px Comic Sans MS";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText("x: " + x + ",y: " + y, 50, 15);

    data.innerHTML = "x: " + x + ",y: " + y;
  }
});

window.addEventListener('mouseup', e => {
    isDrawing = false;    
});


//load img to canvas----------------------------
//  var img = new Image();
// img.src = 'icon.png';
// context.drawImage(img, 20, 20, 30, 30);

// img.onload = function(){
//     context.drawImage(img, 0, 0, 30, 30);
//   }


