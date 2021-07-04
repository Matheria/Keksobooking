const adForm = document.querySelector('.ad-form');

if (adForm === null) {
  throw new Error ('adForm не нвйден');
}

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
