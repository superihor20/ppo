import cities from '../data/cities.json';

const helper = (x1, x2) => {
  return Math.pow(x1, 2) - 2 * x1 * x2 + Math.pow(x2, 2);
};

export const findClosestCity = (currentCoordinates) => {
  let maxDistance = Infinity;
  let closesCity = null;

  cities.forEach((city) => {
    const distance = Math.sqrt(
      helper(+currentCoordinates.latitude, +city.geometry.coordinates[1]) +
        helper(+currentCoordinates.longitude, +city.geometry.coordinates[0])
    );

    if (distance < maxDistance) {
      maxDistance = distance;
      closesCity = city;
    }
  });

  return closesCity;
};
