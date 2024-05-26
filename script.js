let canvas = document.querySelector('#my-canvas');
let ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.fillRect(0,0,canvas.width,canvas.height);

let penColor = document.querySelector('#pen-color');
let penWidth = document.querySelector('#pen-width');
let saveButton = document.querySelector('#save');
let clearButton = document.querySelector('#clear');
let output = document.querySelector('#output');

let mouseLocation = {
  canDraw: false,
  x: 0,
  y: 0,
  lastX: 0,
  lastY: 0
}

// Quando l'utente muove il mouse, prendiamo le coordinate x e y del puntatore rispetto al canvas (offsetX, offsetY)
// Le coordinate del movimento precedente vengono salvate come lastX e lastY
canvas.addEventListener('mousemove', (e) => {
  // console.log(e.offsetX, e.offsetY);
  mouseLocation.lastX = mouseLocation.x;
  mouseLocation.lastY = mouseLocation.y;
  mouseLocation.x = e.offsetX;
  mouseLocation.y = e.offsetY;
  draw();
});

// Quando l'utente tiene cliccato il pulsante del mouse, cambiamo canDraw a true per iniziare a disegnare
canvas.addEventListener('mousedown', (e) => {
  mouseLocation.canDraw = true;
  // console.log('click')
})
// Quando l'utente rilascia il pulsante o esce dal canvas, rimettiamo canDraw a false
canvas.addEventListener('mouseup', (e) => {
  mouseLocation.canDraw = false;
  // console.log('release')
})
canvas.addEventListener('mouseout', (e) => {
  // console.log('out')
  mouseLocation.canDraw = false;
})

saveButton.addEventListener('click', saveImg);
clearButton.addEventListener('click', clearCanvas);

function draw() {
  if(mouseLocation.canDraw) {
    ctx.beginPath();
    ctx.moveTo(mouseLocation.lastX, mouseLocation.lastY);
    ctx.lineTo(mouseLocation.x, mouseLocation.y);
    ctx.strokeStyle = penColor.value;
    ctx.lineWidth = penWidth.value;
    ctx.stroke();
    ctx.closePath();
  }
}

function saveImg() {
  // Prendiamo i dati che compongono l'immagine nel canvas e li convertiamo in formato JPEG, codificato in base64
  let dataURL = canvas.toDataURL('image/jpeg');
  // Se non specifico il formato, scarico un png
  // let dataURL = canvas.toDataURL();
  // console.log(dataURL);

  let imgContainer = document.createElement('div');
  imgContainer.classList.add('saved-item-container');
  
  let img = document.createElement('img');
  // Passo la stringa di dati direttamente all'attributo src dell'immagine
  img.src = dataURL;
  imgContainer.append(img);
  
  let imgDownload = document.createElement('a');
  imgDownload.textContent = 'Download';
  // Passo la stringa di dati all'attributo href del link
  imgDownload.href = dataURL;
  // Aggiungo l'attributo download, con la specifica del nome da dare al file, per poterlo scaricare al click del pulsante
  imgDownload.setAttribute('download', 'my-painting.jpg');
  imgContainer.append(imgDownload)
  imgContainer.addEventListener('click', () => {
    imgContainer.remove();
  })
  
  output.prepend(imgContainer);
}

function clearCanvas() {
  // Aggiungiamo un rettangolo bianco su tutto il canvas
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,canvas.width,canvas.height);
}