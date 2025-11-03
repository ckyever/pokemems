function getRandomInteger(startInteger, endInteger) {
  return (
    Math.floor(Math.random() * (endInteger - startInteger + 1)) + startInteger
  );
}

export { getRandomInteger };
