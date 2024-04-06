import {isEscapeKey} from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

let messageElement;

const isMessageShown = () => Boolean(messageElement);

const getMessageTemplate = (message) => {
  if (message === 'success') {
    return successTemplate;
  }

  return errorTemplate;
};

const hideMessage = () => {
  messageElement.remove();
  messageElement = null;

  document.removeEventListener('keydown', onDocumentKeyDown);
  document.removeEventListener('click', onDocumentClick);
};

const showMessage = (message) => {
  messageElement = getMessageTemplate(message).cloneNode(true);
  const closeButton = messageElement.querySelector('button');
  document.body.appendChild(messageElement);

  document.addEventListener('keydown', onDocumentKeyDown);
  document.addEventListener('click', onDocumentClick);

  closeButton.addEventListener('click', () => {
    hideMessage();
  });
};

function onDocumentKeyDown (evt) {
  if (isEscapeKey(evt)) {
    hideMessage();
  }
}

function onDocumentClick (evt) {
  if (evt.target.classList.contains(messageElement.classList)) {
    hideMessage();
  }
}

export {showMessage, isMessageShown};
