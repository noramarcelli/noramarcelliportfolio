
var gBoard = createChessBoard();
var gSelectedCell = null;

console.table(gBoard);
renderBoard(gBoard);


function createChessBoard() {
    var board = [];
    for (var i = 0; i < 8; i++) {
        board[i] = [];
        for (var j = 0; j < 8; j++) {
            board[i][j] = ''
        }
    }
    board[1][2] = '♙';
    board[3][4] = '♙';
    board[6][4] = '♟';
    board[3][2] = '♟';
    board[7][7] = '♜';
    board[2][4] = '♖';
    board[6][2] = '♞';
    board[2][3] = '♞';

    return board;
}

function renderBoard(board) {
    var elBoard = document.querySelector('.board');
    var strHtml = '';
    var isLight = true;

    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < board[0].length; j++) {

            var cellClass = (isLight) ? 'light' : 'dark'
            cellClass += ' cell-' + i + '-' + j;
            isLight = !isLight;

            strHtml += '<td onclick="cellClicked(this, ' + i + ',' + j + ')" class="' + cellClass + '">'
            strHtml += board[i][j];
            strHtml += '</td>'
        }
        isLight = !isLight;
        strHtml += '</tr>\n';
    }

    // console.log(strHtml);
    elBoard.innerHTML = strHtml;
}

function cellClicked(elCell, cellI, cellJ) {
    if (gSelectedCell) {
        gSelectedCell.classList.remove('selected');
        gSelectedCell = null;
        var eLMarkedCells = document.querySelectorAll('.mark');
        for (var i = 0; i < eLMarkedCells.length; i++) {
            eLMarkedCells[i].classList.remove('mark');
        }
    }
    elCell.classList.add('selected');
    gSelectedCell = elCell;
    var piece = elCell.innerHTML;
    switch (piece) {
        case '♟':
            markCellsForPawn(cellI, cellJ, true);
            break;
        case '♜':
            markCellsForRook(cellI, cellJ, true);
            break;
        case '♙':
            markCellsForPawn(cellI, cellJ, false);
            break;
        case '♞':
            markCellsForKnight(cellI, cellJ);
            break;
        case '♖':
            markCellsForRook(cellI, cellJ, false);
            break;
    }
}

function markCellsForPawn(cellI, cellJ, isBlack) {
    console.log('Pawn In:', cellI, cellJ);
    if (isBlack) {
        var selector = '.cell-' + (cellI - 1) + '-' + cellJ
        var elCell = document.querySelector(selector);
        elCell.classList.add('mark');
        if (cellI === 6) {
            selector = '.cell-' + (cellI - 2) + '-' + cellJ
            elCell = document.querySelector(selector);
            elCell.classList.add('mark');
        }
        console.log(elCell);
    } else {
        var selector = '.cell-' + (cellI + 1) + '-' + cellJ
        var elCell = document.querySelector(selector);
        elCell.classList.add('mark');
        if (cellI === 1) {
            selector = '.cell-' + (cellI + 2) + '-' + cellJ
            elCell = document.querySelector(selector);
            elCell.classList.add('mark');
        }
        console.log(elCell);
    }
}

function markCellsForRook(cellI, cellJ) {
    console.log('Rook In:', cellI, cellJ);
    moveRookDown(cellI, cellJ);
    moveRookUp(cellI, cellJ);
    moveRookLeft(cellI, cellJ);
    moveRookRight(cellI, cellJ);
}

function moveRookDown(cellI, cellJ) {
    for (var i = cellI + 1; i < gBoard.length; i++) {
        if (gBoard[i][cellJ]) break;
        var selector = '.cell-' + i + '-' + cellJ
        var elCell = document.querySelector(selector);
        elCell.classList.add('mark');
    }
}
function moveRookUp(cellI, cellJ) {
    for (var i = cellI - 1; i >= 0; i--) {
        if (gBoard[i][cellJ]) break;
        var selector = '.cell-' + i + '-' + cellJ;
        var elCell = document.querySelector(selector);
        elCell.classList.add('mark');
    }
}
function moveRookLeft(cellI, cellJ) {
    for (var j = cellJ - 1; j >= 0; j--) {
        if (gBoard[cellI][j]) break;
        var selector = '.cell-' + cellI + '-' + j;
        var elCell = document.querySelector(selector);
        elCell.classList.add('mark');
    }
}
function moveRookRight(cellI, cellJ) {
    for (var j = cellJ + 1; j < gBoard.length; j++) {
        if (gBoard[cellI][j]) break;
        var selector = '.cell-' + cellI + '-' + j;
        var elCell = document.querySelector(selector);
        elCell.classList.add('mark');
    }
}

function markCellsForKnight(cellI,cellJ) {
    console.log('Knight In:', cellI, cellJ);
    for (var i = cellI-2; i <= cellI+2; i++) {
        for (var j = cellJ-2; j <= cellJ+2; j++) {
            var selector = '.cell-' + i + '-' + j;
            var elCell = document.querySelector(selector);
            if (elCell) {
                if ((Math.abs(cellI-i) + (Math.abs(cellJ-j))) === 3) {
                    elCell.classList.add('mark');
                }
            }
        }
    }
}

dqs