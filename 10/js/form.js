import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';
import {postData} from './api.js';
import {showMessage} from './messages.js';

const MAX_TAG_AMOUNT = 5;
const TAG_EXPRESSION = /^#[a-zа-яё0-9]{1,19}$/i;

const bodyContainer = document.body;
const form = document.querySelector('.img-upload__form');
const formOverlay = document.querySelector('.img-upload__overlay');
const submitButton = document.querySelector('.img-upload__submit');
const cancelButton = document.querySelector('#upload-cancel');
const fileInput = document.querySelector('#upload-file');
const tagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

let tagErrorString = '';

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const getTags = () => tagField.value.toLowerCase().split(' ').filter((tag) => tag);

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
  const isValid = TAG_EXPRESSION.test(tag);
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
  formOverlay.classList.remove('hidden');

  resetScale();
  resetEffects();

  document.addEventListener('keydown', onDocumentKeyDownForm);
};

const closeModal = () => {
  bodyContainer.classList.remove('modal-open');
  formOverlay.classList.add('hidden');

  resetForm();

  document.removeEventListener('keydown', onDocumentKeyDownForm);
};

const isFieldFocused = () => document.activeElement === tagField || document.activeElement === commentField;

function onDocumentKeyDownForm (evt) {
  if (isEscapeKey(evt) && !isFieldFocused()) {
    closeModal();
  }
}

const enableSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const disableSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...';
};

const setFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      disableSubmitButton();

      postData(formData)
        .then(() => {
          closeModal();
          showMessage(successTemplate, bodyContainer);
        })
        .catch(() => {
          showMessage(errorTemplate, bodyContainer);
          document.removeEventListener('keydown', onDocumentKeyDownForm);
        })
        .finally(enableSubmitButton);
    }
  });
};

fileInput.addEventListener('change', () => {
  openModal();
});

cancelButton.addEventListener('click', () => {
  closeModal();
});

setFormSubmit(closeModal);

export {onDocumentKeyDownForm};
