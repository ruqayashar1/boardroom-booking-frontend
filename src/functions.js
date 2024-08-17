import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_URL, REFRESH_TOKEN_URL } from "./constants";

const tokenKeyName = "authToken";

const retrieveToken = () => {
  try {
    const tokenInstanceString = localStorage.getItem(tokenKeyName);
    const tokenInstance = JSON.parse(tokenInstanceString);
    return tokenInstance;
  } catch (error) {
    console.error("Failed to retrieve tokenInstance:", error);
    return null;
  }
};

export const storeToken = (tokenInstance) => {
  try {
    localStorage.setItem(tokenKeyName, JSON.stringify(tokenInstance));
  } catch (error) {
    console.error("Failed to store token:", error);
  }
};

export const retrieveAccessToken = () => {
  const tokenInstance = retrieveToken();
  const token = tokenInstance?.accessToken;
  return token;
};

export const retrieveRefreshToken = () => {
  const tokenInstance = retrieveToken();
  const token = tokenInstance?.refreshToken;
  return token;
};

export const deleteToken = () => {
  try {
    localStorage.removeItem(tokenKeyName);
  } catch (error) {
    console.error("Failed to delete token:", error);
  }
};

export const decodeToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Invalid JWT token:", error);
    return null;
  }
};

export const getUserInfoFromDecodedToken = (token) => {
  const decodedToken = decodeToken(token);
  return {
    username: decodedToken?.sub,
    name: decodedToken?.fullName,
    role: decodedToken?.role,
  };
};

export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }
  try {
    const decoded = jwtDecode(token);
    // Get the current time and compare with expiration time
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

// Function to refresh the token
export const refreshTokenFromServer = async () => {
  try {
    const response = await axios.post(BASE_URL.concat(REFRESH_TOKEN_URL), {
      refreshToken: retrieveRefreshToken(), // Pass refresh token
    });
    const { accessToken } = response.data;
    storeToken(response.data); // Store the new token
    return accessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
};
