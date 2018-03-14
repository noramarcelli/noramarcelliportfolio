console.log('In the picture');

var gQuests = [
    { id: 1, opts: ['There are 5 pillows in the room', 'There are 4 pillows in the room'], correctOptIndex: 0, pic: 3 },
    { id: 2, opts: ['There are 7 pillows in the room', 'There are 6 pillows in the room'], correctOptIndex: 1, pic: 2 },
    { id: 3, opts: ['There are 17 pillows in the room', 'There are 15 pillows in the room'], correctOptIndex: 0, pic: 1 },
];
var currQuest = 0;
var gScore;
// var gTime_To_Next = 1800; 
// var gTime_Game_Over = 4500; 

// initGame();
//////////////////////////////////////////////////////////////////////////////////////////
function initGame() {
    // resetGame();
    // currQuest = 0;
    gScore = 100;
    renderQuest();
}
//////////////////////////////////////////////////////////////////////////////////////////
function createNextQuestion() {
}
//////////////////////////////////////////////////////////////////////////////////////////
function renderQuest() {
    var elPicture = document.querySelector('.main-picture');
    elPicture.src = './img/' + (currQuest+1) + '.jpg';
    
    var elAnswers = document.querySelectorAll('.button');
    for (var i=0; i < elAnswers.length; i++) {    
        elAnswers[i].innerHTML = gQuests[currQuest].opts[i];
    }
    
}
//////////////////////////////////////////////////////////////////////////////////////////
function checkAnswer(elQuest, optIndx) {
    console.log('currQuest: ', currQuest);

    if (currQuest === gQuests.length) return; 
    if (optIndx === gQuests[currQuest].correctOptIndex) {
        currQuest++
        renderQuest();
        console.log('currQuest: ', currQuest);
    } else {
        elQuest.classList.add('wrong');
        setTimeout(function () { elQuest.classList.remove('wrong'); }, 1000);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////
function renderScore() {
    var elScore = classList.add('score');
    elScore.innerHTML = gScore;
}