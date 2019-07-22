/* eslint-disable complexity */

document.getElementById('');

// shuffle function takes an array as an argument, and returns an array;
//     an array using Math.random to place elements
function shuffle(array) {
    /** 
     * Fisher-Yates algorithm: Randomly shuffle an array
     * https://stackoverflow.com/a/2450976/1293256
     * @param  {Array} array The array to shuffle
     * @return {String}      The first item in the shuffled array
     */
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// generateWinningNumber returns a random number between 1 and 100
function generateWinningNumber() { return Math.ceil(Math.random() * 100); }

class Game {
    // should have a playersGuess property, and a pastGuesses property
    // should have a winningNumber property, which calls generateWinningNumber
    constructor() {
        this.playersGuess = null;
        this.pastGuesses = []
        this.winningNumber = generateWinningNumber();
    }
    // literals for use in the game
    MAX_GUESSES = 5;
    YOU_WIN_MSG = `You Win!`;
    YOU_ALREADY_WON = `You Already Won!`;
    ALREADY_GUESSED = `You have already guessed that number.`;
    YOU_LOSE = `You Lose.`;
    BURNING_UP = `You're burning up!`;
    LUKE_WARM = `You're lukewarm.`;
    CHILLY = `You're a bit chilly.`;
    ICE_COLD = `You're ice cold!`;

    // method difference returns the absolute value of the difference between
    //  the playersGuess and winningNumber
    difference() {
        return Math.abs(this.playersGuess - this.winningNumber);
    }
    // isLower function returns true if the playersGuess is lower than winningNumber,
    //  and false if not.
    isLower() {
        return this.playersGuess < this.winningNumber;
    }
    // playersGuessSubmission function
    //  takes a number as an argument and sets that as playersGuess
    //  throws an error if the number is invalid (less than 1, greater than 100, or not a number)
    //  calls checkGuess
    playersGuessSubmission(num) {
        // correct way to handle it: https://eslint.org/docs/rules/no-throw-literal
        if (typeof num !== 'number' || num < 1 || num > 100) throw 'That is an invalid guess.';
        this.playersGuess = num;
        // this.pastGuesses.push(num); // need this logic AFTER checked for winning
        return this.checkGuess(num);
    }
    // checkGuess function returns a string
    //The last spec specifies that playersGuessSubmission should call checkGuess
    //playersGuessSubmission should also return that call, so that the return value
    //of playersGuessSubmissions is the return value of checkGuess.
    checkGuess(num) {
        // check to see if the player has already won
        if (this.pastGuesses.includes(this.winningNumber)) return this.YOU_ALREADY_WON;
        // returns "You Lose" if this is the players 5th guess
        if (this.pastGuesses.length >= this.MAX_GUESSES) return this.YOU_LOSE;
        // returns "You have already guessed that number." if playersGuess is in pastGuesses
        if (this.pastGuesses.includes(num)) return this.ALREADY_GUESSED;
        // if playersGuess isn't the winningNumber or a duplicate or lost, add it to pastGuesses
        this.pastGuesses.push(num); 
        // returns "You Win!" if playersGuess equals winningNumber
        if (num === this.winningNumber) return this.YOU_WIN_MSG;
        // THIS IS BEGGING FOR A SWITCH-CASE IN MY HEAD, BUT INEFFICIENT
        const difference = Math.abs(this.winningNumber - num);
        // returns "You're burning up!" if the difference between playersGuess and winningGuess is less than 10
        if (difference < 10) return this.BURNING_UP;
        // returns "You're lukewarm." if the difference between playersGuess and winningGuess is less than 25
        if (difference < 25) return this.LUKE_WARM;
        // returns "You're a bit chilly." if the difference between playersGuess and winningGuess is less than 50
        if (difference < 50) return this.CHILLY;
        // returns "You're ice cold!" if the difference between playersGuess and winningGuess is less than 100
        return this.ICE_COLD;
    }
    // provideHint function generates an array with a length of 3
    //     includes the winningNumber
    //     calls generateWinningNumber to fill the rest of the hint array with random numbers
    //     calls the shuffle function
    provideHint() {
        const a = generateWinningNumber();
        const b = generateWinningNumber();
        return shuffle([a, b, this.winningNumber]);
    }
    // If the number submitted is the winning number, the player
    //  wins! Otherwise, they are allowed to try again.
    checkInput(inputElement) {
        const num = inputElement;
        console.log('secNum:', this.winningNumber, ' guess:', num);
    }
}
//-----------------------------------------------------------------------------
// newGame function returns an empty, new game instance
function newGame() {
    const aGame = new Game();
    return aGame;
}

function playGuessingGame() {
    let game = newGame();
    //debugger;
    // The player inputs their guess in a text input field and then
    //  submits their guess.
    const submitGuessButton = document.getElementById('submit-guess-button');
    submitGuessButton.addEventListener('click', function() {
        console.log('in addEventListener')
        // pass a selector based on a single input (versus querySelectorAll()) 
        const guess = Number(document.querySelector('input').value);
        console.log(typeof guess, guess);
        //const gameMessage = game.checkGuess(guess);
        const gameMessage = game.playersGuessSubmission(guess);
        console.log('msg:', gameMessage, ' winning:', game.winningNumber, ' guesses:', game.pastGuesses);
        // reset the input field
        document.querySelector('input').value = '';
        // set messages
        document.querySelector('#guess-message > h2').innerHTML = gameMessage;
        document.querySelector(`#guess-list li:nth-child(${game.pastGuesses.length})`).innerHTML = game.playersGuess;

        const resetButton = document.getElementById('reset-button');
        resetButton.addEventListener('click', function() {
            console.log('RESET!!!!!!');
            document.querySelector('#guess-message > h2').innerHTML = 'Game Over!';
            game = newGame();
        });
    }); 
}

// run the guessing game!
playGuessingGame();


// A version using jQuery
//   https://github.com/blakez08/GuessingGame/blob/master/GuessingGame.js
