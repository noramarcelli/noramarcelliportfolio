'use strict';

var WALL = '🝙';
var FOOD = '🍕';
var EMPTY = ' ';
var CHERRY = '🍒';

var gBoard;
var gState = {
  score: 0,
  isGameDone: false
};

function init() {
  gBoard = buildBoard();
  printMat(gBoard, '.boardContainer');
  console.table(gBoard);
}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board[i] = [];
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      // Plcae WALLs 
      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j == 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
    }
  }
  createPacman(board);
  createGhosts(board);
  board[1][3] = CHERRY;
  board[3][3] = CHERRY;
  board[7][6] = CHERRY;
  board[8][1] = CHERRY;
  
  return board;
}

// This function is called from both pacman and ghost to check engage
function checkEngage(cell, opponent) {
  if (cell === opponent) {
    // TODO: basic support for eating power-ball (which is not in the game yet)
    if (gPacman.isSuper) {
      console.log('Ghost is dead');
    } else {
      clearInterval(gIntervalGhosts);
      gIntervalGhosts = undefined;
      gState.isGameDone = true;
      // TODO: GameOver popup with a play again button
      console.log('Game Over!');
      return true;
    }
  }
  return false;
}

// function checkIsSuper() {
//   if () {
//     gPacman.isSuper = true;
//   }
// }


// this function updates both the model and the dom for the score
function updateScore(value) {
  gState.score += value;
  var elScore = document.querySelector('.score')
  elScore.innerText = gState.score;
}

function renderCell(location, value) {
  var cellSelector = '.cell' + location.i + '-' + location.j;
  var elCell = document.querySelector(cellSelector);
  elCell.innerHTML = value;
}

