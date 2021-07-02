export const getRandomNumberInRange = (min, max) => {
  if (min >= max || min < 0) {
    throw new Error('Допускаются только положительные числа в диапазоне от меньшего к большему и не равные друг другу');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomFloatNumberInRange = (min, max, accuracy) => {
  if (min >= max || min < 0) {
    throw new Error('Допускаются только положительные числа в диапазоне от меньшего к большему и не равные друг другу');
  }
  const randomFloatNumber = min + Math.random() * (max - min);
  return parseFloat(randomFloatNumber.toFixed(accuracy));
};

export const getRandomArrayElement = (elements) => elements[getRandomNumberInRange(0, elements.length - 1)];

export const getRandomArray = (array) => {
  const randomArray = Array.from({length: getRandomNumberInRange(1, array.length)}).map(() => getRandomArrayElement(array));
  return [...new Set(randomArray)];
};

export const pluralize = (number, wordForms) => {
  const [one, two, many] = wordForms;

  const mod10 = number % 10;
  const mod100 = number % 100;

  switch (true) {
    case mod100 >= 11 && mod100 <= 20:
      return many || two;

    case mod10 > 5:
      return many || two;

    case mod10 === 1:
      return one;

    case mod10 >= 2 && mod10 <= 4:
      return two;

    default:
      return many || two;
  }
};

export const createAndFillArray = (length, fnOrValue) => {
  if (typeof fnOrValue === 'function') {
    return Array.from({length}).map(() => fnOrValue());
  }

  return Array.from({length}).fill(fnOrValue);
};

export const getFirstArrayElement = (array) => array[0];
