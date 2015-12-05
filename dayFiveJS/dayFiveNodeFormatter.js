var fs = require('fs');

fs.readFile('./dayFiveInput.txt', function(err, data){
  var
    niceStringsOne = 0,
    niceStringsTwo = 0;
  dataAsArray = data.toString().split(/\r?\n|\r/g);
  dataAsArray.forEach(function(oneString) {
    if(checkForNiceOne(oneString)) {
      niceStringsOne++;
    }
    if(checkForNiceTwo(oneString)) {
      niceStringsTwo++
    }
  });
  console.log("One: ", niceStringsOne);
  console.log("Two: ", niceStringsTwo);
});

function checkForNiceOne(checkThisString) {
  var
    vowelCount = 0,
    twoLettersInARow = false;

  checkThisString.split('').forEach(function(letter) {
      if(checkForVowel(letter)) {
        vowelCount++;
      }
  });
  return vowelCount >= 3 && !checkNotBadLetterCombo(checkThisString) && checkForTwoInARow(checkThisString);
}

function checkForNiceTwo(checkThisString) {
  var
    checkForRepeatedPair = /(..).*(\1)/,
    checkForSameAfterOneLetter = /(.).\1/;
  return checkForRepeatedPair.exec(checkThisString) && checkForSameAfterOneLetter.exec(checkThisString);
}

function checkForVowel(letter) {
  var vowels = /a|e|i|o|u/;
  return vowels.exec(letter);
}

function checkNotBadLetterCombo(singleString) {
  var badString = /ab|cd|pq|xy/;
  return badString.exec(singleString);
}

function checkForTwoInARow(singleString) {
  var twoInARow = /(.)\1/;
  return twoInARow.exec(singleString);
}
