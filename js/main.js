import {showErrorMessage, debounce} from './util.js';
import {getData} from './api.js';
import {renderThumbnails, setThumbnailsListener} from './thumbnails.js';
import {initializePhotos, applyFilter} from './filters.js';
import './form.js';

const TIMEOUT_DELAY = 500;

getData()
  .then((photos) => {
    const debouncedRenderThumbnails = debounce(renderThumbnails, TIMEOUT_DELAY);
    initializePhotos(debouncedRenderThumbnails, photos);

    const filteredPhotos = applyFilter();
    renderThumbnails(filteredPhotos);
    setThumbnailsListener(filteredPhotos);
  })
  .catch((error) => {
    showErrorMessage(error.message);
  });
