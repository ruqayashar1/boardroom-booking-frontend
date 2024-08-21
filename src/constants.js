export const BASE_URL = "http://localhost:8080";
export const AUTH_URL = "/auth/login";
export const REFRESH_TOKEN_URL = "/auth/refresh-token";
export const TIMEZONES_FETCH_URL = "/user-timezones";
export const BOARDROOM_URL = "/boardrooms";
export const RESERVATION_URL = "/reservations";
export const UPCOMING_RESERVATIONS_URL = "/upcoming-reservations";
export const LIVE_MEETINGS_URL = "/live-meetings";
export const LOCKED_BOARDROOM_URL = "/locked-boardrooms";

export const LOCKED_BOARDROOM_MESSAGE_URL = (boardroomId) =>
  `/boardrooms/${boardroomId}/lock-message`;
export const BOARDROOM_RESESERVATIONS_URL = (boardroomId) =>
  `/boardrooms/${boardroomId}/reservations`;
