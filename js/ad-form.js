import {TypeOfHousing} from './enums.js';
import {pluralize} from './utils.js';

const adForm = document.querySelector('.ad-form');

if (adForm === null) {
  throw new Error ('adForm не найден');
}

const minPriceByHousingType = {
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
const addressInput = adForm.elements.address;

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

const handleTitleInputChange = () => {
  if (titleInput.value.length < titleInput.minLength) {
    const requredSymbolsCount = titleInput.minLength - titleInput.value.length;

    titleInput.setCustomValidity(`Ещё ${requredSymbolsCount} ${pluralize(requredSymbolsCount, ['символ', 'символа', 'символов'])}.`);
  } else if (titleInput.value.length > titleInput.maxLength) {
    const symbolsToDeleteCount = titleInput.value.length - titleInput.maxLength;

    titleInput.setCustomValidity(`Удалите лишние ${symbolsToDeleteCount} ${pluralize(symbolsToDeleteCount, ['символ', 'символа', 'символов'])}.`);
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
};

const handleTypeSelectChange = () => {
  priceInput.placeholder = minPriceByHousingType[typeSelect.value];
  priceInput.min = minPriceByHousingType[typeSelect.value];
};

const handlePriceInputChange = () => {
  const price = Number(priceInput.value);

  if (price < Number(priceInput.min)) {
    priceInput.setCustomValidity(`Стоимость должна быть не ниже ${priceInput.min}`);
  } else if (price > Number(priceInput.max)) {
    priceInput.setCustomValidity(`Стоимость не должна превышать ${priceInput.max}`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
};

const updateCapacitySelect = () => {
  for (const option of capacitySelect.options) {
    option.hidden = !roomCapacityByRooms[roomSelect.value].includes(option.value);
  }
  capacitySelect.value = roomCapacityByRooms[roomSelect.value].includes(capacitySelect.value) ? capacitySelect.value : '';
};

const handleRoomSelectChange = () => {
  updateCapacitySelect();
};

const handleTimeInSelectChange = () => {
  timeOutSelect.value = timeInSelect.value;
};

const handleTimeOutSelectChange = () => {
  timeInSelect.value = timeOutSelect.value;
};

export const updateAddressInput = (coordinates) => {
  addressInput.value = `${(coordinates.lat).toFixed(5)}, ${(coordinates.lng).toFixed(5)}`;
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
timeInSelect.addEventListener('change', handleTimeInSelectChange);
timeOutSelect.addEventListener('change', handleTimeOutSelectChange);

updateCapacitySelect();
deactivateAdForm();
