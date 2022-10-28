import './assets/styles/index.scss';
import drone from '../src/assets/icons/drone.svg';
import helicopter from '../src/assets/icons/helicopter.svg';
import missile from '../src/assets/icons/missile.svg';
import plane from '../src/assets/icons/plane.svg';

const icons = {
  drone,
  helicopter,
  missile,
  plane,
};

const info = {
  positionOfDangerItem: null,
  directionOfDangerItem: null,
  city: null,
};

const createImage = (src) => {
  const image = document.createElement('img');
  image.setAttribute('src', src);

  return image;
};

(() => {
  const isIOS =
    navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
    navigator.userAgent.match(/AppleWebKit/);
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

  let pointDegree;
  let compass;

  const locationHandler = (position) => {
    const { latitude, longitude } = position.coords;
    pointDegree = calcDegreeToPoint(latitude, longitude);

    if (pointDegree < 0) {
      pointDegree = pointDegree + 360;
    }
  };

  const handler = (e) => {
    compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    directions.style.transform = `rotate(${-compass}deg)`;
  };

  const startCompass = () => {
    if (isIOS) {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handler, true);
          } else {
            alert('has to be allowed!');
          }
        })
        .catch(() => alert('not supported'));
    }
  };

  const init = () => {
    const initStart = () => {
      startCompass();
      acceptButton.removeEventListener('click', initStart);
    };

    acceptButton.addEventListener('click', initStart);
    navigator.geolocation.getCurrentPosition(locationHandler);

    if (!isIOS) {
      window.addEventListener('deviceorientationabsolute', handler, true);
    }
  };

  const calcDegreeToPoint = (latitude, longitude) => {
    // Qibla geolocation
    const point = {
      lat: 21.422487,
      lng: 39.826206,
    };

    const phiK = (point.lat * Math.PI) / 180.0;
    const lambdaK = (point.lng * Math.PI) / 180.0;
    const phi = (latitude * Math.PI) / 180.0;
    const lambda = (longitude * Math.PI) / 180.0;
    const psi =
      (180.0 / Math.PI) *
      Math.atan2(
        Math.sin(lambdaK - lambda),
        Math.cos(phi) * Math.tan(phiK) -
          Math.sin(phi) * Math.cos(lambdaK - lambda)
      );
    return Math.round(psi);
  };

  init();
})();
