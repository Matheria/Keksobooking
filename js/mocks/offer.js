import {getRandomArrayElement, getRandomNumberInRange, getRandomArray} from '../utils.js';
import {HousingType, Feature} from '../enums.js';

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

const MIN_PRICE = 1000;
const MAX_PRICE = 10000;

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

export const createOffer = () => ({
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
