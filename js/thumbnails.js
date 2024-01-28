import {createPhotos} from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');
const photosList = createPhotos();

const pictureContainerFragment = document.createDocumentFragment();

photosList.forEach(({url, likes, comments}) => {
  const picture = pictureTemplate.cloneNode(true);
  const pictureImage = picture.querySelector('.picture__img');
  const pictureLikes = picture.querySelector('.picture__likes');
  const pictureComments = picture.querySelector('.picture__comments');

  pictureImage.src = url;
  pictureLikes.textContent = likes;
  pictureComments.textContent = comments.length;

  pictureContainerFragment.appendChild(picture);
});

pictureContainer.appendChild(pictureContainerFragment);
