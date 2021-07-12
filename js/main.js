import {activateAdForm, updateAddressInput} from './ad-form.js';
import {initMap, addMapLoadHandler, addMainPinMarkerMoveEndHandler} from './map/map.js';

const handleMapLoad = () => {
  activateAdForm();
};

const handleMainPinMarkerMoveEnd = (coordinates) => {
  updateAddressInput(coordinates);
};

addMapLoadHandler(handleMapLoad);
addMainPinMarkerMoveEndHandler(handleMainPinMarkerMoveEnd);

initMap();
