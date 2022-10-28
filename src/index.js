import './assets/styles/index.scss';
import { icons } from './constants/icons';
import { createImageElement } from './helpers/dom/createImageElement';
import { startCompass } from './helpers/startCompass';

const info = {
  positionOfDangerItem: null,
  directionOfDangerItem: null,
  city: null,
};

(() => {
  const directions = document.querySelector('.compass');
  const acceptButton = document.querySelector('.accept-button');
  const dangerButtons = document.querySelectorAll('.danger-button');

  const onDangerButtonClick = (e) => {
    const iconType = e.target.dataset.type;
    acceptButton.innerHTML = '';
    acceptButton.appendChild(createImageElement(icons[iconType]));
  };

  dangerButtons.forEach((button) => {
    button.addEventListener('click', onDangerButtonClick);
  });

  const compassHandler = (e) => {
    const compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    directions.style.transform = `rotate(${-compass}deg)`;
  };

  const init = () => {
    const initCompass = async () => {
      const isCompassStarted = await startCompass(compassHandler);

      if (isCompassStarted) {
        acceptButton.innerHTML = '';

        dangerButtons.forEach((button) => {
          button.removeAttribute('disabled');
        });
      } else {
        acceptButton.innerHTML = '😢';
      }

      acceptButton.removeEventListener('click', initCompass);
    };

    acceptButton.addEventListener('click', initCompass);
  };

  init();
})();
