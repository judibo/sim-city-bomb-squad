console.log("javascript running");

/*----- constants -----*/
const STARTING_TIME = 30;

/*----- app's state (variables) -----*/
var remainingTime;
var gameOver;
var wiresCut;
var wiresToCut;

var bombDelay;
var timer;

/*----- cached element references -----*/
var body;

// var blueImage;
// var greenImage;
// var redImage;
// var whiteImage;
// var yellowImage;
var wireArray;

var clockText;
var resetBtn;
var wireBox;

/*----- event listeners -----*/
function cutWire(event) {
  // Function for when a user cuts a wire
  if (!wiresCut[this.id] && !gameOver) {
    // Apply the cut wire image
    event.target.src = "img/cut-" + this.id + "-wire.png";
    wiresCut[this.id] = true;
    // Was this a correct wire?
    var wireIndex = wiresToCut.indexOf(this.id);
    if (wireIndex > -1) {
      // This was a good wire...
      console.log(this.id + " was correct!");
      wiresToCut.splice(wireIndex, 1);
      if (checkForWin()) {
        endGame(true);
      }
    } else {
      // That was a bad wire...
      console.log(this.id + " was incorrect!");
      bombDelay = setTimeout(function() {
        endGame(false);
      }, 750);
    }
  }
}
function reset(event) {
  // Re-initialize variables
  gameOver = false;
  // show all uncut wires
  for (let i = 0; i < wireArray.length; i++) {
    wireArray[i].src = "img/uncut-" + wireArray[i].id + "-wire.png";
  }
  // display the simcity bg
  body.classList.remove("exploded");
  body.classList.add("unexploded");

  // Put the clock text back to red
  clockText.classList.remove("green");
  clockText.classList.add("red");

  clearTimeout(bombDelay);
  clearInterval(timer);

  initGame();
}
function updateClock() {
  remainingTime--;
  if (remainingTime <= 0) {
    endGame(false);
  }
  clockText.textContent = "0:00:" + remainingTime;
}

/*----- functions -----*/
function initGame() {
  //   initialize variables
  wiresToCut = [];
  wiresCut = {
    blue: false,
    green: false,
    red: false,
    white: false,
    yellow: false
  }
  remainingTime = STARTING_TIME;

  // Randomly assign wires to cut
  for (let wire in wiresCut) {
    wiresCut[wire]
    var rand = Math.random();
    if (rand > 0.5) {
      wiresToCut.push(wire);
    }
  }
  console.log()
  // Start that game!
  timer = setInterval(updateClock, 1000);
}

function endGame(win) {
  //    win: stop timer
  //    win: stop the interval
  clearTimeout(bombDelay);
  clearInterval(timer);

  gameOver = true;

  if (win) {
    console.log("you saved the city!");
    //    win: turn the timer green
    clockText.classList.remove("red");
    clockText.classList.add("green");
    //    win: play the win song
  } else {
    console.log("BOOM!!!!");
    //    lose: body background exploded
    body.classList.add("exploded");
    body.classList.remove("unexploded");
  }
}

function checkForWin() {
  return wiresToCut.length ? false : true;
}

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM loaded");
  body = document.body;

  blueImage = document.getElementById('blue');
  greenImage = document.getElementById('green');
  redImage = document.getElementById('red');
  whiteImage = document.getElementById('white');
  yellowImage = document.getElementById('yellow');

  wireArray = document.getElementById('wirebox').children;

  clockText = document.querySelector('p');
  resetBtn = document.querySelector('button');
  wireBox = document.getElementById('wirebox');

  // wireBox.addEventListener('click', cutWire);
  for (let wire of wireArray) {
    wire.addEventListener('click', cutWire);
  }

  resetBtn.addEventListener('click', reset);
  initGame();
});

// during gameplay
//  Update timer
//  check for win/loss
//    correct wires - var
//    which wires have been cut - var
//    have handle to that timeout

//    
