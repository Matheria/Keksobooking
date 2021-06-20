import {getRandomFloatNumberInRange} from '../utils.js';

const MIN_LATITUDE = 35.65000;

const MAX_LATITUDE = 35.70000;

const MIN_LONGITUDE = 139.70000;

const MAX_LONGITUDE = 139.80000;

export const createLocation = () => ({
  lat: getRandomFloatNumberInRange(MIN_LATITUDE, MAX_LATITUDE, 5),
  lng: getRandomFloatNumberInRange(MIN_LONGITUDE, MAX_LONGITUDE, 5),
});
