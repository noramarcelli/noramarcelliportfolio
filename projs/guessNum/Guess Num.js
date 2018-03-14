function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randomNum = getRandomInteger(1,5);

function GuessNum() {
    var num = +prompt("Guess a num!");  
    displayGuess(num);
}

function displayGuess(num) {
    var elHint = document.querySelector('.hint');
    if (num < randomNum) {
        elHint.innerHTML = 'You guessed: ' + num + ' , too high!';
        console.log ('num', num, '<' , 'randomNum', randomNum);
    } else if (num > randomNum) {
        elHint.innerHTML = 'You guessed: ' + num + ' , too low!';
    } else if (num === randomNum) {
        elHint.innerHTML = 'Good guess!!';
    }
}