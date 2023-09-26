const container = document.querySelector(".container");


const displayGrid = (columns, rows) => {
  
  for (let i = 0; i < columns; i++) {  
    let column = document.createElement("div");
    column.classList.add("column");
    
    let lastRow = document.createElement("div");  	
    lastRow.classList.add("taken");  
		lastRow.classList.add("row"); 
		column.appendChild(lastRow);
    
    for (let j = 0; j < rows; j++) {  
      let row = document.createElement("div");
      row.classList.add("row");
      column.insertBefore(row, lastRow);
    } 
    container.appendChild(column);
  }
  
};

displayGrid(10, 19);

let boxes = Array.from(document.querySelectorAll(".container .row"));
const width = 10;

const lTetromino = [  
    
  [1, width*2+1, width*4, width*4+1],  
  [width*2, width*2+1, width*2+2, width*4+2], 
  [1, 2, width*2+1, width*4+1],  
  [0, width*2, width*2+1, width*2+2]
   
]

const jTetromino = [  
    
  [0, 1, width*2+1, width*4+1],  
  [width*2, width*2+1, width*2+2, width*4], 
  [1, width*2+1, width*4+1, width*4+2],  
  [2, width*2, width*2+1, width*2+2]
   
]

const zTetromino = [
    
  [0, width*2, width*2+1, width*4+1],  
  [width*2+1, width*2+2, width*4, width*4+1],  
  [1, width*2+1, width*2+2, width*4+2],  
  [1, 2, width*2, width*2+1]

]

const sTetromino = [
    
  [1, width*2, width*2+1, width*4],  
  [width*2, width*2+1, width*4+1, width*4+2],  
  [2, width*2+1, width*2+2, width*4+1],  
  [0, 1, width*2+1, width*2+2]

]

const tTetromino = [
 
  [1, width*2, width*2+1, width*4+1],   
  [width*2, width*2+1, width*2+2, width*4+1],    
  [1, width*2+1, width*2+2, width*4+1],
  [1, width*2, width*2+1, width*2+2]
  
]

const oTetromino = [

  [0, 1, width*2, width*2+1], 
  [0, 1, width*2, width*2+1],   
  [0, 1, width*2, width*2+1],   
  [0, 1, width*2, width*2+1]
 
]

const iTetromino = [
  
  [1, width*2+1, width*4+1, width*6+1],
  [width*4, width*4+1, width*4+2, width*4+3],
  [2, width*2+2, width*4+2, width*6+2],   
  [width*2, width*2+1, width*2+2, width*2+3]
  
]

const tetrominos = [lTetromino, jTetromino, zTetromino, sTetromino, tTetromino, oTetromino, iTetromino]

let currentPosition = width*6;
let currentRotation = 0;
let random = Math.floor(Math.random()*tetrominos.length);
let current = tetrominos[random][currentRotation];
timer = setInterval(moveDown, 1000);


function draw() {
  
  current.forEach(index => {
    boxes[currentPosition + index].classList.add("tetromino");
  });

}

draw();


function undraw() {
  
  current.forEach(index => {
    boxes[currentPosition + index].classList.remove("tetromino");
  });

}


function moveDown() {

  undraw();
  currentPosition += 1;
  draw();
  freeze();
  
}


function freeze() {
  
  if (current.some(index => boxes[currentPosition + index].classList.contains("taken"))) {
    
    current.forEach(index => boxes[currentPosition + index - 1].classList.add("taken"));
    
    currentPosition = width*6;
    random = Math.floor(Math.random()*tetrominos.length);
    current = tetrominos[random][currentRotation];
    draw();
    
  }

}


function moveLeft() {

  undraw();
  const isLeftEdge = current.some(index => (currentPosition + index) <= width*2);
  
  if (!isLeftEdge) {
    currentPosition -= width*2;
  }

  if (current.some(index => boxes[currentPosition + index].classList.contains("taken"))) {
    currentPosition += width*2;
  }

  draw();

}


function moveRight() {

  undraw();
  const isRightEdge = current.some(index => (currentPosition + index) >= width*18);

  if (!isRightEdge) {
    currentPosition += width*2;
  }

  if (current.some(index => boxes[currentPosition + index].classList.contains("taken"))) {
    currentPosition -= width*2;
  }

  draw();

}


function controller(e) {

  if (e.keyCode === 37) {
    moveLeft();
  } else if (e.keyCode === 39) {
    moveRight();
  }

}

document.addEventListener("keyup", controller);
