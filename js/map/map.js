import {activateMapFiltersForm, deactivateMapFiltersForm} from './map-filters-form.js';
import {handleAddressInputChange} from './ad-form.js';
import {createAdv} from '../mocks/adv.js';
import {createAdCard} from '../ad-card.js';
import {createAndFillArray} from '../utils.js';

deactivateMapFiltersForm();

export const MAP_CENTER_COORDINATES = {
  lat: 35.4122,
  lng: 139.4130,
};
const MAP_SCALE = 10;

const map = L.map('map-canvas')
  .on('load', () => {
    activateMapFiltersForm();
  })
  .setView(MAP_CENTER_COORDINATES, MAP_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinMarker = L.marker(
  MAP_CENTER_COORDINATES,
  {
    draggable: true,
    icon: L.icon({
      iconUrl: './img/main-pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    }),
  },
);

mainPinMarker.addTo(map);

const handleMainPinMarkerMoveEnd = () => {
  const coordinates = mainPinMarker.getLatLng();
  handleAddressInputChange(coordinates);
};

mainPinMarker.on('moveend', handleMainPinMarkerMoveEnd);

const createPinMarker = (point) => {
  L.marker(
    point.location,
    {
      icon: L.icon ({
        iconUrl: './img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      }),
    },
  ).addTo(map)
    .bindPopup(createAdCard(point),
      {
        keepInView:true,
      },
    );
};

const createAdsMarkers = createAndFillArray(10, createAdv);

createAdsMarkers.forEach(createPinMarker);

