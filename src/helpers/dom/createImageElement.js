export const createImageElement = (src) => {
  const image = document.createElement('img');
  image.setAttribute('src', src);

  return image;
};
