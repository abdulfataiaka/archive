
const newUserSchema = {
  name: 'Aka Abdulfatai',
  username: 'abdulfatai',
  email: 'abdulfataiaka@gmail.com',
  password: 'fatty12345',
};

const updateUserSchema = {
  name: 'Akhar Fatai',
  email: null,
  gender: 'male',
};

const authUserSchema = {
  username: 'abdulfatai',
  password: 'fatty12345',
};

const passwordSchema = {
  currentPassword: 'fatty12345',
  newPassword: 'fatty12345',
};

export const newUser = (update) => {
  let user = { ...newUserSchema };
  if (update && typeof update === 'object') {
    user = { ...user, ...update };
  }
  return user;
};

export const authUser = (update) => {
  let user = { ...authUserSchema };
  if (update && typeof update === 'object') {
    user = { ...user, ...update };
  }
  return user;
};

export const updatePassword = (update) => {
  let passwds = { ...passwordSchema };
  if (update && typeof update === 'object') {
    passwds = { ...passwds, ...update };
  }
  return passwds;
};

export const updateUser = (update) => {
  let user = { ...updateUserSchema };
  if (update && typeof update === 'object') {
    user = { ...user, ...update };
  }
  return user;
};

export default {
  newUser,
  authUser,
  updatePassword,
  updateUser,
};
