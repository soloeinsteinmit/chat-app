import axios from "axios";
import { baseUrl } from "./services";

export const signup = async (username, email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/signup`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response.status === 409) {
      throw new Error("Username already exists");
    } else if (error.response.status === 400) {
      throw new Error("Bad request");
    } else {
      throw new Error("An error occurred");
    }
  }
};
