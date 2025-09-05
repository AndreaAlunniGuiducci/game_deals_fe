const jwt = document.cookie
  .split("; ")
  .find((row) => row.startsWith("jwt="))
  ?.split("=")[1];

const username = document.cookie
  .split("; ")
  .find((row) => row.startsWith("username="))
  ?.split("=")[1];

export const getJwt = (): string | null => {
  return jwt ?? null;
};

export const getUsername = (): string | null => {
  return username || null;
};
