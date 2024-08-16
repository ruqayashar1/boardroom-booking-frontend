import { jwtDecode } from "jwt-decode";

const tokenKeyName = "authToken";

export const storeToken = (token) => {
  try {
    localStorage.setItem(tokenKeyName, token);
  } catch (error) {
    console.error("Failed to store token:", error);
  }
};

export const retrieveToken = () => {
  try {
    const token = localStorage.getItem(tokenKeyName);
    if (token) {
      return token;
    } else {
      console.warn("No token found.");
      return null;
    }
  } catch (error) {
    console.error("Failed to retrieve token:", error);
    return null;
  }
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
