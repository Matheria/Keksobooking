import {activateMapFiltersForm, deactivateMapFiltersForm, addMapFiltersFormChangeHandler} from './map-filters-form.js';
import {createAdCard} from './ad-card.js';
import * as fetch from '../fetch.js';
import {showAlert} from '../alert.js';
import {setAdvs, getAdvs} from '../state.js';
import {MAP_CENTER_COORDINATES, MAP_SCALE, MAX_PINS_ON_MAP} from './constants.js';

if (!L) {
  throw new Error ('Leaflet не найден');
}

deactivateMapFiltersForm();

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

let pinMarkersLayerGroup;

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
  if (!pinMarkersLayerGroup) {
    throw new Error('Отстуствует слой для отображения меток');
  }

  L.marker(
    point.location,
    {
      icon: L.icon ({
        iconUrl: './img/pin.svg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      }),
    },
  ).addTo(pinMarkersLayerGroup)
    .bindPopup(createAdCard(point),
      {
        keepInView:true,
      },
    );
};

const destroyPinMarkers = () => {
  if (!pinMarkersLayerGroup) {
    return;
  }

  map.removeLayer(pinMarkersLayerGroup);

  pinMarkersLayerGroup = undefined;
};

const createPinMarkers = (advs) => {
  if (pinMarkersLayerGroup) {
    destroyPinMarkers();
  }

  pinMarkersLayerGroup = L.layerGroup();

  advs.forEach(createPinMarker);

  map.addLayer(pinMarkersLayerGroup);
};

const loadAdvs = () => {
  fetch.loadAdvs()
    .then((advs) => {
      setAdvs(advs);

      createPinMarkers(
        getAdvs().slice(0, MAX_PINS_ON_MAP),
      );
    })
    .catch(() => {
      showAlert({
        message: 'Не удалось загрузить данные',
        buttonParams: {
          text: 'Попробовать ещё раз',
          onClick: () => {
            loadAdvs();
          },
        },
        isError: true,
      });
    });
};

export const initMap = () => {
  map.setView(MAP_CENTER_COORDINATES, MAP_SCALE);
  loadAdvs();
};

export const resetMap = () => {
  mainPinMarker.setLatLng(MAP_CENTER_COORDINATES);
  map.setView(MAP_CENTER_COORDINATES, MAP_SCALE);
  map.closePopup();
};

const handleMapFiltersFormChange = (advs) => {
  if (pinMarkersLayerGroup) {
    destroyPinMarkers();
  }

  createPinMarkers(advs);
};

addMapFiltersFormChangeHandler(handleMapFiltersFormChange);
