import {isEscapeKey} from './util.js';
import {renderComments, resetComments} from './comments.js';

const bodyContainer = document.body;
const fullSizePhotoContainer = document.querySelector('.big-picture');

const commentsLoadButton = document.querySelector('.comments-loader');

const fullSizePhoto = document.querySelector('.big-picture__img').querySelector('img');
const likesAmount = document.querySelector('.likes-count');
const commentsAmount = document.querySelector('.comments-count');
const descriptionText = document.querySelector('.social__caption');

const closeButton = document.querySelector('.big-picture__cancel');

const COMMENTS_LOAD_STEP = 5;
let renderedCommentsAmount = COMMENTS_LOAD_STEP;
let currentComments = [];

const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    closeFullSizePhoto();
  }
};

const openFullSizePhoto = (photo) => {
  bodyContainer.classList.add('modal-open');
  fullSizePhotoContainer.classList.remove('hidden');

  fullSizePhoto.src = photo.url;
  fullSizePhoto.alt = photo.description;
  likesAmount.textContent = photo.likes;
  commentsAmount.textContent = photo.comments.length;
  descriptionText.textContent = photo.description;

  currentComments = photo.comments;
  resetComments();
  renderComments(currentComments, renderedCommentsAmount);

  document.addEventListener('keydown', onDocumentKeyDown);
};

function closeFullSizePhoto() {
  bodyContainer.classList.remove('modal-open');
  fullSizePhotoContainer.classList.add('hidden');

  renderedCommentsAmount = COMMENTS_LOAD_STEP;

  document.removeEventListener('keydown', onDocumentKeyDown);
}

commentsLoadButton.addEventListener('click', () => {
  renderedCommentsAmount += COMMENTS_LOAD_STEP;
  resetComments();
  renderComments(currentComments, renderedCommentsAmount);
});

closeButton.addEventListener('click', () => {
  closeFullSizePhoto();
});

export {openFullSizePhoto};
