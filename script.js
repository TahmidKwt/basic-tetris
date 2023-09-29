const container = document.querySelector(".grid");


const displayGrid = (columns, rows) => {
  
  for (let i = 0; i < columns; i++) {  
    let column = document.createElement("div");
    column.classList.add("column");
    
    let lastRow = document.createElement("div");  	
    lastRow.classList.add("taken");
    lastRow.classList.add("last-row");
    lastRow.classList.add("row");
    console.log(lastRow);
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

let boxes = Array.from(document.querySelectorAll(".grid .row"));
const startBtn = document.querySelector(".start-btn");
const pauseBtn = document.querySelector(".pause-btn");
const resumeBtn = document.querySelector(".resume-btn");
const resetBtn = document.querySelector(".reset-btn");
const displayScore = document.querySelector("#score");
const width = 10;
nextRandom = 0;

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
let timer;
let score = 0;


function draw() {
  
  current.forEach(index => {
    boxes[currentPosition + index].classList.add("tetromino");
  });

}


function undraw() {
  
  current.forEach(index => {
    boxes[currentPosition + index].classList.remove("tetromino");
  });

}


function freeze() {
  
  if (current.some(index => boxes[currentPosition + index].classList.contains("taken"))) {
    
    current.forEach(index => boxes[currentPosition + index - 1].classList.add("taken"));
    
    currentPosition = width*6;
    random = nextRandom;
    nextRandom = Math.floor(Math.random()*tetrominos.length);
    current = tetrominos[random][currentRotation];
    displayShape();
    draw();
    addScore();
    
  }

}


function moveDown() {

  undraw();
  currentPosition += 1;
  draw();
  freeze();
  
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


function changeRotation() {

  undraw();
  currentRotation++;

  if (currentRotation === current.length) {
    currentRotation = 0;
  }

  current = tetrominos[random][currentRotation];
  draw();

}


function controller(e) {

  if (e.keyCode === 37) {
    moveLeft();
  } else if (e.keyCode === 38) {
    changeRotation();
  } else if (e.keyCode === 39) {
    moveRight();
  } else if (e.keyCode === 40) {
    moveDown();
  }

}

document.addEventListener("keyup", controller);


const miniContainer = document.querySelector(".mini-grid");

const displayMini = () => {

  for (let i = 0; i < 4; i++) {
    let mcolumn = document.createElement("div");
    mcolumn.classList.add("mini-column");

    for (let j = 0; j < 4; j++) {
      let mrow = document.createElement("div");
      mrow.classList.add("mini-row");
      mcolumn.appendChild(mrow);
    }
    miniContainer.appendChild(mcolumn);
  }

};

displayMini();

const squares = document.querySelectorAll(".mini-grid .mini-row");
const mWidth = 4;
let mIndex = 0;
const upNextTetrominos = [

  [1, mWidth+1, mWidth*2, mWidth*2+1],  
  [0, 1, mWidth+1, mWidth*2+1],  
  [0, mWidth, mWidth+1, mWidth*2+1],  
  [1, mWidth, mWidth+1, mWidth*2],  
  [1, mWidth, mWidth+1, mWidth*2+1],   
  [0, 1, mWidth, mWidth+1], 
  [1, mWidth+1, mWidth*2+1, mWidth*3+1]

]


function displayShape() {

  squares.forEach(square => {
    square.classList.remove("tetromino");
  });
  upNextTetrominos[nextRandom].forEach(index => {
    squares[mIndex + index].classList.add("tetromino");
  });

}


function addScore() {

  for (let i = 0; i < 19; i++) {

    const row = [i, i + width*2, i + width*4, i + width*6, i + width*8, i + width*10, i + width*12, i + width*14, i + width*16, i + width*18];

    if (row.every(index => boxes[index].classList.contains("taken"))) {
      score += 10;
      displayScore.innerHTML = score;

      row.forEach(index => {
	boxes[index].classList.remove("taken");
      });

      const boxesRemoved = boxes.splice(i, width)
      console.log(boxesRemoved);
    }
  }

}


pauseBtn.disabled = true;
resumeBtn.disabled = true;
resetBtn.disabled = true;

startBtn.addEventListener("click", () => {	
  
  undraw();
  currentPosition = width*6;
  draw();
  clearInterval(timer);
  timer = setInterval(moveDown, 1000);	
  nextRandom = Math.floor(Math.random()*tetrominos.length);	
  displayShape();
  freeze();
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
  startBtn.disabled = true;

});

pauseBtn.addEventListener("click", () => {

  if(timer) {
    clearInterval(timer);
    timer = null;
  }
  resumeBtn.disabled = false;
  pauseBtn.disabled = true;

});

resumeBtn.addEventListener("click", () => {

  if (timer === null) {
    draw();
    timer = setInterval(moveDown, 1000);
  }
  pauseBtn.disabled = false;
  resumeBtn.disabled = true;

});

resetBtn.addEventListener("click", () => {
  
  undraw();
  currentPosition = width*6
  draw();
  clearInterval(timer);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resumeBtn.disabled = true;
  resetBtn.disabled = true;

  boxes.forEach(box => {
    box.classList.remove("tetromino");
    box.classList.remove("taken");
  });

  let lastRow = document.querySelectorAll(".last-row");
  lastRow.forEach(row => {
    row.classList.add("taken");
  });

});
