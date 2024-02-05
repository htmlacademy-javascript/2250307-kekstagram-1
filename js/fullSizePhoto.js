import {isEscapeKey} from './util.js';
import {showComments} from './fullSizeComments.js';

const bodyContainer = document.body;
const fullSizePhotoContainer = document.querySelector('.big-picture');

const displayedCommentsAmount = document.querySelector('.social__comment-count');
const commentsLoadButton = document.querySelector('.comments-loader');

const fullSizePhoto = document.querySelector('.big-picture__img').querySelector('img');
const likesAmount = document.querySelector('.likes-count');
const commentsAmount = document.querySelector('.comments-count');
const descriptionText = document.querySelector('.social__caption');

const closeButton = document.querySelector('.big-picture__cancel');

displayedCommentsAmount.classList.add('hidden'); // Временное скрытие по заданию
commentsLoadButton.classList.add('hidden'); // Временное скрытие по заданию

const onDocumentKeyDown = (evt) => {
  if(isEscapeKey(evt)) {
    closeFullSizePhoto();
  }
};

function openFullSizePhoto(photo) {
  bodyContainer.classList.add('modal-open');
  fullSizePhotoContainer.classList.remove('hidden');

  fullSizePhoto.src = photo.url;
  fullSizePhoto.alt = photo.description;
  likesAmount.textContent = photo.likes;
  commentsAmount.textContent = photo.comments.length;
  descriptionText.textContent = photo.description;
  showComments(photo);

  document.addEventListener('keydown', onDocumentKeyDown);
}

function closeFullSizePhoto() {
  bodyContainer.classList.remove('modal-open');
  fullSizePhotoContainer.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeyDown);
}

closeButton.addEventListener('click', () =>{
  closeFullSizePhoto();
});

export {openFullSizePhoto};
