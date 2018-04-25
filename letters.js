function Letter(char) {
    this.char = char;
    this.guessed = false;
}

Letter.prototype.show = function () {
    if(this.guessed) {
        return this.char;
    } else {
        return "_";
    }
}

Letter.prototype.guess = function (char) {
    if(char == this.char) {
        this.guessed = true;
        return 1;
    } else {
        return 0;
    }
}

module.exports = Letter;