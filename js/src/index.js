const test = (arr1, arr2) => {
  const filtered = arr1.filter(val => arr2.includes(val));
  return [...new Set(filtered)];
};

export default test;
