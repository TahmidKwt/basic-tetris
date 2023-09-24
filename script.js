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

displayGrid(10,20);

let boxes = Array.from(document.querySelectorAll(".container .row"));
const width = 10;

const lTetromino = [  
    
  [0, 1, 2, width*2+1],  
  [0, width*2+1, width*4+2, width*4+3], 
  [2, width*2+1, width*2+2, width*2+3],  
  [0, 1, width*2+1, width*4+2]
   
]

const zTetromino = [
    
  [1, width*2+2, width*2+1, width*4+2],  
  [0, 1, width*2+2, width*2+3],  
  [1, width*2+2, width*2+1, width*4+2],  
  [0, 1, width*2+2, width*2+3]

]

const tTetromino = [
 
  [1, width*2+1, width*2+2, width*4+3],   
  [width*2+1, width*2+2, width*2+3, width*4+3],    
  [0, width*2+1, width*2+2, width*4+2],
  [1, width*2+1, width*2+2, width*2+3]
  
]

const oTetromino = [

  [0, 1,width*2+1, width*2+2], 
  [0, 1, width*2+1, width*2+2],   
  [0, 1, width*2+1, width*2+2],   
  [0, 1, width*2+1, width*2+2]
 
]

const iTetromino = [
  
  [width*2+1, width*2+2, width*2+3, width*2+4],
  [0, width*2+1, width*4+2, width*6+3],   
  [width*2+1, width*2+2, width*2+3, width*2+4],
  [0, width*2+1, width*4+2, width*6+3]
  
]

const tetrominos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

let currentPosition = width*6+3;
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
    
    currentPosition = width*6+3;
    random = Math.floor(Math.random()*tetrominos.length);
    current = tetrominos[random][currentRotation];
    draw();
    
  }

}
  
