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

  (() => {
    let compass;
    const isIOS =
      navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
      navigator.userAgent.match(/AppleWebKit/);

    function init() {
      acceptButton.addEventListener('click', startCompass);
      navigator.geolocation.getCurrentPosition(locationHandler);

      if (!isIOS) {
        window.addEventListener('deviceorientationabsolute', handler, true);
      }
    }

    function startCompass() {
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
    }

    function handler(e) {
      compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
      directions.style.transform = `translate(-50%, -50%) rotate(${-compass}deg)`;

      // ±15 degree
      if (
        (pointDegree < Math.abs(compass) &&
          pointDegree + 15 > Math.abs(compass)) ||
        pointDegree > Math.abs(compass + 15) ||
        pointDegree < Math.abs(compass)
      ) {
        myPoint.style.opacity = 0;
      } else if (pointDegree) {
        myPoint.style.opacity = 1;
      }
    }

    let pointDegree;

    function locationHandler(position) {
      const { latitude, longitude } = position.coords;
      pointDegree = calcDegreeToPoint(latitude, longitude);

      if (pointDegree < 0) {
        pointDegree = pointDegree + 360;
      }
    }

    function calcDegreeToPoint(latitude, longitude) {
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
    }

    init();
  })();
})();
