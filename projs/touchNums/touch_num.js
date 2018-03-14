var gCellsNum = 36;
var prevClicked = 0;
var gGameInterval;
var gStartTime;
var gNextNum; 

initGame(gCellsNum);

////////////////////////////////////////////////////////////////////////////////////////////////////////////
function initGame(level) {
    if (!level) level = gCellsNum;
    gCellsNum=level;
    clearInterval(gGameInterval);
    createTable();
    renderNums();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function renderNums() {
    prevClicked = 0;
    gGameInterval = undefined;
    gStartTime = Date.now();
    gNextNum = prevClicked+1;
    document.querySelector('.nextNum').innerHTML = 'The next number: ' + prevClicked+1;
    document.querySelector('.timer').innerHTML = '00:00';

    var tableNums = createTable();
    var elTableNums = document.querySelector('.table-nums');
    var strHtml = '';
    var sqrLength = Math.sqrt(tableNums.length);

    for (var i = 0; i < sqrLength; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < sqrLength; j++) {
            var num = tableNums.pop();
            strHtml += '<td onclick=numClicked(this,' + num + ')>' + num + '</td>';
        }
        strHtml += '</tr>';
    }
    // console.log('strHtml', strHtml);
    elTableNums.innerHTML = strHtml;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function shuffle(items) {
    var j, tempItem, i;
    for (i = items.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tempItem = items[i];
        items[i] = items[j];
        items[j] = tempItem;
    }
    return items;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createTable() {
    var nums = [];
    for (var i = 0; i < gCellsNum; i++) {
        nums.push(i + 1);
    }
    shuffle(nums);
    // console.table(nums);
    return nums;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function numClicked(elTableNums, num) {
    var endtTime;
    var gameTime;
    if (num === (prevClicked + 1)) {
        elTableNums.classList.add('selected');
        prevClicked++
        gNextNum = nextNum(prevClicked);
    }
    if (num === 1) {
        gStartTime = Date.now();
        gGameInterval = setInterval(showTimer, 100);
    }
    if (num === gCellsNum) {
        clearInterval(gGameInterval);
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showTimer() {
    midTime = (Date.now()- gStartTime) / 1000;
    document.querySelector('.timer').innerHTML = midTime ;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function nextNum(num) {
    document.querySelector('.nextNum').innerHTML = 'The next number: ' + (prevClicked+1);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
