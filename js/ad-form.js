import {TypeOfHousing} from './enums.js';

const adForm = document.querySelector('.ad-form');

if (adForm === null) {
  throw new Error ('adForm не найден');
}

const minTitleLength = 30;
const maxTitleLength = 100;
const minPriceOfHousingType = {
  [TypeOfHousing.bungalow]: 0,
  [TypeOfHousing.flat]: 1000,
  [TypeOfHousing.hotel]: 3000,
  [TypeOfHousing.house]: 5000,
  [TypeOfHousing.palace]: 10000,
};

const roomCapacityByRooms = {
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

export const handleTitleInputChange = () => {
  const adTitle = titleInput.value.length;

  if (adTitle < minTitleLength) {
    titleInput.setCustomValidity(`Ещё ${  minTitleLength - adTitle } символов.`);
  } else if (adTitle > maxTitleLength) {
    titleInput.setCustomValidity(`Удалите лишние ${  adTitle - maxTitleLength } символов.`);
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
};

export const handleTypeSelectChange = () => {
  priceInput.placeholder = minPriceOfHousingType[typeSelect.value];
  priceInput.min = minPriceOfHousingType[typeSelect.value];
};

export const handlePriceInputChange = () => {
  const pricePerNight = priceInput.value;
  const typeOfHousing = typeSelect.value;
  const minPrice = minPriceOfHousingType[typeOfHousing];
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

export const handleRoomSelectChange = () => {
  for (const option of capacitySelect.options) {
    option.disabled = !roomCapacityByRooms[roomSelect.value].includes(option.value);
  }
  capacitySelect.value = roomCapacityByRooms[roomSelect.value].includes(capacitySelect.value) ? capacitySelect.value : roomCapacityByRooms[roomSelect.value][0];
};

export const handleTimeInSelectChange = () => {
  timeInSelect.value = timeOutSelect.value;
};

export const handleTimeOutSelectChange = () => {
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

titleInput.addEventListener('input', handleTitleInputChange);
typeSelect.addEventListener('change', handleTypeSelectChange);
priceInput.addEventListener('input', handlePriceInputChange);
roomSelect.addEventListener('change', handleRoomSelectChange);
timeInSelect.addEventListener('change', handleTimeOutSelectChange);
timeOutSelect.addEventListener('change', handleTimeInSelectChange);
