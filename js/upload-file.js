import {openModal} from './form.js';

const FILE_TYPES = ['png', 'jpeg', 'jpg'];

const fileInput = document.querySelector('#upload-file');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();

  const isValid = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (isValid) {
    const urlObject = URL.createObjectURL(file);

    imagePreview.src = urlObject;

    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${urlObject})`;
    });
  }

  openModal();
});
