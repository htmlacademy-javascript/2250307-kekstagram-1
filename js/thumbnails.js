const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureContainer = document.querySelector('.pictures');

function renderThumbnails(photos) {
  const fragment = document.createDocumentFragment();

  photos.forEach(({url, description, likes, comments}) => {
    const picture = pictureTemplate.cloneNode(true);
    const pictureImage = picture.querySelector('.picture__img');
    const pictureLikes = picture.querySelector('.picture__likes');
    const pictureComments = picture.querySelector('.picture__comments');

    pictureImage.src = url;
    pictureImage.alt = description;
    pictureLikes.textContent = likes;
    pictureComments.textContent = comments.length;

    fragment.appendChild(picture);
  });

  pictureContainer.appendChild(fragment);
}

export {renderThumbnails};
