import './functions.js';
import {createPhotos} from './data.js';
import {renderThumbnails, clickThumbnails} from './thumbnails.js';

const photos = createPhotos();
renderThumbnails(photos);

clickThumbnails(photos);
