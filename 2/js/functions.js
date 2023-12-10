function checkPalindrome(stroke) {
  let noSpacedStroke = '';

  stroke = stroke.toLowerCase();

  for(let i = 0; i < stroke.length; i++) {
    if(stroke[i] !== ' ') {
      noSpacedStroke += stroke[i];
    }
  }

  stroke = noSpacedStroke.split('').reverse().join('');

  if(stroke === noSpacedStroke) {
    return true;
  }

  return false;
}

checkPalindrome('топот'); // true
checkPalindrome('ДовОд'); // true
checkPalindrome('Кекс'); // false
checkPalindrome('       Лё ша на полке клОПа    нашёл '); // true

function getNumbers(stroke) {
  let numberedStroke = '';
  let number;
  stroke = String(stroke);

  for(let i = 0; i < stroke.length; i++) {
    if(stroke[i] !== ' ') {
      if(!isNaN(Number(stroke[i]))) {
        numberedStroke += stroke[i];
      }
    }
  }

  if(numberedStroke !== '') {
    number = Number(numberedStroke);
    return number;
  }

  return NaN;
}

getNumbers('2023 год'); // 2023
getNumbers('ECMAScript 2022'); // 2022
getNumbers('агент 007'); // 7
getNumbers(2023); // 2023
getNumbers(-1); // 1
getNumbers(1.5); // 15
getNumbers('1 кефир, 0.5 батона'); // 105
getNumbers('а я томат'); // NaN

function addSymbols(stroke, minLength, addingStroke) {
  if(stroke.length <= minLength) {
    let newStroke;
    const addingSymbolsNumber = minLength - stroke.length;
    const intPartOfStroke = Math.floor(addingSymbolsNumber / addingStroke.length);
    const restOfStroke = addingSymbolsNumber % addingStroke.length;
    let totalAddingStroke = '';

    for(let i = 0; i < intPartOfStroke; i++) {
      totalAddingStroke += addingStroke;
    }

    newStroke = totalAddingStroke + stroke;
    totalAddingStroke = '';

    for(let i = 0; i < restOfStroke; i++) {
      totalAddingStroke += addingStroke[i];
    }

    newStroke = totalAddingStroke + newStroke;
    return newStroke;
  }

  return stroke;
}

addSymbols('1', 2, '0'); // '01'
addSymbols('1', 4, '0'); // '0001'
addSymbols('q', 4, 'werty'); // 'werq'
addSymbols('q', 4, 'we'); // 'wweq'
addSymbols('qwerty', 4, '0'); // 'qwerty'

function checkStrokeLenght(stroke, maxLenght) {
  if(stroke.length <= maxLenght) {
    return true;
  }

  return false;
}

checkStrokeLenght('проверяемая строка', 20); // true
checkStrokeLenght('проверяемая строка', 18); // true
checkStrokeLenght('проверяемая строка', 10); // false
