const AUTHOR_AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png',
];

const OFFERS_TITLES = [
  'Уютное гнездышко для молодоженов',
  'Великолепная квартира-студия в центре Токио',
  'Квартира полностью укомплектована и недавно отремонтирована',
  'Пентхаус с видом на город',
  '2-ух комнатная квартира',
  '3-ех комнатная квартира',
  'Однокомнатная квартира в центре',
  'Комната в общежитии',
  'Дом у дороги',
  'Продам гараж!',
];

const ADDRESSES = [
  '35,46',
  '69,51',
  '79,21',
  '25,48',
  '14,23',
  '95,62',
  '89,72',
  '71,89',
];

const MIN_LATITUDE = 35.65000;

const MAX_LATITUDE = 35.70000;

const MIN_LONGITUDE = 139.70000;

const MAX_LONGITUDE = 139.80000;

const MIN_PRICE = 1000;
const MAX_PRICE = 10000;

const HousingType = {
  palace: 'palace',
  flat: 'flat',
  house: 'house',
  bungalow: 'bungalow',
  hotel: 'hotel',
};

const HOUSING_TYPES = [
  HousingType.palace,
  HousingType.flat,
  HousingType.house,
  HousingType.bungalow,
  HousingType.hotel,
];

const MIN_ROOMS = 1;

const MAX_ROOMS = 5;

const MIN_GUESTS = 1;

const MAX_GUESTS = 5;

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const Feature = {
  wifi: 'wifi',
  dishwasher: 'dishwasher',
  parking: 'parking',
  washer: 'washer',
  elevator: 'elevator',
  conditioner: 'conditioner',
};

const FEATURES = [
  Feature.wifi,
  Feature.dishwasher,
  Feature.parking,
  Feature.washer,
  Feature.elevator,
  Feature.conditioner,
];

const DESCRIPTIONS = [
  'В самом центре города',
  'Лучше, чем ночевать на вокзале',
  'Отличное состояние, имеется все для уютного проживания',
  'Рядом метро и вся нужная транспортная развязка. Чистая квартира',
  'Чистая, уютная комната. Идеально подойдет для студентов',
  'Шикарный пентхаус с отличным ремонтом и новой мебелью',
  'Косметический ремонт, спальный район',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const AD_COUNT = 10;

function getRandomNumberInRange(min, max) {
  if (min >= max || min < 0) {
    throw new Error('Допускаются только положительные числа в диапазоне от меньшего к большему и не равные друг другу');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloatNumberInRange(min, max, accuracy) {
  if (min >= max || min < 0) {
    throw new Error('Допускаются только положительные числа в диапазоне от меньшего к большему и не равные друг другу');
  }
  const randomFloatNumber = min + Math.random() * (max - min);
  return parseFloat(randomFloatNumber.toFixed(accuracy));
}

const getRandomArrayElement = (elements) => elements[getRandomNumberInRange(0, elements.length - 1)];

const getRandomArray = (array) => {
  const randomArray = Array.from({length: getRandomNumberInRange(1, array.length)}).map(() => getRandomArrayElement(array));
  return [...new Set(randomArray)];
};

const createAuthor = () => ({
  avatar: getRandomArrayElement(AUTHOR_AVATARS),
});

const createOffer = () => ({
  title: getRandomArrayElement(OFFERS_TITLES),
  address: getRandomArrayElement(ADDRESSES),
  price: getRandomNumberInRange(MIN_PRICE, MAX_PRICE),
  type: getRandomArrayElement(HOUSING_TYPES),
  rooms: getRandomNumberInRange(MIN_ROOMS, MAX_ROOMS),
  guests: getRandomNumberInRange(MIN_GUESTS, MAX_GUESTS),
  checkin: getRandomArrayElement(CHECKIN),
  checkout: getRandomArrayElement(CHECKOUT),
  features: getRandomArray(FEATURES),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: getRandomArray(PHOTOS),
});

const createLocation = () => ({
  lat: getRandomFloatNumberInRange(MIN_LATITUDE, MAX_LATITUDE, 5),
  lng: getRandomFloatNumberInRange(MIN_LONGITUDE, MAX_LONGITUDE, 5),
});

const createAd = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation(),
});

const ads = Array.from({length: AD_COUNT}).map(() =>
  createAd());

// eslint-disable-next-line no-console
console.log(ads);
