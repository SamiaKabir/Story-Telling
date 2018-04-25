var characters = ['Bart', 'Tom', 'Popeye', 'Spongebob', 'Jerry', 'Pikachu'];
var vehicles = ['car', 'bike', 'motorcycle', 'scooter', 'skateboard', 'rollerblades'];
var food = ['chips', 'cookies and milk', 'lemonade', 'rice and curry'];
var places = ['his house', 'Spongebob\'s house'];

function getCharacter() {
    console.log(characters[0]);
}

function getRandArrayElem(array) {
    return array[Math.floor(Math.random()*array.length)];
}

function createGenericSentences() {
    var genericSentences = [];
    var sent1 = getRandArrayElem(characters) + ' thought that this\'d be a great time for some ' + getRandArrayElem(food) + '!';
    genericSentences.push(sent1);
    var sent2 = getRandArrayElem(characters) + ' took his ' + getRandArrayElem(vehicles) + ' and headed to ' + getRandArrayElem(places) + '.';
    genericSentences.push(sent2);
    return genericSentences;
}

function checkWord(line, word) {
    words = line.split(' ');
    for (i = 0; i < words.length; i++) {
        if (words[i] == word) {
            return true;
        }
    }
    return false;
}

function checkCharacter(line) {
    words = line.split(' ');
    for (i = 0; i < words.length; i++) {
        for (j = 0; j < characters.length; j++) {
            if (characters[j] == words[i]) {
                return words[i];
            }
        }
    }
    // All words checked, no character referenced
    return null;
}

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('It was a beautiful sunny day, ' + getRandArrayElem(characters) + ' thought that this was the perfect time to play some basketball.');
rl.on('line', function(line){
    // Local suggestion : Just try to add something relevant
    refChar = checkCharacter(line);
    // {Character} thought that this was the perfect time to play some basketball.
    if (refChar != null) {
        if (checkWord(line, 'basketball')) {
            console.log(refChar + ' thought that this was the perfect time to play some basketball.');
        } else if (checkWord(line, 'cookies') || checkWord(line, 'milk')) {
            console.log(refChar + ' realized that the milk makes the cookies especially yummy.');
        } else if (checkWord(line, 'lemonade')) {
            console.log(refChar + ' felt a sudden surge of energy after drinking the lemonade.');
        }
    }
    // Global suggestion : Goal is to finish a game of basketball, seems really complicated and unlikely to succeed return later
    // Generic Sentences
    else {
        genericSentences = createGenericSentences();
        console.log(getRandArrayElem(genericSentences));
    }
})
