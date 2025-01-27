// Candy Crush Game Implementation
// Using icons for a visually enhanced game experience

const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
const width = 8;
const squares = [];
let score = 0;

const candyIcons = [
    "./media/img.jpg", 
    "./media/img2.png",
    "./media/img3.png",
    "./media/img4.jpg"
  ];

// Create Board
function createBoard() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    square.setAttribute("draggable", true);
    square.setAttribute("id", i);
    let randomIcon = Math.floor(Math.random() * candyIcons.length);
    square.style.backgroundImage = `url(${candyIcons[randomIcon]})`;
    square.style.backgroundSize = "cover";
    square.style.backgroundRepeat = "no-repeat";
    square.style.backgroundPosition = "center";
    square.classList.add("candy-square");
    grid.appendChild(square);
    squares.push(square);
  }
}
createBoard();

// Dragging functionality
let iconBeingDragged;
let iconBeingReplaced;
let squareIdBeingDragged;
let squareIdBeingReplaced;

squares.forEach(square => square.addEventListener("dragstart", dragStart));
squares.forEach(square => square.addEventListener("dragend", dragEnd));
squares.forEach(square => square.addEventListener("dragover", dragOver));
squares.forEach(square => square.addEventListener("dragenter", dragEnter));
squares.forEach(square => square.addEventListener("dragleave", dragLeave));
squares.forEach(square => square.addEventListener("drop", dragDrop));

function dragStart() {
  iconBeingDragged = this.style.backgroundImage;
  squareIdBeingDragged = parseInt(this.id);
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {
  this.style.backgroundColor = "";
}

function dragDrop() {
  iconBeingReplaced = this.style.backgroundImage;
  squareIdBeingReplaced = parseInt(this.id);
  this.style.backgroundImage = iconBeingDragged;
  squares[squareIdBeingDragged].style.backgroundImage = iconBeingReplaced;
}

function dragEnd() {
  // Valid moves
  const validMoves = [
    squareIdBeingDragged - 1,
    squareIdBeingDragged - width,
    squareIdBeingDragged + 1,
    squareIdBeingDragged + width
  ];

  const validMove = validMoves.includes(squareIdBeingReplaced);

  if (squareIdBeingReplaced && validMove) {
    squareIdBeingReplaced = null;
  } else if (squareIdBeingReplaced && !validMove) {
    squares[squareIdBeingReplaced].style.backgroundImage = iconBeingReplaced;
    squares[squareIdBeingDragged].style.backgroundImage = iconBeingDragged;
  } else squares[squareIdBeingDragged].style.backgroundImage = iconBeingDragged;
}

// Check for matches
function checkRowForThree() {
  for (let i = 0; i < 61; i++) {
    let rowOfThree = [i, i + 1, i + 2];
    let decidedIcon = squares[i].style.backgroundImage;
    const isBlank = decidedIcon === "";

    if (
      rowOfThree.every(
        index => squares[index].style.backgroundImage === decidedIcon && !isBlank
      )
    ) {
      score += 3;
      scoreDisplay.innerHTML = score;
      rowOfThree.forEach(index => {
        squares[index].style.backgroundImage = "";
      });
    }
  }
}

function checkColumnForThree() {
  for (let i = 0; i < 47; i++) {
    let columnOfThree = [i, i + width, i + width * 2];
    let decidedIcon = squares[i].style.backgroundImage;
    const isBlank = decidedIcon === "";

    if (
      columnOfThree.every(
        index => squares[index].style.backgroundImage === decidedIcon && !isBlank
      )
    ) {
      score += 3;
      scoreDisplay.innerHTML = score;
      columnOfThree.forEach(index => {
        squares[index].style.backgroundImage = "";
      });
    }
  }
}

function moveDown() {
  for (let i = 0; i < 55; i++) {
    if (squares[i + width].style.backgroundImage === "") {
      squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
      squares[i].style.backgroundImage = "";
      let firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      let isFirstRow = firstRow.includes(i);
      if (isFirstRow && squares[i].style.backgroundImage === "") {
        let randomIcon = Math.floor(Math.random() * candyIcons.length);
        squares[i].style.backgroundImage = `url(${candyIcons[randomIcon]})`;
      }
    }
  }
}

// Continuous checks
window.setInterval(function () {
  moveDown();
  checkRowForThree();
  checkColumnForThree();
}, 100);
