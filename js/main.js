const DESCRIPTION = [
  'Девушка пьёт кофе.',
  'Друзья играют в волейбол',
  'Рыжий кот сидит на подоконнике.',
  'Мальчик вышивает крестиком.',
  'Влюблённая пара смотрит на салют.',
  'Девушка делает заказ в кафе.',
  'Дети играют в вышибалы.',
  'За окном идёт дождь.',
  'Семейное фото.'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван',
  'Пётр',
  'Сергей',
  'Кирилл',
  'Данил',
  'Любовь',
  'Матвей',
  'Анна'
];

const PHOTOS_AMOUNT = 25;
const MIN_COMMENTS_AMOUNT = 1;
const MAX_COMMENTS_AMOUNT = 5;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function createIdGenerator() {
  let lastGeneratedId = 1;

  return function() {
    return lastGeneratedId++;
  };
}

function createRandomUniqueIdGenerator(min, max) {
  const previousValues = [];

  return function() {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= (max - min + 1)) {
      return null;
    }

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatedCommentId = createRandomUniqueIdGenerator(1, 1000);

const createComment = () => ({
  id: generatedCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: `${getRandomArrayElement(COMMENTS)}`,
  name: `${getRandomArrayElement(NAMES)}`
});

const generatedPhotoId = createIdGenerator();
const generatedUrlNumber = createIdGenerator();

const createPhoto = () => ({
  id: generatedPhotoId(),
  url: `photos/${generatedUrlNumber()}.jpg`,
  description: `${getRandomArrayElement(DESCRIPTION)}`,
  likes: `${getRandomInteger(15, 200)}`,
  comments: Array.from({length: getRandomInteger(MIN_COMMENTS_AMOUNT, MAX_COMMENTS_AMOUNT)}, createComment)
});

const photos = Array.from({length: PHOTOS_AMOUNT}, createPhoto);

// eslint-disable-next-line no-console
console.log(photos);
