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
