import './functions.js';
import {renderThumbnails, setThumbnailsListener} from './thumbnails.js';
import './form-validate.js';
import {getData} from './api.js';
import {showErrorMessage} from './util.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
    setThumbnailsListener(photos);
  })
  .catch((error) => {
    showErrorMessage(error.message);
  });
