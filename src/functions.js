import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_URL, REFRESH_TOKEN_URL } from "./constants";
import { format, parse } from "date-fns";

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
    email: decodedToken?.email,
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

// Function to convert base64 string to image url
/**
 * Converts a Base64 encoded string to a URL.
 * @param {string} base64String - The Base64 encoded string.
 * @returns {string} - The decoded URL.
 */
export const base64ToUrl = (base64String) => {
  try {
    // Decode the Base64 string
    const decodedString = atob(base64String);
    // Return the decoded URL
    return decodedString;
  } catch (error) {
    console.error("Failed to decode Base64 string:", error);
    return null;
  }
};

export const getTwoLettersFromName = (name) => {
  const parts = name.trim().split(" ");

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  return "";
};

export const formatDateToHumanReadableForm = (date) => {
  const formattedDate = format(date, "MMMM do, yyyy");
  return formattedDate;
};

export const formatTimeToHumanReadableForm = (date, time) => {
  const timeWithoutMilliseconds = time.split(".")[0];
  const dateTimeString = `${date} ${timeWithoutMilliseconds}`;
  const parsedDate = parse(dateTimeString, "yyyy-MM-dd HH:mm:ss", new Date());
  const time12Hour = format(parsedDate, "hh:mm a");
  return time12Hour;
};

export const storeCurrentSelectedBoardroomId = (boardroomId) => {
  if (boardroomId) {
    sessionStorage.setItem("currentSelectedBoardroom", boardroomId);
  }
};

export const getCurrentSelectedBoardroomId = () => {
  return sessionStorage.getItem("currentSelectedBoardroom");
};

export const changeFromCSVToList = (csvString) => {
  return csvString?.split(",");
};

export const checkEmailValidity = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
