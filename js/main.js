import './functions.js';
import {createPhotos} from './data.js';
import {renderThumbnails, setThumbnailsListener} from './thumbnails.js';
import './form-validate.js';

const photos = createPhotos();

renderThumbnails(photos);

setThumbnailsListener(photos);
