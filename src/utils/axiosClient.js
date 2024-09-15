import axios from "axios";
import axiosRetry from "axios-retry";
import { BASE_URL } from "../constants";
import {
  deleteToken,
  refreshTokenFromServer,
  retrieveAccessToken,
} from "../functions";
import { toast } from "react-toastify";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${retrieveAccessToken()}`, // Set initial token
  },
});

// Configure axios-retry
axiosRetry(apiClient, {
  retries: 3, // Number of retry attempts
  retryCondition: async (error) => {
    const { response } = error;
    // const navigate = useNavigate(); // Initialize navigation

    // If request failed with a 401 Unauthorized, try to refresh the token
    if (response?.status === 401 || response?.status === 403) {
      try {
        const newAccessToken = await refreshTokenFromServer();
        apiClient.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        // Update the Authorization header in the failed request
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return true; // Retry the request
      } catch (refreshError) {
        // If refreshing token fails, navigate to login page
        console.error("Refresh token error:", refreshError);
        deleteToken();
        // window.location.href = "/";
        return false; // Don't retry the request
      }
    }

    if (response?.status === 400) {
      toast.error(error.response.data.message);
    }

    // Retry on network errors or 5xx server errors
    return error.response?.status >= 500 || error.code === "ECONNABORTED";
  },
  retryDelay: (retryCount) => {
    // Exponential backoff
    return retryCount * 1000; // Retry after 1s, 2s, 3s, etc.
  },
});

export default apiClient;
