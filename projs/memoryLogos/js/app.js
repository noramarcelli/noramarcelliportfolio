// Those are global variables, they stay alive and reflect the state of the game
var elPreviousCard = null;
var flippedCouplesCount = 0;

// This is a constant that we dont change during the game (we mark those with CAPITAL letters)
var TOTAL_COUPLES_COUNT = 12;

// Load an audio file
var audioWin = new Audio('sound/win.mp3');

var gCards = getNumsForCards();
var gCompNames = [ 
                        {idx: 1, compName: 'Node'},
                        {idx: 2, compName: 'FireFox'},
                        {idx: 3, compName: 'Opera'},
                        {idx: 4, compName: 'Web Pack'},
                        {idx: 5, compName: 'Angular'},
                        {idx: 6, compName: 'React'},
                        {idx: 7, compName: 'View'},
                        {idx: 8, compName: 'java'},
                        {idx: 9, compName: 'mongodb'},
                        {idx: 10, compName: 'node package'},
                        {idx: 11, compName: 'Safari'},
                        {idx: 12, compName: 'VS code'}
                     ];

console.log(gCards)
render(gCards);

function render(cards) {
    var strHtmls = getCardsHtml(cards)
    document.querySelector('.board').innerHTML = strHtmls
}
function getCardsHtml (cards){
    // var strHtmls = card.map (function(card) {
    //     the whole function
    //     and return srtrHtmls.join('');
    // } //same with map function
    strHtml = ''
    cards.forEach(function(card){
        strHtml += `
        <div class="card-wrapper">
            <div class="card" data-card="${card}" onclick="cardClicked(this)">
               <img src="img/cards/back.png" >
                <div class="back"> 
                    <img src="img/cards/${card}.png" >
                    <p> ${gCompNames[card-1].compName} </p>
               </div>
            </div>
        </div>        
        `
    });
    return strHtml
}

// This function is called whenever the user click a card
function cardClicked(elCard) {
    // If the user clicked an already flipped card - do nothing and return from the function
    if (elCard.classList.contains('flipped')) {
        return;
    }
    // Flip it
    elCard.classList.add('flipped');
    // This is a first card, only keep it in the global variable
    if (elPreviousCard === null) {
        elPreviousCard = elCard;
    } else {
        // get the data-card attribute's value from both cards
        var card1 = elPreviousCard.getAttribute('data-card');
        var card2 = elCard.getAttribute('data-card');

        // No match, schedule to flip them back in 1 second
        if (card1 !== card2) {
            setTimeout(function () {
                elCard.classList.remove('flipped');
                elPreviousCard.classList.remove('flipped');
                elPreviousCard = null;
            }, 1000)

        } else {
            // Yes! a match!
            flippedCouplesCount++;
            elPreviousCard = null;
            // All cards flipped!
            if (TOTAL_COUPLES_COUNT === flippedCouplesCount) {
                audioWin.play();
            }
        }
    }
}

function getNumsForCards() {
    return getNums(12)
          .concat(getNums(12))
}

function getNums(size){
    var nums = [];
    for (var i = 0; i < size; i++){
        nums.push(i + 1)
    }
    return nums
}