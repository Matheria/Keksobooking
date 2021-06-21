export function getRandomNumberInRange(min, max) {
  if (min >= max || min < 0) {
    throw new Error('Допускаются только положительные числа в диапазоне от меньшего к большему и не равные друг другу');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloatNumberInRange(min, max, accuracy) {
  if (min >= max || min < 0) {
    throw new Error('Допускаются только положительные числа в диапазоне от меньшего к большему и не равные друг другу');
  }
  const randomFloatNumber = min + Math.random() * (max - min);
  return parseFloat(randomFloatNumber.toFixed(accuracy));
}

export const getRandomArrayElement = (elements) => elements[getRandomNumberInRange(0, elements.length - 1)];

export const getRandomArray = (array) => {
  const randomArray = Array.from({length: getRandomNumberInRange(1, array.length)}).map(() => getRandomArrayElement(array));
  return [...new Set(randomArray)];
};


