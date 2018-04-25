const inq = require("inquirer");
const colors = require("colors");
const wordArr = require('./wordArr.js');
const Word = require('./word.js');

const guessPrompt = {
    type: 'input',
    name: 'letter',
    message: "Guess a letter:",
    validate: function(name) {
        let test = name.toLowerCase();
        if(test == "exit") {
            return true;
        }
        //make sure entry is one letter and a-z
        if(test.length == 1 && test.charCodeAt(0) >= 97 && test.charCodeAt(0) <= 122) {
            //make sure letter isn't already guessed
            if(guessesArr.indexOf(test) > -1) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
}

let currentWord;
let guessesLeft;
let guessesArr;
let wrongGuesses;

function newWord () {
    let index = Math.floor(Math.random() * wordArr.length)
    return new Word(wordArr[index]);
}
/*
let test = newWord();

console.log(test);
console.log(test.showWord());
let x = test.guessLetter("e");
console.log(test.showWord());
x = test.guessLetter("a");
console.log(test.showWord());
*/

function runLetter(guess) {
    let char = guess.toLowerCase();
    let changed = currentWord.guessLetter(char);
    if(changed == 0) {
        guessesLeft--;
        wrongGuesses.push(char);
    }
    guessesArr.push(char);
}

function askForLetter () {
    inq.prompt(guessPrompt).then(function(answer){
        if(answer.letter == 'exit') {
            console.log("\nGiving up?".magenta);
            console.log("Answer: " + colors.bgWhite.black(" " + currentWord.answer + " ") + '\n');
            return mainMenu();
        } else {
            runLetter(answer.letter);
            gameLogic();
        }
    });
}

function gameLogic() {
    let remainingLetters = 0;
    for(let i = 0; i < currentWord.letters.length; i++) {
        if(!currentWord.letters[i].guessed){
            remainingLetters++;
        }
    }
    if(remainingLetters > 0 && guessesLeft > 0) {
        printGameBoard();
        askForLetter();
    } else if (remainingLetters == 0 && guessesLeft > 0) {
        printGameBoard();        
        console.log("\n*~~~~YOU WIN!~~~~*\n".rainbow);
        mainMenu();
    } else {
        console.log("\n>>>>--YOU LOSE--<<<<\n".magenta);
        console.log("The word was: ", colors.bgWhite.black(currentWord.answer) + '\n');
        mainMenu();
    }
}

function newGame() {
    guessesArr = [];
    wrongGuesses = [];
    guessesLeft = 10;
    currentWord = newWord();
    printGameBoard();
    askForLetter();    
}

function printGameBoard() {
    if(guessesLeft >= 7) {
        console.log('\n' + currentWord.showWord() .bold.green);
        console.log(colors.grey("Wrong Guesses: " + wrongGuesses));
        console.log("Remaining Guesses: " .cyan + colors.green(guessesLeft) + '\n');
    } else if(guessesLeft < 7 && guessesLeft > 3) {
        console.log('\n' + currentWord.showWord() .bold.yellow);
        console.log(colors.grey("Wrong Guesses: " + wrongGuesses));        
        console.log("Remaining Guesses: " .cyan, colors.yellow(guessesLeft) + '\n');
    } else {
        console.log('\n' + currentWord.showWord() .bold.red);
        console.log(colors.grey("Wrong Guesses: " + wrongGuesses));        
        console.log("Remaining Guesses: " .cyan, colors.red(guessesLeft) + '\n');
    }
}

function mainMenu() {
    inq.prompt([
        {
            type: 'list',
            message: 'Welcome to Hangman!',
            name: 'choice',
            choices: ["Play", "Instructions", "Credits", "Exit"]
        }
    ]).then(function(answer){
        switch(answer.choice) {
            case 'Play':
                return newGame();
            break;
            case 'Instructions':
                console.log("\nTo play, use keyboard to guess letters of current word. \nType 'exit' as a guess to quit to main menu\n");
                return mainMenu();
            break;
            case 'Credits':
                console.log("\nMade by " + colors.rainbow("Lee Warrick.\n") + "\nThanks for Playing!\n");
                return mainMenu();
            break;
            default:
                return;
            break;
        }

    });
}

mainMenu();