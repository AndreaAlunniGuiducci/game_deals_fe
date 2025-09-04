import { addUser } from "../utils/addUser";
import { getJwt } from "../utils/getJwt";

const BASE_URL = "http://127.0.0.1:8000/api/";
const token = getJwt();

const params = token
  ? {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  : {};

export const getDeals = async (): Promise<{ results: DealsList[] }> => {
  try {
    const response = await fetch(`${BASE_URL}deals/`, {
      method: "GET",
      ...params,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching deals:", error);
    return { results: [] };
  }
};

export const getStore = async () => {
  try {
    const response = await fetch(`${BASE_URL}store/`, {
      method: "GET",
      ...params,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching deals:", error);
    return [];
  }
};

export const loginUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.detail) {
      return { error: data.detail };
    } else {
      addUser(data.access);
      return;
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    return null;
  }
};

export const registerUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.error) {
      return data.error;
    } else {
      loginUser({ username, password });
      window.location.href = "/";
    }
  } catch (error) {
    console.error("Error registering user:", error);
  }
};
