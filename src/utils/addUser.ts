export const addUser = (jwt: string): void => {
  document.cookie = `jwt=${jwt}; path=/;`;
};
