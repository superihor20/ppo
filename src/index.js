import './assets/styles/index.scss';
import { isIOS } from './helpers/isIOS';
import { startCompass } from './helpers/startCompass';

const info = {
  positionOfDangerItem: null,
  directionOfDangerItem: null,
  city: null,
};

(() => {
  let pointDegree;

  const directions = document.querySelector('.compass');
  const acceptButton = document.querySelector('.accept-button');
  const dangerButtons = document.querySelectorAll('.danger-button');

  const onDangerButtonClick = (e) => {
    const iconType = e.target.dataset.type;
    acceptButton.innerHTML = '';
    acceptButton.appendChild(createImage(icons[iconType]));
  };

  dangerButtons.forEach((button) => {
    button.addEventListener('click', onDangerButtonClick);
  });

  // const locationHandler = (position) => {
  //   const { latitude, longitude } = position.coords;
  //   pointDegree = calcDegreeToPoint(latitude, longitude);

  //   if (pointDegree < 0) {
  //     pointDegree = pointDegree + 360;
  //   }
  // };

  const compassHandler = (e) => {
    const compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    directions.style.transform = `rotate(${-compass}deg)`;
  };

  const init = () => {
    const initStart = () => {
      startCompass(compassHandler);
      acceptButton.removeEventListener('click', initStart);
      acceptButton.innerHTML = '';
    };

    acceptButton.addEventListener('click', initStart);
    // navigator.geolocation.getCurrentPosition(locationHandler);
  };

  // const calcDegreeToPoint = (latitude, longitude) => {
  //   // Qibla geolocation
  //   const point = {
  //     lat: 21.422487,
  //     lng: 39.826206,
  //   };

  //   const phiK = (point.lat * Math.PI) / 180.0;
  //   const lambdaK = (point.lng * Math.PI) / 180.0;
  //   const phi = (latitude * Math.PI) / 180.0;
  //   const lambda = (longitude * Math.PI) / 180.0;
  //   const psi =
  //     (180.0 / Math.PI) *
  //     Math.atan2(
  //       Math.sin(lambdaK - lambda),
  //       Math.cos(phi) * Math.tan(phiK) -
  //         Math.sin(phi) * Math.cos(lambdaK - lambda)
  //     );
  //   return Math.round(psi);
  // };

  init();
})();
