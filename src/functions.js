import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BASE_URL, REFRESH_TOKEN_URL } from "./constants";
import { format, parse, parseISO } from "date-fns";

const tokenKeyName = "authToken";
const selectedCalendarDateKey = "selectedCalendarDate";

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
    fullName: decodedToken?.fullName,
    role: decodedToken?.role,
    email: decodedToken?.email,
    timezone: decodedToken?.timezone,
    id: decodedToken?.id,
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
    const encodedBase64Url = btoa(decodedString);
    return encodedBase64Url;
  } catch (error) {
    console.error("Failed to decode Base64 string:", error);
    return null;
  }
};

export const getTwoLettersFromName = (name) => {
  if (!name) {
    return "";
  }
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

export const storeCurrentSelectedReservationId = (reservationId) => {
  if (reservationId) {
    sessionStorage.setItem("currentSelectedReservation", reservationId);
  }
};

export const getCurrentSelectedReservationId = () => {
  return sessionStorage.getItem("currentSelectedReservation");
};

export const changeFromCSVToList = (csvString) => {
  return csvString?.split(",");
};

export const changeFromListToCSV = (list) => {
  return list?.join(",");
};

export const checkEmailValidity = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // Event listener to handle when the file has been read
    reader.onloadend = () => {
      resolve(reader.result);
    };

    // Event listener to handle any errors
    reader.onerror = reject;
    // Read the file as a data URL (Base64)
    reader.readAsDataURL(file);
  });
};

export const removeBase64Prefix = (base64String) => {
  // Check if the string contains a comma, which indicates the presence of a prefix
  if (base64String.includes(",")) {
    // Split the string and return the part after the comma (the actual Base64 data)
    return base64String.split(",")[1];
  }
  // If there's no prefix, return the original string
  return base64String;
};

export const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1]; // Remove the data URL prefix
      resolve(base64String);
    };

    reader.onerror = reject; // Handle errors

    reader.readAsDataURL(blob); // Read the Blob as a data URL
  });
};

export const convertDateAndTimeToUtcIsoString = (date, time) => {
  const combinedDateTime = `${date}T${time}`;
  const localDateTime = new Date(combinedDateTime);
  const utcDateTimeISO = localDateTime.toISOString();
  return utcDateTimeISO;
};

export const joinDateAndTime = (date, time) => {
  const combinedDateTime = `${date}T${time}`;
  const localDateTime = new Date(combinedDateTime);
  return localDateTime;
};

export const getHumanFriendlyDateTime = (isoString) => {
  // Parse the ISO string to a JavaScript Date object
  const parsedDate = parseISO(isoString);

  // Format the date as human-friendly (e.g., 'October 12, 2024')
  const humanFriendlyDate = format(parsedDate, "MMMM dd, yyyy");

  // Format the time as human-friendly (e.g., '2:30 PM')
  const humanFriendlyTime = format(parsedDate, "hh:mm a");

  // Return the date and time in an array
  return [humanFriendlyDate, humanFriendlyTime];
};

export const storeSelectedCalendarDate = (date) => {
  sessionStorage.setItem(selectedCalendarDateKey, JSON.stringify(date));
};

export const getSelectedCalendarDate = () => {
  const selectedDateString = sessionStorage.getItem(selectedCalendarDateKey);
  if (selectedDateString) {
    const selectedDate = JSON.parse(selectedDateString);
    return selectedDate;
  } else {
    return null;
  }
};

export const removeSelectedCalendarDate = () => {
  sessionStorage.removeItem(selectedCalendarDateKey);
};

export const getDateAndTimeFromDateIsoString = (localeDateString) => {
  // Parse the date using the locale string
  const date = new Date(localeDateString);
  // Extract the components and format to ISO without changing time
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Create ISO format compatible with <input type="datetime-local">
  const isoDateForInput = `${year}-${month}-${day}T${hours}:${minutes}`;
  const dLs = isoDateForInput.split("T");
  const dateString = dLs[0];
  const timeString = dLs[1];
  return [dateString, timeString];
};
