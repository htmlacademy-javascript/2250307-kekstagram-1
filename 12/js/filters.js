const RANDOM_FILTER_AMOUNT = 10;

const filterContainer = document.querySelector('.img-filters');
const filterButtons = filterContainer.querySelectorAll('button');

let currentFilter = '';
let pictures = [];

const filterByRandom = () => 0.5 - Math.random();

const filterByComments = (a, b) => b.comments.length - a.comments.length;

const applyFilter = () => {
  switch (currentFilter) {
    case 'filter-random':
      return [...pictures].sort(filterByRandom).slice(0, RANDOM_FILTER_AMOUNT);

    case 'filter-discussed':
      return [...pictures].sort(filterByComments);

    default:
      return [...pictures];
  }
};

const setOnFilterButtonClick = (callback) => {
  filterContainer.addEventListener('click', (evt) => {
    const clickedFilterButton = evt.target;

    if (!clickedFilterButton.classList.contains('img-filters__button')) {
      return;
    }

    filterButtons.forEach((button) => {
      button.className = 'img-filters__button';
    });

    clickedFilterButton.classList.add('img-filters__button--active');
    currentFilter = clickedFilterButton.id;

    callback(applyFilter());
  });
};

const initializePhotos = (callback, loadedPhotos) => {
  filterContainer.classList.remove('img-filters--inactive');
  pictures = [...loadedPhotos];
  setOnFilterButtonClick(callback);
};

export {initializePhotos, applyFilter};
