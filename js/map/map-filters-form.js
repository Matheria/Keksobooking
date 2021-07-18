import {getAdvs} from '../state.js';
import {debounce} from '../utils.js';
import {MAX_PINS_ON_MAP} from './constants.js';

const priceRangeByPriceTier = {
  any: [-Infinity, Infinity],
  low: [0, 10000],
  middle: [10000, 50000],
  high: [50000, Infinity],
};

const mapFiltersForm = document.querySelector('.map__filters');

if (mapFiltersForm === null) {
  throw new Error ('mapFiltersForm не найден');
}

export const deactivateMapFiltersForm = () => {
  mapFiltersForm.classList.add('map__filters--disabled');

  Array.from(mapFiltersForm.elements).forEach((element) => {
    element.disabled = true;
  });
};

export const activateMapFiltersForm = () => {
  mapFiltersForm.classList.remove('map__filters--disabled');

  Array.from(mapFiltersForm.elements).forEach((element) => {
    element.disabled = false;
  });
};

const mapFiltersFormChangeHandlers = [];

export const addMapFiltersFormChangeHandler = (handler) => {
  mapFiltersFormChangeHandlers.push(handler);
};

const getPriceRangeByPriceTier = (priceTier) => {
  const priceRange = priceRangeByPriceTier[priceTier];

  if (!priceRange) {
    throw new Error('Не удалось извлечь значение из priceRangeByPriceTier');
  }

  return priceRange;
};

const filterAdv = (adv, {type, priceRange, rooms, guests, features}) => {
  const [minPrice, maxPrice] = priceRange;

  if (type !== 'any' && adv.offer.type !== type) {
    return false;
  }

  if (guests !== 'any' && adv.offer.guests !== Number(guests)) {
    return false;
  }

  if (rooms !== 'any' && adv.offer.rooms !== Number(rooms)) {
    return false;
  }

  if (adv.offer.price < minPrice || adv.offer.price > maxPrice) {
    return false;
  }

  return !adv.offer.features || !features.every((feature) => adv.offer.features.includes(feature));
};

const handleMapFiltersFormChange = debounce(() => {
  const advs = getAdvs().slice(0, MAX_PINS_ON_MAP);
  const formData = new FormData(mapFiltersForm);

  const type = formData.get('housing-type');
  const priceTier = formData.get('housing-price');
  const priceRange = getPriceRangeByPriceTier(priceTier);
  const rooms = formData.get('housing-rooms');
  const guests = formData.get('housing-guests');
  const features = formData.getAll('features');

  if (mapFiltersFormChangeHandlers.length) {
    mapFiltersFormChangeHandlers.forEach((handler) => {
      handler(advs.filter((adv) => filterAdv(adv, {type, priceRange, rooms, guests, features})));
    });
  }
});

export const resetMapFiltersForm = () => {
  mapFiltersForm.reset();
};

mapFiltersForm.addEventListener('change', handleMapFiltersFormChange);
