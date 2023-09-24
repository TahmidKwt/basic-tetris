const container = document.querySelector(".container");

const displayGrid = (columns, rows) => {
  
  for (let i = 0; i < columns; i++) {  
    let column = document.createElement("div");
    column.classList.add("column");
    
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

