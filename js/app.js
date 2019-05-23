/*
 * Create a list that holds all of your cards
 */
const deckArray = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o",
						 "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt",
						 "fa-cube", "fa-cube", "fa-leaf", "fa-leaf",
						 "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"]

let openCards = [];
let cardClickBlock = false;
let matches = 0;
firstMove = true;
const startTime = Date.now();
let elapsedTime;
let intervalKey;
let movesCount = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function createHtmlDeck(){
    const shuffledDeck = shuffle(deckArray);
    const htmlDeckFragment = buildFragment(shuffledDeck);
    const deckHolderUl = document.querySelector('.deck');
    deckHolderUl.appendChild(htmlDeckFragment);
    deckHolderUl.addEventListener('click', cardClick);
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function buildFragment(shuffledDeck){
    const htmlDeckFragment = document.createDocumentFragment();

    for (card of shuffledDeck){
        const li = document.createElement('li');
        li.classList.add('card');
        const i = document.createElement('i');
        i.classList.add('fa');
        i.classList.add(card);
        li.appendChild(i);
        htmlDeckFragment.appendChild(li);
    }

    return htmlDeckFragment;
}


function cardClick(event){
    const card = event.target;

    if(!card.classList.contains('show') && card.nodeName === 'LI' && !cardClickBlock){
        if(firstMove) {
            firstMove = false;
            startTimer();
        }
        console.log(card);
        flipToFront(card);
        checkForMatch();
    } else {
        //flipToBack(card);
    }
}

function updateMovesCount(){
    const htmlMovesText = document.querySelector('.moves');
    movesCount += 1;
    htmlMovesText.textContent = movesCount;
    
}

function startTimer(){
    const htmlTimeText = document.querySelector('.timer');
    function updateTimer(){
        // https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        htmlTimeText.innerHTML = elapsedTime;
    }
    intervalKey = setInterval(updateTimer, 1000);
}

function resetTimer(){
    clearInterval(intervalKey);
    const htmlTimeText = document.querySelector('.timer');
    htmlTimeText.innerHTML = '0';
}

function flipToFront(card){
    card.classList.add('open', 'show');
    openCards.push(card);
    if(openCards.length == 2){
        cardClickBlock = true;
    }
}

function flipToBack(card){
    card.classList.remove('open', 'show')
}

function markAsMatched(card0, card1){
    card0.classList.add('match');
    card1.classList.add('match');
}

function flipTwo(){
    openCards[0].classList.remove('open', 'show');
    openCards[1].classList.remove('open', 'show');
    openCards = [];
    cardClickBlock = false;
}

function checkForEnd(){
    if(matches === 8){
        resetGame();
        alert('game over');
        resetTimer();s
    }
}

function resetGame(){
    const deckHolderUl = document.querySelector('.deck');
    deckHolderUl.innerHTML = '';
    createHtmlDeck();
    openCards = [];
    matches = 0;
    cardClickBlock = false;
    firstMove = true;
}


function checkForMatch(){
    if(openCards.length === 2){
        updateMovesCount();
        const card0 = openCards[0];
        const card1 = openCards[1];
        const card0ClassList = card0.firstChild.classList[1];
        const card1ClassList = card1.firstChild.classList[1];
        setTimeout(flipTwo, 1000)
        if(card0ClassList === card1ClassList){
            markAsMatched(card0, card1);
            matches += 1;
            checkForEnd();
        }
    } 
}


createHtmlDeck();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
