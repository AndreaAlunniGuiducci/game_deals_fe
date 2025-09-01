const jwt = document.cookie
  .split("; ")
  .find((row) => row.startsWith("jwt="))
  ?.split("=")[1];

export const getJwt = (): string | null => {
  return jwt ?? null;
};
