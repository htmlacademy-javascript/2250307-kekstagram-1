function checkPalindrome(string) {
  let formattedString = string.toLowerCase();
  const noSpacedString = formattedString.replaceAll(' ', '');

  formattedString = noSpacedString.split('').reverse().join('');

  return formattedString === noSpacedString;
}

checkPalindrome('топот'); // true
checkPalindrome('ДовОд'); // true
checkPalindrome('Кекс'); // false
checkPalindrome('       Лё ша на полке клОПа    нашёл '); // true

function getNumbers(string) {
  let numberedString = '';
  string = String(string);

  for (let i = 0; i < string.length; i++) {
    if (!isNaN(Number(string[i]))) {
      numberedString += string[i];
    }
  }

  numberedString = numberedString.replaceAll(' ', '');

  if (numberedString !== '') {
    return Number(numberedString);
  }

  return NaN;
}

getNumbers('      2    02 3 год'); // 2023
getNumbers('ECMAScript 2022'); // 2022
getNumbers('агент 007'); // 7
getNumbers(2023); // 2023
getNumbers(-1); // 1
getNumbers(1.5); // 15
getNumbers('1 кефир, 0.5 батона'); // 105
getNumbers('а я томат'); // NaN

function addSymbols(string, minLength, addingString) {
  if (string.length <= minLength) {
    let newString;
    const addingSymbolsNumber = minLength - string.length;
    const intPartOfString = Math.floor(addingSymbolsNumber / addingString.length);
    const restOfString = addingSymbolsNumber % addingString.length;
    let totalAddingString = '';

    for (let i = 0; i < intPartOfString; i++) {
      totalAddingString += addingString;
    }

    newString = totalAddingString + string;
    totalAddingString = '';

    for (let i = 0; i < restOfString; i++) {
      totalAddingString += addingString[i];
    }

    newString = totalAddingString + newString;
    return newString;
  }

  return string;
}

addSymbols('1', 2, '0'); // '01'
addSymbols('1', 4, '0'); // '0001'
addSymbols('q', 4, 'werty'); // 'werq'
addSymbols('q', 4, 'we'); // 'wweq'
addSymbols('qwerty', 4, '0'); // 'qwerty'

const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('проверяемая строка', 20); // true
checkStringLength('проверяемая строка', 18); // true
checkStringLength('проверяемая строка', 10); // false
