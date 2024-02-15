import './functions.js';
import {createPhotos} from './data.js';
import {renderThumbnails, setThumbnailsListener} from './thumbnails.js';

const photos = createPhotos();

renderThumbnails(photos);

setThumbnailsListener(photos);
