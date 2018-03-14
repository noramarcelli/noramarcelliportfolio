'use strict';
var NOTES;
var gState;
var gScore = 0;

function init() {
    // var existingUser = JSON.parse(localStorage.getItem('user')) 
    // if (!existingUser) {
    //     var name = prompt('Whats your name?');
    //     var user = {name: name, balanace: 90}
    //     localStorage.setItem('user', JSON.stringify(user));
    // } else {
    //     alert('Welcome ' + existingUser.name);
    // }
    gState = {
        isUserTurn : false,
        seqNoteIndexes: [],
        currNoteIndexToClick: 0
    }
    NOTES = createNotes(3);
    renderNotes(NOTES);
    doComputerMove();
}

function doComputerMove() {
    tellUser('Computer Move...');
    addRandomNote();
    playSeq();
}
// Create the Notes model
function createNotes(size){
    var notes = [];
    for (var i = 0; i < size; i++) {
       var audioFileName = 'sound/Note' + (i+1) + '.mp3'; 
       var note = {sound : new Audio(audioFileName), color: getRandomColor()};
       notes.push(note);
    }
    return notes;
}

function renderNotes(notes) {
    // mapping notes to html tags
    var strHtmls = notes.map(function(note, i){
        var strHtml =  '<div class="note" onclick="noteClicked(this, ' + i + ')" ' + 
                             'style="background:'+ note.color +'">' + 
                        '</div>';
        return strHtml;
    });
    var elPiano = document.querySelector('.piano');
    elPiano.innerHTML = strHtmls.join('');
}

function addRandomNote() {
    var randNoteIndex = getRandomIntInclusive(0, NOTES.length-1);
    gState.seqNoteIndexes.push(randNoteIndex);
}

function playSeq() {
    var elNotes = document.querySelectorAll('.note');
    gState.seqNoteIndexes.forEach(function (seqNoteIndex, i) {
        setTimeout(function playNote() {
            elNotes[seqNoteIndex].classList.add('playing');
            NOTES[seqNoteIndex].sound.play();
            setTimeout(function () {
                elNotes[seqNoteIndex].classList.remove('playing');
            }, 500);
            // console.log('Playing: ', NOTES[seqNoteIndex].sound);
        }, 1200 * i);
    });
    
    // When done playing the seq - change turns
    setTimeout(function () {
        // console.log('Done Playing!!');
        gState.isUserTurn = true;
        tellUser('Your move!');
    }, 1000 * gState.seqNoteIndexes.length + 1000);
}

function noteClicked(elNote, noteIndex) {
    if (!gState.isUserTurn) return;
    elNote.classList.add('clicked');
    NOTES[noteIndex].sound.play();
    setTimeout(function(){
        elNote.classList.remove('clicked');
    }, 500);
    // User clicked the right note?
    if (noteIndex === gState.seqNoteIndexes[gState.currNoteIndexToClick]) {
        // console.log('User OK!');
        gState.currNoteIndexToClick++;
        if (gState.currNoteIndexToClick === gState.seqNoteIndexes.length) {
            // console.log('User done playing seq!');
            tellUser('Good one!', 1000);
            gScore++
            var bestScore = getFromStorage('bestScore');
            if (gScore > bestScore) {
                saveToStorage('bestScore', gScore);
                console.log ('Big WOOOOOOOOOOOOOOW');
            }
            gState.isUserTurn = false;
            gState.currNoteIndexToClick = 0;
            setTimeout(doComputerMove, 2000);
        }
    } else {
        tellUser('You suck!', 1000);
        setTimeout(init, 1000);
        }
    // console.log('Note', NOTES[noteIndex]);
}


function tellUser(msg, dismissAfter) {
    var elUserMsg = document.querySelector('.userMsg');
    elUserMsg.innerHTML = msg;
    if (dismissAfter) {
        setTimeout(function(){
            elUserMsg.innerHTML = '';
        }, dismissAfter);
    }
}
