const sessionStore = {};

const removeItem = () => {};

const setItem = (key, value) => {
  sessionStore[key] = value;
};

const getItem = key => (
  (Object.keys(sessionStore).includes(key))
    ? sessionStore[key]
    : null
);

const sessionStorage = {
  removeItem,
  setItem,
  getItem,
};

export default {
  sessionStorage,
};
