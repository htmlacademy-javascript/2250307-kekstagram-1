import {isEscapeKey} from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

let messageModal;

const isMessageShown = () => Boolean(messageModal);

const getMessageTemplate = (message) => {
  if (message === 'success') {
    return successTemplate;
  }

  return errorTemplate;
};

const hideMessage = () => {
  messageModal.remove();
  messageModal = null;

  document.removeEventListener('keydown', onDocumentKeyDown);
  document.removeEventListener('click', onDocumentClick);
};

const showMessage = (message) => {
  messageModal = getMessageTemplate(message).cloneNode(true);
  const closeButton = messageModal.querySelector('button');
  document.body.appendChild(messageModal);

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
  if (evt.target.classList.contains(messageModal.classList)) {
    hideMessage();
  }
}

export {showMessage, isMessageShown};
