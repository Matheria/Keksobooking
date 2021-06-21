import {createAdv} from './mocks/adv.js';

const ADV_COUNT = 10;

const adv = Array.from({length: ADV_COUNT}).map(() =>
  createAdv());

// eslint-disable-next-line no-console
console.log(adv);
