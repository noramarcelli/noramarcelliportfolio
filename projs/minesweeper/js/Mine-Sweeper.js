/* Mine Sweeper 
1. Done - choose Level: 
          beginnerGame
          mediumGame
          expertGame
1.1. Done - Play again - with the same level
2. initGame
2.1 Done - resetGame
3. Done - buildBoard
3.1. Done - setNumtoBoard
4. Done - setMinesNegsCount
5. Done - renderBoard
6. Done - showTimer
6.1. Done - endTimer
7. Done - cellClicked
8. Done - cellFlagged (elCell) - Right click
9. Done - getSelector
9. checkGameOver - check
10.expand
*/

'use strict';

console.log('Mine Sweeper');

var gStartTime;
var gGameInterval;
var prevClicked = 0;
var gSelectedElCell = null;
var gIsMine = false;
var minesSpread = 0;

var gLevel1 = { name: 'Beginner', size: 4, mines: 2 }; // 0.125
var gLevel2 = { name: 'Medium', size: 6, mines: 5 }; // 0.14
var gLevel3 = { name: 'Expert', size: 8, mines: 15 }; // 0.23
var gLevel = [gLevel1, gLevel2, gLevel3];
var level = 2;
var gBombsAtBoard = 0;


var gState = { isGameOn: true, shownCount: 0, flaggedCount: 0, secsPassed: 0 };
var gMine = '💣';
var gFlag = '🚩';
var gBoard;
/////////////////////////////////////////////////////////////////////////////////////////////////
initGame();
/////////////////////////////////////////////////////////////////////////////////////////////////
function beginnerGame() {
    level=0;
    resetGame(0);
}
function mediumGame() {
    level = 1;
    resetGame(level);
}
function expertGame() {
    level = 2;
    resetGame(level);
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function resetGame(level) {
    // debugger
    gBombsAtBoard = 0;
    minesSpread = 0;
    prevClicked = 0;
    stopTimer();
    gGameInterval = undefined;
    gState.isGameOn = true;
    gState.secsPassed = 0;
    gState.flaggedCount = 0;
    gState.shownCount = 0;
    gBoard = buildBoard(level);
    console.table(gBoard);
    renderBoard(gBoard);
    var elFinish = document.querySelector('.lost');
    elFinish.innerText='';
    var elFinish = document.querySelector('.timer');
    elFinish.innerText='000';
    gIsMine = false;
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function initGame() {
    gBoard = buildBoard(level);
    console.table(gBoard);
    renderBoard(gBoard);
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function buildBoard(level) {
    var board = [];
    var boardSize = gLevel[level].size;
    // console.log(boardSize);
    for (var i = 0; i < boardSize; i++) {
        board[i] = [];
        for (var j = 0; j < boardSize; j++) {
            board[i][j] = null;
            var tableCells = Math.pow(boardSize, 2);
            var mineNum = gLevel[level].mines;
            minesSpread = mineNum / tableCells;
            // console.log('tableCells ' + tableCells + ' mineNum: ' + mineNum + ' minesSpread: ' + minesSpread);
            if (Math.random() > (1 - minesSpread)) {
                board[i][j] = gMine;
                gBombsAtBoard++
                // console.log('gBombsAtBoard: ', gBombsAtBoard);
            }
        }
    }
    board = setNumtoBoard(board);
    return board;
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function setNumtoBoard(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var count = setMinesNegsCount(board, i, j);
            if (count === 0 || board[i][j] !== null) continue;
            else {
                board[i][j] = count;
            }
        }
    }
    return board;
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function setMinesNegsCount(board, rowIdx, colIdx) {
    var minesCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (!(i >= 0 && i < board.length)) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if ((i === rowIdx && j === colIdx) ||
                (j < 0 || j >= board[i].length)) continue;
            if (board[i][j] === gMine) minesCount++;
        }
    }
    return minesCount;
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function renderBoard(board) {
    prevClicked = 0;
    gGameInterval = undefined;
    //gStartTime = new Date();
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = gBoard[i];
        strHtml += '<tr>';
        for (var j = 0; j < board.length; j++) {
            var mine = row[j];
            var cellContent = ''
            var cellTitle = 'Cell Empty'
            var className = '';
            var tdId = 'cell-' + i + '-' + j;
            if (board[i][j] === gMine) {
                var cellTitle = 'mine';
                var className = 'mine';
            }
            if (board[i][j] !== gMine && board[i][j] !== null) {
                var cellTitle = 'num';
                var className = 'num num' + board[i][j];
            }
            strHtml += '<td title="' + cellTitle + '"id="' + tdId + '"' +
                'onclick="cellClicked(this,' + i + ',' + j + ')" oncontextmenu="cellFlagged(this,' + i + ',' + j + ')"' +
                'class="' + className + '">' + cellContent +
                '</td>';

        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.board');
    elMat.innerHTML = strHtml;
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function showTimer() {
    gStartTime = new Date;
    var elTimer = document.querySelector('.timer');
    elTimer.innerHTML = '000';

    gGameInterval = setInterval(function () {
        gState.secsPassed = parseInt((new Date() - gStartTime) / 1000);
        elTimer.innerHTML = gState.secsPassed.toString().padStart(3, '0');
    }, 1000);
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function stopTimer() {
    clearInterval(gGameInterval);
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function cellClicked(elCell, i, j) {
    if (elCell.innerText === gFlag) return;
    if (elCell.classList.contains('mark')) return;
    if (!gState.isGameOn) return;
    elCell.classList.add('mark');
    
    prevClicked++
    
    gState.shownCount++
    if (prevClicked === 1) {
        showTimer();
    }
    if (gSelectedElCell) {
        gSelectedElCell.classList.remove('selected');
        gSelectedElCell = null;
    }
    elCell.classList.add('selected'); 
    gSelectedElCell = elCell;
    elCell.innerHTML = gBoard[i][j];
    checkMineClicked(i, j);
    if (gBoard[i][j] === null) {
        expandShown(gBoard, elCell, i, j);
    }

    checkGameOver(level);
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function cellFlagged(elCell, i, j) {
    if (gIsMine) return;
    if (elCell.classList.contains('mark')) return;
    if (elCell.innerText === gFlag) {
        elCell.innerHTML = '';
        gState.shownCount--
        return;
    }
    if (gSelectedElCell) {
        gSelectedElCell.classList.remove('selected');
        gSelectedElCell = null;
    }
    elCell.classList.add('selected');
    
    gSelectedElCell = elCell;
    elCell.innerHTML = gFlag;
    gState.flaggedCount++
    gState.shownCount++
    checkGameOver(level);
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function getSelector(i, j) {
    return '#cell-' + i + '-' + j;
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function checkMineClicked(i, j) {
    if (gBoard[i][j] === gMine) {
        gState.isGameOn = false;
        console.log('You clicked on a mine! Game is over!');
        var elFinish = document.querySelector('.lost');
        elFinish.innerText='Game is Over!';
        var elMines = document.querySelectorAll('.mine');
        gIsMine = true;
        stopTimer();
        var strHtml = '';
        for (var n=0; n < elMines.length; n++) {
            elMines[n].innerText = gMine;
        }
    }
    return gState.isGameOn;
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function checkGameOver(level) {
    var allCells = Math.pow(gLevel[level].size, 2);
    var notMines = allCells - minesSpread;
    // console.log('allCells: ', allCells, 'gState.shownCount: ', gState.shownCount, 'gState.flaggedCount: ', gState.flaggedCount, 'gBombsAtBoard:', gBombsAtBoard);
    // console.log('gIsMine: ', gIsMine)
    if (gState.shownCount === allCells && !gIsMine && gState.flaggedCount === gBombsAtBoard) {
        stopTimer();
        console.log('You Won!');
        var elFinish = document.querySelector('.win');
        elFinish.innerText='You Won!';
        gState.isGameOn = false;
    }
    return gState.isGameOn;
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function expandShown(board, elCell, rowIdx, colIdx) {

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (!(i >= 0 && i < board.length)) continue;
        
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
           // if (i === rowIdx && j === colIdx) gState.shownCount--;
            if (j < 0 || j >= board[i].length) continue;
            var selector = getSelector(i, j);
            var elCurrCell = document.querySelector(selector);
            if (board[i][j] !== gMine && !elCurrCell.classList.contains('mark')) { 
                elCurrCell.classList.add('mark');
                elCurrCell.innerHTML = gBoard[i][j];
                gState.shownCount++;
                if (!elCurrCell.classList.contains('num')) {
                    expandShown(board, elCurrCell, i, j);
                }
            }
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
