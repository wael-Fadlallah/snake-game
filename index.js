const grid = document.querySelector(".grid");
const startButton = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
const width = 10;
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
let appleIndex = 0;
let score = 0;
let intervalTime = 500;
let speed = 0.9;
let timerId = 0;

function createGrid() {
  //create 100 of these elements with a for loop
  for (let i = 0; i < width * width; i++) {
    //create element
    const square = document.createElement("div");
    //add styling to the element
    square.classList.add("square");
    //put the element into our grid
    grid.appendChild(square);
    //push it into a new squares array
    squares.push(square);
  }
}
createGrid();

currentSnake.forEach((index) => squares[index].classList.add("snake"));

squares[currentSnake[0]].classList.add("head-right");
// squares[currentSnake[currentSnake.length - 1]].classList.add("tail-right");
function startGame() {
  //remove the snake
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  //remove the apple
  squares[appleIndex].classList.remove("apple");
  squares[appleIndex].innerHTML = "";
  clearInterval(timerId);
  currentSnake = [2, 1, 0];
  score = 0;
  //re add new score to browser
  scoreDisplay.textContent = score;
  direction = 1;
  generateApple();
  //readd the class of snake to our new currentSnake
  currentSnake.forEach((index) => squares[index].classList.add("snake"));
  timerId = setInterval(move, intervalTime);
}

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
    (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
    squares[currentSnake[0] + direction].classList.contains("snake")
  )
    return clearInterval(timerId);

  // removeSnakeTail();
  //remove last element from our currentSnake array
  const tail = currentSnake.pop();
  //remove styling from last element
  squares[tail].classList.remove("snake");
  removeSnakeHead();

  //add square in direction we are heading
  currentSnake.unshift(currentSnake[0] + direction);

  //deal with snake head gets apple
  if (squares[currentSnake[0]].classList.contains("apple")) {
    //remove the class of apple
    squares[currentSnake[0]].classList.remove("apple");
    // remove the apple
    squares[currentSnake[0]].innerHTML = "";
    //grow our snake by adding class of snake to it
    squares[tail].classList.add("snake");
    console.log(tail);
    //grow our snake array
    currentSnake.push(tail);
    console.log(currentSnake);
    //generate new apple
    generateApple();
    //add one to the score
    score++;
    //display our score
    scoreDisplay.textContent = score;
    //speed up our snake
    clearInterval(timerId);
    console.log(intervalTime);
    intervalTime = intervalTime * speed;
    console.log(intervalTime);
    timerId = setInterval(move, intervalTime);
  }
  //add styling so we can see it
  squares[currentSnake[0]].classList.add("snake");
  calculateSnakeHead();
  // calculateSnakeTail();
}

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (
    squares[appleIndex].classList.contains("snake") ||
    squares[appleIndex].classList.contains("apple")
  );
  squares[appleIndex].classList.add("apple");
  squares[appleIndex].innerHTML = "🍎";
}
generateApple();

function control(e) {
  if (e.keyCode === 39) {
    // if snake heading left return true
    if (direction == -1) return true;
    console.log("right pressed");
    direction = 1;
    squares[currentSnake[0]].classList.add("turn-right");
  } else if (e.keyCode === 38) {
    // if snake heading down return true
    if (direction == +width) return true;
    console.log("up pressed");
    direction = -width;
    squares[currentSnake[0]].classList.add("turn-up");
  } else if (e.keyCode === 37) {
    // if snake heading left return true
    if (direction == +1) return true;
    console.log("right pressed");
    direction = -1;
    squares[currentSnake[0]].classList.add("turn-left");
  } else if (e.keyCode === 40) {
    // if snake heading up return true
    if (direction == -width) return true;
    console.log("down pressed");
    direction = +width;
    squares[currentSnake[0]].classList.add("turn-down");
  }
}
function calculateSnakeHead() {
  if (direction === -width) {
    squares[currentSnake[0]].classList.add("head-up");
  }
  if (direction === +1) {
    squares[currentSnake[0]].classList.add("head-right");
  }
  if (direction === -1) {
    squares[currentSnake[0]].classList.add("head-left");
  }
  if (direction === +width) {
    squares[currentSnake[0]].classList.add("head-down");
  }
}

function removeSnakeHead() {
  squares[currentSnake[0]].classList.remove("head-left");
  squares[currentSnake[0]].classList.remove("head-right");
  squares[currentSnake[0]].classList.remove("head-down");
  squares[currentSnake[0]].classList.remove("head-up");
}

// function calculateSnakeTail() {
//   const tail = squares[currentSnake[currentSnake.length - 1]];
//   if (tail.classList.contains("turn-left")) {
//     tail.classList.remove("turn-left");
//     tail.classList.add("tail-left");
//   }
//   if (tail.classList.contains("turn-right")) {
//     tail.classList.remove("turn-right");
//     tail.classList.add("tail-right");
//   }
//   if (tail.classList.contains("turn-up")) {
//     tail.classList.remove("turn-up");
//     tail.classList.add("tail-up");
//   }
//   if (tail.classList.contains("turn-down")) {
//     tail.classList.remove("turn-down");
//     tail.classList.add("tail-down");
//   }
// }

// function removeSnakeTail() {
//   const tail = squares[currentSnake[currentSnake.length - 1]];
//   tail.classList.remove("tail-left");
//   tail.classList.remove("tail-right");
//   tail.classList.remove("tail-down");
//   tail.classList.remove("tail-up");
// }

document.addEventListener("keyup", control);
startButton.addEventListener("click", startGame);
