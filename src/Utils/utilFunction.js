const delayedState = (timeout, callback) => {
  callback(true);
  setTimeout(() => callback(false), timeout);
};

export { delayedState };
