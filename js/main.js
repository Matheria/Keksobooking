import {createAdv} from './mocks/adv.js';
import {createAdCard} from './ad-card.js';
import {inactivePage} from './forms-state.js';
import {activePage} from './forms-state.js';

const ad = createAdv();
const adCard = createAdCard(ad);

const mapCanvas = document.querySelector('.map__canvas');

mapCanvas.appendChild(adCard);

inactivePage();
