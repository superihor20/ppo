import { isIOS } from './isIOS';

// return true if user gave an permissions and false if not
export const startCompass = async (handler) => {
  if (isIOS()) {
    try {
      if (!DeviceOrientationEvent?.requestPermission) {
        throw new Error('Some problem with device orientation permissions');
      }

      const response = await DeviceOrientationEvent.requestPermission();

      if (response === 'granted') {
        window.addEventListener('deviceorientation', handler, true);
      } else {
        throw new Error(
          "You didn't provide permissions. Sorry but you can't use this app, without giving an access."
        );
      }
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Someting went wrong');

      return false;
    }
  } else {
    window.addEventListener('deviceorientationabsolute', handler, true);
  }

  return true;
};
