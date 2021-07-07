import {createAdv} from './mocks/adv.js';
import {createAdCard} from './ad-card.js';
import './ad-form.js';

const ad = createAdv();
const adCard = createAdCard(ad);

const mapCanvas = document.querySelector('.map__canvas');

mapCanvas.appendChild(adCard);
