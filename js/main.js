import {showErrorMessage} from './util.js';
import {renderThumbnails, setThumbnailsListener} from './thumbnails.js';
import {getData} from './api.js';
import './form.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
    setThumbnailsListener(photos);
  })
  .catch((error) => {
    showErrorMessage(error.message);
  });
