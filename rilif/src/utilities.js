
export const storeCredentials = (credentials) => {
  window.localStorage.setItem('user', JSON.stringify(credentials));
}

export const checkUser = (address) => {
  return false;
}

export const getUser = () => {
  const user = window.localStorage.getItem('user');
  if (user) return JSON.parse(user);
  return null;
}

export default {
  storeCredentials,
  checkUser
}
