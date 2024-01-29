import './functions.js';
import {createPhotos} from './data.js';
import {renderThumbnails} from './thumbnails.js';

const photos = createPhotos();
renderThumbnails(photos);
