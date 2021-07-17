const SERVER_URL = 'https://23.javascript.pages.academy/keksobooking';

export const loadAdvs = () => fetch(`${SERVER_URL}/data`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Не удалось загрузить объявления');
    }
  });

export const saveAdv = (body) => fetch(
  SERVER_URL,
  {
    method: 'POST',
    body,
  },
);
