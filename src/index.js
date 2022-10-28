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

  const isIOS = !(
    navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
    navigator.userAgent.match(/AppleWebKit/)
  );

  console.log(isIOS);

  let compass;

  (() => {
    alert('started');
    if (isIOS) {
      alert('ios');
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handler, true);
          } else {
            alert('has to be allowed!');
          }
        })
        .catch(() => alert('not supported'));
    } else {
      alert('not ios');
      window.addEventListener('deviceorientationabsolute', handler, true);
    }
  })();

  function handler(e) {
    alert('ya nadler');
    compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    alert(compass, 'compass');
    directions.style.transform = `translate(-50%, -50%) rotate(${-compass}deg)`;
  }
})();
