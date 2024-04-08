import {openFullSizePhoto} from './full-size-photo.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');

const clearThumbnails = () => {
  const pictures = pictureContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });
};

const renderThumbnails = (photos) => {
  clearThumbnails();
  const fragment = document.createDocumentFragment();

  photos.forEach(({id, url, description, likes, comments}) => {
    const picture = pictureTemplate.cloneNode(true);
    const pictureImage = picture.querySelector('.picture__img');
    const pictureLikes = picture.querySelector('.picture__likes');
    const pictureComments = picture.querySelector('.picture__comments');

    pictureImage.src = url;
    pictureImage.alt = description;
    pictureLikes.textContent = likes;
    pictureComments.textContent = comments.length;

    picture.dataset.thumbnailId = id;

    fragment.appendChild(picture);
  });

  pictureContainer.appendChild(fragment);
};

const setThumbnailsListener = (photos) => {
  pictureContainer.addEventListener('click', (evt) => {
    const clickedThumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!clickedThumbnail) {
      return;
    }
    const clickedThumbnailId = clickedThumbnail.dataset.thumbnailId;

    const photo = photos.find((element) => element.id === Number(clickedThumbnailId));

    openFullSizePhoto(photo);
  });
};

export {renderThumbnails, setThumbnailsListener};
