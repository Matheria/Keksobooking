function getRandomNumberInRange(min, max) {
  if (min >= max || min < 0) {
    throw new Error('Допускаются только положительные числа в диапазоне от меньшего к большему и не равные друг другу');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloatNumberInRange(min, max, accuracy) {
  if (min >= max || min < 0) {
    throw new Error('Допускаются только положительные числа в диапазоне от меньшего к большему и не равные друг другу');
  }
  const randomNumber = min + Math.random() * (max - min);
  return parseFloat(randomNumber.toFixed(accuracy));
}
