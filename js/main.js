import {createAdv} from './mocks/adv.js';
import {createAdCard} from './ad-card.js';
import {deactivateAdForm} from './ad-form.js';
import {deactivateMapFiltersForm} from './map-filters-form.js';

const ad = createAdv();
const adCard = createAdCard(ad);

const mapCanvas = document.querySelector('.map__canvas');

mapCanvas.appendChild(adCard);

deactivateAdForm();
deactivateMapFiltersForm();
