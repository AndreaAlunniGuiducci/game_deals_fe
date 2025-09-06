import { addUser } from "../utils/addUser";
import { getJwt } from "../utils/getJwt";
import { routePath } from "../utils/routePath";

const BASE_URL = "http://127.0.0.1:8000/api/";
const token = getJwt();

const params = token
  ? {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  : {};

export const getDeals = async (
  paramsObj?: Record<string, string>,
  offset?: string | null
): Promise<{
  results: DealsList[];
  next: string | null;
  previous: string | null;
  count: number;
} | null> => {
  try {
    const apiParams = new URLSearchParams();
    if (paramsObj?.store) {
      apiParams.set("store__store_name", paramsObj.store);
    }
    if (paramsObj?.price) {
      if (paramsObj.price.includes("-")) {
        const [min, max] = paramsObj.price.split("-");
        apiParams.set("sale_price__gte", min);
        apiParams.set("sale_price__lte", max);
      } else if (paramsObj.price === "80") {
        apiParams.set("sale_price__gte", "80");
      }
    }
    if (paramsObj?.sorting) {
      apiParams.set("ordering", paramsObj.sorting);
    }
    if (!!offset) {
      apiParams.set("offset", offset);
    }
    if (paramsObj?.external_id) {
      apiParams.set("external_id", paramsObj.external_id);
    }

    const response = await fetch(
      `${BASE_URL}deals/${
        paramsObj || offset !== undefined ? "?" + apiParams.toString() : ""
      }`,
      {
        method: "GET",
        ...params,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching deals:", error);
    return null;
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
      addUser(data.access, data.username);
      return data;
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
      await loginUser({ username, password });
      window.location.href = routePath.home;
    }
  } catch (error) {
    console.error("Error registering user:", error);
  }
};
