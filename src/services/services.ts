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

export const getDeals = async (): Promise<DealsList[]> => {
  try {
    const response = await fetch(`${BASE_URL}deals/`, {
      method: "GET",
      ...params,
    });
    const data = await response.json();
    console.log("DEALS DATA", data);
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
    fetch(`${BASE_URL}login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        addUser(data.access);
      });
  } catch (error) {
    console.error("Error logging in user:", error);
  }
};
