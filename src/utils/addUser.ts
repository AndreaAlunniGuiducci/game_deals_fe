export const addUser = (jwt: string, username: string): void => {
  document.cookie = `jwt=${jwt}; path=/;`;
  document.cookie = `username=${username}; path=/;`;
};
