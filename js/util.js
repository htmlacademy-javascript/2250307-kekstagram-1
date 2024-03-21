const MESSAGE_SHOW_TIME = 5000;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createIdGenerator() {
  let lastGeneratedId = 1;

  return function() {
    return lastGeneratedId++;
  };
}

function createRandomUniqueIdGenerator(min, max) {
  const previousValues = [];

  return function() {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= (max - min + 1)) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const showErrorMessage = (message) => {
  const messageContainer = document.createElement('div');
  messageContainer.style.zIndex = '100';
  messageContainer.style.position = 'absolute';
  messageContainer.style.left = '0';
  messageContainer.style.right = '0';
  messageContainer.style.top = '0';
  messageContainer.style.padding = '15px';
  messageContainer.style.backgroundColor = '#ff4d4d';
  messageContainer.style.fontSize = '15px';
  messageContainer.style.textAlign = 'center';

  messageContainer.textContent = message;
  document.body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, MESSAGE_SHOW_TIME);
};

export {getRandomInteger, getRandomArrayElement, createIdGenerator, createRandomUniqueIdGenerator, isEscapeKey, showErrorMessage};
