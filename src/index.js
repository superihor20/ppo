import './assets/styles/index.scss';
import { icons } from './constants/icons';
import { createImageElement } from './helpers/dom/createImageElement';
import { findClosestCity } from './helpers/findClosestCity';
import { getCurrentPosition } from './helpers/getCurrentPosition';
import { startCompass } from './helpers/startCompass';

(() => {
  let selectedDanger = null;
  const directions = document.querySelector('.compass');
  const acceptButton = document.querySelector('.accept-button');
  const dangerButtons = document.querySelectorAll('.danger-button');
  const modal = document.querySelector('.danger-popup-wrapper');
  const closeModalButton = document.querySelector('.close-modal-button');
  const dangerPositionLatitude = document.querySelector(
    '.danger-position-latitude'
  );
  const dangerPositionLongitude = document.querySelector(
    '.danger-position-longitude'
  );
  const capital = document.querySelector('.danger-capital');
  const country = document.querySelector('.danger-country');

  const onDangerButtonClick = (e) => {
    const iconType = e.target.dataset.type;
    acceptButton.innerHTML = '';
    acceptButton.appendChild(createImageElement(icons[iconType]));
    selectedDanger = iconType;
  };

  const compassHandler = (e) => {
    const compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    directions.style.transform = `rotate(${-compass}deg)`;
  };

  const openModal = (info) => {
    modal.style.display = 'flex';
    dangerPositionLatitude.innerHTML = info.positionOfDangerItem.latitude;
    dangerPositionLongitude.innerHTML = info.positionOfDangerItem.longitude;
    capital.innerHTML = info.posibleTarget.capital;
    country.innerHTML = info.posibleTarget.country;
  };

  const closeModal = () => {
    modal.style.display = 'none';
    dangerPositionLatitude.innerHTML = '';
    dangerPositionLongitude.innerHTML = '';
    capital.innerHTML = '';
    country.innerHTML = '';
  };

  const getInfoAboutDanger = async () => {
    if (!selectedDanger) {
      alert('First you need to select a type of danger');

      return;
    }

    acceptButton.setAttribute('disabled', 'disabled');

    const currentPosition = await getCurrentPosition();
    const closestCity = findClosestCity(currentPosition);

    openModal({
      positionOfDangerItem: {
        latitude: currentPosition.latitude,
        longitude: currentPosition.longitude,
      },
      posibleTarget: {
        capital: closestCity.properties.capital,
        country: closestCity.properties.country,
      },
    });

    acceptButton.removeAttribute('disabled');
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
      acceptButton.addEventListener('click', getInfoAboutDanger);
    };

    acceptButton.addEventListener('click', initCompass);
  };

  dangerButtons.forEach((button) => {
    button.addEventListener('click', onDangerButtonClick);
  });
  closeModalButton.addEventListener('click', closeModal);

  init();
})();
