findFiveZeroes('iwrupvqb');

function findFiveZeroes(message) {
  importScripts('./cryptojs.js');
  var
    saltFound = false,
    salt = 0,
    unHashedMessage = message + salt,
    hashedMessage = '';
  while(!saltFound) {
    hashedMessage = hashAMessage(unHashedMessage);
    saltFound = checkHashForSomeZeroes(hashedMessage, 5);
    if(!saltFound) {
      salt++;
      unHashedMessage = message + salt;
    }
  }
  postMessage("Santa's AdventCoin salt was " + salt + " for five zeroes");
}

function checkHashForSomeZeroes(localHashedMessage, checkForThisManyZeroes) {
  var zeroCount = 0;
  localHashedMessage = localHashedMessage.split('');
  for(var i = 0; i < checkForThisManyZeroes; i++) {
    if(localHashedMessage[i] == 0) {
      zeroCount++
    }
  }
  return zeroCount >= checkForThisManyZeroes;
}

function hashAMessage(hashMessage) {
  return CryptoJS.MD5(hashMessage).toString();
}
