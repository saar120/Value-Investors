const getData = (key) => {
  const data = sessionStorage.getItem(key);
  return JSON.parse(data);
};

const setData = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export { setData, getData };
