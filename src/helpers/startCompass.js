import { isIOS } from './isIOS';

export const startCompass = (handler) => {
  if (isIOS()) {
    if (!DeviceOrientationEvent?.requestPermission) {
      alert(
        'Probably you trying to run application from computer, please use your smartphone'
      );

      return false;
    }

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
    window.addEventListener('deviceorientationabsolute', handler, true);
  }

  return true;
};
