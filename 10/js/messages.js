import {isEscapeKey} from './util.js';
import {onDocumentKeyDownForm} from './form.js';

let messageElement;

const hideMessage = () => {
  messageElement.remove();

  document.addEventListener('keydown', onDocumentKeyDownForm);

  document.removeEventListener('keydown', onDocumentKeyDown);
  document.removeEventListener('click', onDocumentClick);
};

const showMessage = (template, body) => {
  messageElement = template.cloneNode(true);
  const closeButton = messageElement.querySelector('button');
  body.appendChild(messageElement);

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

export {showMessage};
