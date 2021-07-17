let renderedAlert;
let renderedAlertTimeout;

/**
 * @typedef ButtonParams
 * @property {string} text
 * @property {function(Event): void} onClick
 */

const handleWindowEscKeyDown = (evt) => {
  if (!evt.code === 'Escape') {
    return;
  }

  if (evt.code === 'Escape') {
    renderedAlert.remove();
    if (renderedAlertTimeout) {
      clearTimeout(renderedAlertTimeout);

      renderedAlertTimeout = undefined;
    }
  }
};

export const hideAlert = () => {
  if (!renderedAlert) {
    return;
  }

  renderedAlert.remove();

  renderedAlert = undefined;

  if (renderedAlertTimeout) {
    clearTimeout(renderedAlertTimeout);

    renderedAlertTimeout = undefined;
  }

  window.removeEventListener('keydown', handleWindowEscKeyDown);
};

const createAlert = (message, buttonParams, isError) => {
  const alertTemplate = document.querySelector('#alert');

  if (alertTemplate === null) {
    throw new Error('Не найден alertTemplate');
  }

  const alertTemplateContent = alertTemplate.content.querySelector('.alert');

  if (alertTemplateContent === null) {
    throw new Error('Не найден alertTemplateContent');
  }

  const alert = alertTemplateContent.cloneNode(true);

  const alertMessage = alert.querySelector('.alert__message');
  const alertButton = alert.querySelector('.alert__button');

  if (alertMessage === null || alertButton === null) {
    throw new Error('В alert отсутствуют необходимые элементы');
  }

  alertMessage.textContent = message;

  const handleClickOutsideAlert = (evt) => {
    if (evt.target !== alert) {
      return;
    }

    hideAlert();
  };

  alert.addEventListener('click', handleClickOutsideAlert);

  if (buttonParams) {
    alertButton.textContent = buttonParams.text;
    alertButton.addEventListener('click', buttonParams.onClick);
  } else {
    alertButton.remove();
  }

  if (isError) {
    alert.classList.add('alert_error');
  }

  return alert;
};

export const showAlert = (alertParams, timeout) => {
  if (renderedAlert) {
    hideAlert();
  }

  renderedAlert = document.body.appendChild(createAlert(alertParams.message, alertParams.buttonParams, alertParams.isError));

  window.addEventListener('keydown', handleWindowEscKeyDown);

  if (timeout) {
    renderedAlertTimeout = setTimeout(() => {
      hideAlert();
    }, timeout);
  }
};
