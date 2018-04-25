const Letter = require('./letters.js');

function Word (str) {
    this.answer = str;
    this.letters = [];
    let arr = str.split("");
    for(let i = 0; i < arr.length; i++) {
        let char = new Letter(arr[i]);
        this.letters.push(char);
    }
}

Word.prototype.showWord = function() {
    let str = "";
    for(let i = 0; i < this.letters.length; i++) {
        if(i < this.letters.length - 1) {
            str += this.letters[i].show() + ' ';
        } else {
            str += this.letters[i].show();            
        }
    }
    return str;
}

Word.prototype.guessLetter = function(char) {
    let changed = 0;
    for(let i = 0; i < this.letters.length; i++) {
        changed += this.letters[i].guess(char);
    }
    return changed;
}

module.exports = Word;