function findZeroes(message, howManyZeroes) {
  saltFinderVars = new saltFinderCtor(message);

  while(!saltFinderVars.saltFound) {
    saltFinderVars.hashedMessage = hashAMessage(saltFinderVars.unHashedMessage);
    saltFinderVars.saltFound = checkHashForSomeZeroes(saltFinderVars.hashedMessage, howManyZeroes);
    if(!saltFinderVars.saltFound) {
      saltFinderVars.salt++;
      saltFinderVars.unHashedMessage = message + saltFinderVars.salt;
    }
  }
  return "Santa's AdventCoin salt was " + saltFinderVars.salt + " for " + howManyZeroes + " zeroes";
}

function saltFinderCtor(message) {
  this.saltFound = false;
  this.salt = 0;
  this.unhashedMessage = message + this.salt;
  this.hashedMessage = '';
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
