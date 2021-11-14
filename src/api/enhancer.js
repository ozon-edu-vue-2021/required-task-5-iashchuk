const imageNames = [
  "6123150777",
  "6126039472",
  "6126040354",
  "6128597660",
  "6134992334",
  "6136170572",
  "6136172483",
  "6140906765",
  "6142673815",
  "6142681673",
  "6142683276",
  "6148226736",
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generatePrice = () => getRandomInt(10, 1000);

const generateImage = () => {
  const index = getRandomInt(0, imageNames.length - 1);
  const name = imageNames[index];
  return require(`../assets/images/${name}.webp`);
};

export const enhanceProducts = (products) => {
  if (!products.length) {
    return [];
  }

  return products.map(({ dish, ...product }) => ({
    ...product,
    name: dish,
    price: generatePrice(),
    image: generateImage(),
  }));
};
