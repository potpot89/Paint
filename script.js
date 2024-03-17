let canvas = document.querySelector(`#my-canvas`); //intercept the canvas
let context = canvas.getContext(`2d`); //set canvas environment to 2d
let brushColor = document.querySelector(`#brush-color`); //intercept the input color
let brushWidth = document.querySelector(`#brush-width`); //intercept the input range

//logs in the console the coordinates of where you click in the canvas
/*canvas.addEventListener(`click`, (e) => {
  console.log(e.offsetX, e.offsetY);
});*/

//canvas.addEventListener(`mousemove`, (e) => {  console.log(e.offsetX, e.offsetY); //logs in the console the coordinates of where the mouse runs in the canvas
//draw();});

//create an object that is the mouse location and updates the coords of the mouse based on where it is
let mouseLocation = {
  //set a property that will lately prevent to draw in set conditions
  canDraw: false,
  //current positions
  x: 0,
  y: 0,
  //previous positions
  lastX: 0,
  lastY: 0,
};

//adjust the previos addEventListener, accordingly
canvas.addEventListener(`mousemove`, (e) => {
  mouseLocation.lastX = mouseLocation.x;
  mouseLocation.lastY = mouseLocation.y;
  (mouseLocation.x = e.offsetX), (mouseLocation.y = e.offsetY);
  draw();
});

//set event listeners so that when the mouse is clicked, you can draw
canvas.addEventListener(`mousedown`, (e) => {
  mouseLocation.canDraw = true;
});

//when you release the click, you cannot draw
canvas.addEventListener(`mouseup`, (e) => {
  mouseLocation.canDraw = false;
});

//prevent bugs that could occur when going out the canvas and back in, while keeping the click button pressed
canvas.addEventListener(`mouseout`, (e) => {
  mouseLocation.canDraw = false;
});

function draw() {
  //if the mouse is clicked and dragged
  if (mouseLocation.canDraw === true) {
    //do an action from the previous location to the last one
    context.moveTo(mouseLocation.lastX, mouseLocation.lastY);
    context.lineTo(mouseLocation.x, mouseLocation.y);
    //set a color
    context.strokeStyle = brushColor.value;
    //set a dimension for the brush
    context.lineWidth = brushWidth.value;

    //draw a line
    context.stroke();
  }
}
