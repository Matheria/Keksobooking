const adForm = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');
const adFormFieldsets = adForm.querySelectorAll('fieldset');
const mapFormFieldset = mapForm.querySelector('fieldset');
const mapFormSelects = mapForm.querySelector('select');

export const inactivePage = () => {
  adForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');

  adFormFieldsets.forEach((element) => {
    element.disabled = true;
  });

  mapFormFieldset.disabled = true;

  mapFormSelects.forEach((element) => {
    element.disabled = true;
  });
};

export const activePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('map__filters--disabled');

  adFormFieldsets.forEach((element) => {
    element.disabled = false;
  });

  mapFormFieldset.disabled = false;

  mapFormSelects.forEach((element) => {
    element.disabled = false;
  });
};
