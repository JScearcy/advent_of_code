var fs = require('fs');

fs.readFile("./dayTwoInput.txt", function(err,data) {
  var totalNeededPaper = 0,
      totalRibbonNeeded = 0;
  data = data.toString().split(/\r?\n|\r/g);
  data.pop();

  var paperData = data
          .map(splitDimensions)
          .map(squareFootage);

  var ribbonData = data
          .map(splitDimensions)
          .map(ribbonFootage);

  console.log("Total Paper = ", totalNeededPaper);
  console.log("Total Ribbon = ", totalRibbonNeeded);

  function splitDimensions(dimensions) {
    dimensions = dimensions.split(/x/);
    dimensions = dimensions.map(toInt);
    return dimensions;
  }

  function toInt(oneDimension) {
    return parseInt(oneDimension)
  }

  function squareFootage(dimensions) {
    var
      lengthByWidth = dimensions[0] * dimensions[1],
      widthByHeight = dimensions[1] * dimensions[2],
      heightByLength = dimensions[2] * dimensions[0],
      squareFootageDimension =  2 * lengthByWidth +  2 * widthByHeight + 2 * heightByLength;
      sideFootage = [lengthByWidth, widthByHeight, heightByLength];
    squareFootageDimension += smallestSide(sideFootage);

    totalNeededPaper += squareFootageDimension;
    return squareFootageDimension;
  }

  function smallestSide(dimensions) {
      Array.min = function(array) {
        return Math.min.apply(Math,array);
      };
      return Array.min(dimensions);
  }

  function ribbonFootage(dimensions) {
      var bowLength = 1,
          firstSmallestSide = 0,
          secondSmallestSide = 0,
          ribbonWrapLength = 0,
          totalRibbon = 0;

      dimensions.forEach(function(dimension){
        bowLength *= dimension;
      });

      firstSmallestSide = Array.min(dimensions);
      dimensions.splice(dimensions.indexOf(firstSmallestSide), 1);

      secondSmallestSide = Array.min(dimensions);
      ribbonWrapLength = firstSmallestSide * 2 + secondSmallestSide * 2;

      totalRibbon = ribbonWrapLength + bowLength;

      totalRibbonNeeded += totalRibbon;
      return ribbonWrapLength + bowLength;
  }

})
