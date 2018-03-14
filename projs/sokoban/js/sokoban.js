'use strict';

console.log('Sokoban');

var gBoard;
var gGamerPos = { i: 7, j: 2 };
var gMan=''; //= '👨‍';
var gBox = '📦';
var gWall = '🝙';
var gTarget = '⊕';
var ROW_SIZE = 9;
var COLL_SIZE = 9;
var MAX_STEPS = 100;
var gSteps = 0;

initGame ();
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function initGame() {
    gSteps = 0;

    gBoard = createBoard();
    gBoard[7][2] = gMan;
    gBoard[2][1] = gTarget;
    gBoard[4][1] = gTarget;
    gBoard[6][3] = gTarget;
    gBoard[5][4] = gTarget;
    gBoard[7][4] = gTarget;
    gBoard[3][5] = gTarget;
    gBoard[6][6] = gTarget;
    gBoard[2][4] = gBox;
    gBoard[3][4] = gBox;
    gBoard[6][1] = gBox;
    gBoard[7][3] = gBox;
    gBoard[6][4] = gBox;
    gBoard[4][4] = gBox;

    gBoard[5][7] = gWall;
    gBoard[6][7] = gWall;
    gBoard[7][7] = gWall;
    gBoard[8][7] = gWall;
    gBoard[1][0] = gWall;
    gBoard[2][0] = gWall;
    gBoard[3][0] = gWall;
    gBoard[4][0] = gWall;
    gBoard[5][0] = gWall;
    gBoard[6][0] = gWall;
    gBoard[7][0] = gWall;
    gBoard[8][0] = gWall;
    gBoard[1][1] = gWall;
    gBoard[3][1] = gWall;
    gBoard[8][1] = gWall;
    gBoard[0][2] = gWall;
    gBoard[1][2] = gWall;
    gBoard[3][2] = gWall;
    gBoard[4][2] = gWall;
    gBoard[5][2] = gWall;
    gBoard[8][2] = gWall;
    gBoard[0][3] = gWall;
    gBoard[4][3] = gWall;
    gBoard[8][3] = gWall;
    gBoard[0][4] = gWall;
    gBoard[8][4] = gWall;
    gBoard[0][5] = gWall;
    gBoard[8][5] = gWall;
    gBoard[0][6] = gWall;
    gBoard[1][6] = gWall;
    gBoard[2][6] = gWall;
    gBoard[3][6] = gWall;
    gBoard[4][6] = gWall;
    gBoard[5][6] = gWall;
    gBoard[6][6] = gWall;
    gBoard[8][6] = gWall;

    renderBoard(gBoard);
    console.table(gBoard);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
function createBoard() {
    var board = [];
    for (var i=0; i < COLL_SIZE; i++) {
        board[i] = [];
        for (var j=0; j < ROW_SIZE; j++) {
            board[i][j] = 'floor';
        }
    }
    //board = setChartsToBoard(board);
    return board;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = gBoard[i];
        strHtml += '<tr>';
        for (var j = 0; j < board.length-1; j++) {
            if (gBoard[i][j] === gWall) {
                var wall = row[j];
                var cellContent = gWall;
                var cellTitle = 'Wall';
                var className = 'Wall';
            } 
            if (gBoard[i][j] === gBox) {
                var wall = row[j];
                var cellContent = gBox;
                var cellTitle = 'Box';
                var className = 'Box';
            }
            if (gBoard[i][j] === gMan) {
                var wall = row[j];
                var cellContent = gMan;
                var cellTitle = 'Player';
                var className = 'Player';
            }
            if (gBoard[i][j] === 'floor') {
                var wall = row[j];
                var cellContent = '';
                var cellTitle = 'floor';
                var className = 'floor';
            }
            if (gBoard[i][j] === gTarget) {
                var wall = row[j];
                var cellContent = gTarget;
                var cellTitle = 'target';
                var className = 'target';
            }
            var tdId = 'cell-' + i + '-' + j;
            strHtml += '<td title="' + cellTitle + '"id="' + tdId +'"' +
            'onclick="cellClicked(this,' + i + ',' + j + ')" oncontextmenu="cellFlagged(this,' 
            + i + ',' + j + ')"' +
                'class="' + className + '">' + cellContent +
                '</td>';
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.board');
    elMat.innerHTML = strHtml;
    //gBoard[7][2] = gMan;
    var elgMan = document.querySelector('.Player');
    // elgMan.innerHTML = strHtml;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function cellClicked(i, j) {

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkScore () {
    gSteps++
    var elScore = document.querySelector('.score');
    elScore.innerHTML = gSteps;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function getCellCoord(strCellId) {
    var coord = {};
    coord.i = +strCellId.substring(5, strCellId.lastIndexOf('-'));
    coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
    // console.log('coord', coord);
    return coord;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function movePiece(elToCell) {
    var elFromCell = gSelectedElCell;

    var fromCoord = getCellCoord(elFromCell.id);
    var toCoord = getCellCoord(elToCell.id);
    var piece = gBoard[fromCoord.i][fromCoord.j];

    // Update the Model
    gBoard[fromCoord.i][fromCoord.j] = '';
    gBoard[toCoord.i][toCoord.j] = piece;
    // Update the DOM
    elToCell.innerText = piece;
    elFromCell.innerText = '';
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function isCellFloor(coord) {
    return gBoard[coord.i][coord.j] === 'floor';
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAllPossibleCoordsPlayer (pieceCoord) {

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function getAllPossibleCoordsBox (pieceCoord) {

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkGameOver() {

}