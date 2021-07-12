import {activateMapFiltersForm, deactivateMapFiltersForm} from './map-filters-form.js';
import {createAdv} from '../mocks/adv.js';
import {createAdCard} from './ad-card.js';
import {createAndFillArray} from '../utils.js';

if (!L) {
  throw new Error ('Leaflet не найден');
}

deactivateMapFiltersForm();

const MAP_CENTER_COORDINATES = {
  lat: 35.41221,
  lng: 139.41301,
};

const MAP_SCALE = 10;

/**
 * Обработчики события load у map, полученные из других модулей (подписчики)
 */
const mapLoadHandlers = [];

/**
 * Функция для добавления обработчика события load у map
 */
export const addMapLoadHandler = (handler) => {
  mapLoadHandlers.push(handler);
};

/**
 * Обработчик события load у map, который активирует mapFiltersForm и
 * извещает подписчиков о событии, вызывает переданные обработчики события
 */
const handleMapLoad = () => {
  activateMapFiltersForm();

  /**
   * Проверяем, есть ли обработчики подписчиков
   */
  if (mapLoadHandlers.length) {
    /**
     * Осуществляем перебор массива с обработчиками подписчиков
     */
    mapLoadHandlers.forEach((handler) => {
      /**
       * Вызываем обработчик подписчика
       */
      handler();
    });
  }
};

const map = L.map('map-canvas').on('load', handleMapLoad);

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

const mainPinMarkerMoveEndHandlers = [];

export const addMainPinMarkerMoveEndHandler = (handler) => {
  mainPinMarkerMoveEndHandlers.push(handler);
};

const handleMainPinMarkerMoveEnd = () => {
  const coordinates = mainPinMarker.getLatLng();

  if (mainPinMarkerMoveEndHandlers.length) {
    mainPinMarkerMoveEndHandlers.forEach((handler) => {
      /**
       * Разница от реализации сверху - передаем данные обработчику подписчика,
       * чтобы как-то обработать движение метки по карте в другом модуле
       */
      handler(coordinates);
    });
  }
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

export const initMap = () => {
  map.setView(MAP_CENTER_COORDINATES, MAP_SCALE);

  const advs = createAndFillArray(10, createAdv);

  advs.forEach(createPinMarker);
};
