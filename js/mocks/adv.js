import {createAuthor} from './author.js';
import {createOffer} from './offer.js';
import {createLocation} from './location.js';

export const createAdv = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation(),
});
