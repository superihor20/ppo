const options = {
  enableHighAccuracy: true,
};

export const getCurrentPosition = () => {
  return new Promise((success) => {
    const onSuccess = (pos) => {
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;

      success({ latitude, longitude });
    };

    const onError = (error) => {
      if (error instanceof GeolocationPositionError) {
        alert(`${error.message}`);

        return;
      }

      alert('Something went wrong, when trying to get your current position');
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  });
};
