const ACCUSATIVE_AND_PLURAL_NUMBER_1 = 5;
const ACCUSATIVE_AND_PLURAL_NUMBER_2 = 11;
const ACCUSATIVE_AND_PLURAL_NUMBER_3 = 20;
const ACCUSATIVE_AND_PLURAL_NUMBER_4 = 10;
const ACCUSATIVE_AND_PLURAL_NUMBER_5 = 100;
const NOMINATIVE_AND_SINGULAR_NUMBER = 1;
const GENITIVE_AND_PLURAL_NUMBER_1 = 2;
const GENITIVE_AND_PLURAL_NUMBER_2 = 4;

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

  const mod10 = number % ACCUSATIVE_AND_PLURAL_NUMBER_4;
  const mod100 = number % ACCUSATIVE_AND_PLURAL_NUMBER_5;

  switch (true) {
    case mod100 >= ACCUSATIVE_AND_PLURAL_NUMBER_2 && mod100 <= ACCUSATIVE_AND_PLURAL_NUMBER_3:
      return many || two;

    case mod10 > ACCUSATIVE_AND_PLURAL_NUMBER_1:
      return many || two;

    case mod10 === NOMINATIVE_AND_SINGULAR_NUMBER:
      return one;

    case mod10 >= GENITIVE_AND_PLURAL_NUMBER_1 && mod10 <= GENITIVE_AND_PLURAL_NUMBER_2:
      return two;

    default:
      return many || two;
  }
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

export const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle

export const throttle = (callback, delayBetweenFrames) => {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};
