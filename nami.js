var characters = [['Bart',1],['Marge',0]]
function getCharacter() {
    console.log(characters[0])
}
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', function(line){
    console.log(line);
    getCharacter()
})
