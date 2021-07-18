import {activateAdForm, updateAddressInput, addAdFormResetHandler} from './ad-form.js';
import {initMap, resetMap, addMapLoadHandler, addMainPinMarkerMoveEndHandler} from './map/map.js';

const handleMapLoad = () => {
  activateAdForm();
};

const handleMainPinMarkerMoveEnd = (coordinates) => {
  updateAddressInput(coordinates);
};

const handleAdFormReset = () => {
  resetMap();
};

addMapLoadHandler(handleMapLoad);
addMainPinMarkerMoveEndHandler(handleMainPinMarkerMoveEnd);
addAdFormResetHandler(handleAdFormReset);

initMap();
