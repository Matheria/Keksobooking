import {TypeOfHousing} from './enums.js';

const adForm = document.querySelector('.ad-form');

if (adForm === null) {
  throw new Error ('adForm не найден');
}

const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const MIN_PRICE_OF_HOUSING_TYPE = {
  [TypeOfHousing.bungalow]: 0,
  [TypeOfHousing.flat]: 1000,
  [TypeOfHousing.hotel]: 3000,
  [TypeOfHousing.house]: 5000,
  [TypeOfHousing.palace]: 10000,
};

const ROOM_CAPACITY = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const titleInput = adForm.elements.title;
const typeSelect = adForm.elements.type;
const priceInput = adForm.elements.price;
const roomSelect = adForm.elements.rooms;
const capacitySelect = adForm.elements.capacity;
const timeInSelect = adForm.elements.timein;
const timeOutSelect = adForm.elements.timeout;

if (
  titleInput === null ||
  typeSelect === null ||
  priceInput === null ||
  roomSelect === null ||
  capacitySelect === null ||
  timeInSelect === null ||
  timeOutSelect === null
) {
  throw new Error ('Элементы adForm не найдены');
}

export const getTitleInput = () => {
  const adTitle = titleInput.value.length;

  if (adTitle < TITLE_MIN_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${  TITLE_MIN_LENGTH - adTitle } символов.`);
  } else if (adTitle > TITLE_MAX_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${  adTitle - TITLE_MAX_LENGTH } символов.`);
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
};

export const getTypeSelect = () => {
  priceInput.placeholder = MIN_PRICE_OF_HOUSING_TYPE[typeSelect.value];
  priceInput.min = MIN_PRICE_OF_HOUSING_TYPE[typeSelect.value];
};

export const getPriceInput = () => {
  const pricePerNight = priceInput.value;
  const typeOfHousing = typeSelect.value;
  const minPrice = MIN_PRICE_OF_HOUSING_TYPE[typeOfHousing];
  const maxPrice = 1000000;

  if (pricePerNight < minPrice) {
    priceInput.setCustomValidity(`Стоимость должна быть не ниже ${minPrice}`);
  } else if (pricePerNight > maxPrice) {
    priceInput.setCustomValidity(`Стоимость не должна превышать ${maxPrice}`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
};

export const getRoomsSelect = () => {
  for (const option of capacitySelect.options) {
    option.disabled = !ROOM_CAPACITY[roomSelect.value].includes(option.value);
  }
  capacitySelect.value = ROOM_CAPACITY[roomSelect.value].includes(capacitySelect.value) ? capacitySelect.value : ROOM_CAPACITY[roomSelect.value][0];
};

export const getTimeInSelectChange = () => {
  timeInSelect.value = timeOutSelect.value;
};

export const getTimeOutSelectChange = () => {
  timeOutSelect.value = timeInSelect.value;
};

export const deactivateAdForm = () => {
  adForm.classList.add('ad-form--disabled');

  Array.from(adForm.elements).forEach((element) => {
    element.disabled = true;
  });
};

export const activateAdForm = () => {
  adForm.classList.remove('ad-form--disabled');

  Array.from(adForm.elements).forEach((element) => {
    element.disabled = false;
  });
};

titleInput.addEventListener('input', getTitleInput);
typeSelect.addEventListener('change', getTypeSelect);
priceInput.addEventListener('input', getPriceInput);
roomSelect.addEventListener('change', getRoomsSelect);
timeInSelect.addEventListener('change', getTimeOutSelectChange);
timeOutSelect.addEventListener('change', getTimeInSelectChange);
