import {isEscapeKey} from './util.js';

const bodyContainer = document.body;
const form = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const fileInput = document.querySelector('#upload-file');
const tagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const MAX_TAG_AMOUNT = 5;
const tagExpression = /^#[a-zа-яё0-9]{1,19}$/i;
let tagErrorString = '';

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const getTags = () => {
  const tags = [];
  const tagsWithSpaces = tagField.value.toLowerCase().split(' ');
  tagsWithSpaces.forEach((tag) => {
    if (tag) {
      tags.push(tag);
    }
  });
  return tags;
};

const getUniqueTags = (tags) => Array.from(new Set(tags));

const isUniqueTags = (tags, uniqueTags) => {
  const isValid = uniqueTags.length === tags.length;
  if (!isValid) {
    tagErrorString = 'Хештеги не могут повторяться!';
  }
  return isValid;
};

const isValidAmount = (tags) => {
  const isValid = tags.length <= MAX_TAG_AMOUNT;
  if (!isValid) {
    tagErrorString = `Максимально допустимое количество хештегов ${MAX_TAG_AMOUNT}!`;
  }
  return isValid;
};

const isValidTag = (tag) => {
  const isValid = tagExpression.test(tag);
  if (!isValid) {
    tagErrorString = `Хештег ${tag} некорректный!`;
  }
  return isValid;
};

const validateTags = () => {
  const tags = getTags();
  const uniqueTags = getUniqueTags(tags);
  return isUniqueTags(tags, uniqueTags) && isValidAmount(tags) && tags.every(isValidTag);
};

const getTagErrorMessage = () => tagErrorString;

pristine.addValidator(
  tagField,
  validateTags,
  getTagErrorMessage
);

const resetForm = () => {
  fileInput.value = '';
  tagField.value = '';
  commentField.value = '';
  pristine.validate();
};

const openModal = () => {
  bodyContainer.classList.add('modal-open');
  form.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeyDown);
};

const closeModal = () => {
  bodyContainer.classList.remove('modal-open');
  form.classList.add('hidden');

  resetForm();

  document.removeEventListener('keydown', onDocumentKeyDown);
};

const isFieldFocused = () => document.activeElement === tagField || document.activeElement === commentField;

function onDocumentKeyDown (evt) {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    closeModal();
  }
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

fileInput.addEventListener('change', openModal);
cancelButton.addEventListener('click', closeModal);
form.addEventListener('submit', onFormSubmit);
