import axios from "axios";
import { baseUrl } from "./services";

/**
 * Registers a new user by sending a POST request to the signup endpoint.
 *
 * @param {string} username - The user's username.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - A promise that resolves with the response data.
 * @throws {Error} - Throws an error if the request fails or if validation fails.
 */
export const signup = async (username, email, password) => {
  try {
    // console.log("Data being sent:", {
    //   username,
    //   email,
    //   password,
    // });
    const response = await axios.post(
      `http://localhost:5000/api/users/signup`,
      {
        username,
        email,
        password,
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          throw new Error(
            data.message || "Invalid request. Please check your input."
          );
        case 409:
          throw new Error(data.message || "Username already exists.");
        case 500:
          throw new Error(
            data.message || "Server error. Please try again later."
          );
        default:
          throw new Error(data.message || "An unexpected error occurred.");
      }
    } else if (error.request) {
      throw new Error("Network error: Please check your internet connection.");
    } else {
      throw new Error("An error occurred while making the request.");
    }
  }
};
