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
  const directions = document.querySelector('.directions');
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
  DeviceOrientationEvent.requestPermission().then(() => {
    let gyroscope = new Gyroscope({ frequency: 60 });
    const start = document.createElement('span');
    start.innerHTML = 'somess';
    directions.appendChild(start);
    gyroscope.addEventListener('reading', (e) => {
      const s = document.createElement('span');
      const res = `Angular velocity along the X-axis ${gyroscope.x}
      Angular velocity along the Y-axis ${gyroscope.y}
      Angular velocity along the Z-axis ${gyroscope.z}`;
      s.innerHTML = res;
      // directions.innerHTML = '';
      directions.appendChild(s);
    });
    gyroscope.start();
  });
})();
