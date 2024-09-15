export const BASE_URL = "http://localhost:8080";
export const AUTH_URL = "/auth/login";
export const REFRESH_TOKEN_URL = "/auth/refresh-token";
export const TIMEZONES_FETCH_URL = "/user-timezones";
export const BOARDROOM_URL = "/boardrooms";
export const RESERVATION_URL = "/reservations";
export const UPCOMING_RESERVATIONS_URL = "/upcoming-reservations";
export const LIVE_MEETINGS_URL = "/live-meetings";
export const LOCKED_BOARDROOM_URL = "/locked-boardrooms";
export const FETCH_CURRENT_ADMINS_URL = "/system-administrators";
export const SYSTEM_ADMIN_URL = "/system-administrators";
export const FETCH_KEMRI_EMPLOYEES_URL = "/kemri-employees";
export const UPLOAD_IMAGE_URL = "/upload";
export const USERS_URL = "/users";

export const LOCKED_BOARDROOM_MESSAGE_URL = (boardroomId) =>
  `/boardrooms/${boardroomId}/lock-message`;
export const BOARDROOM_RESESERVATIONS_URL = (boardroomId) =>
  `/boardrooms/${boardroomId}/reservations`;
export const BOARDROOM_BY_ID_URL = (boardroomId) =>
  `/boardrooms/${boardroomId}`;
export const FETCH_BOARDROOM_EQUIPMENTS_URL = (boardroomId) =>
  `/boardrooms/${boardroomId}/equipments`;
export const FETCH_BOARDROOM_ADMINISTRATOR_URL = (boardroomId) =>
  `/boardrooms/${boardroomId}/administrator`;
export const FETCH_RESERVATION_BY_ID_URL = (reservationId) =>
  `/reservations/${reservationId}`;
export const DELETE_RESERVATION_BY_ID_URL = (reservationId) =>
  `/reservations/${reservationId}`;
export const RESERVATION_VENUE_CHANGE_BY_ID_URL = (reservationId) =>
  `/reservations/${reservationId}/change-venue`;
export const FETCH_FILE_BY_NAME_URL = (fileName) => `/files/${fileName}`;
export const UPDATE_USER_TIMEZONE_URL = (userId) => `/users/${userId}`;
export const FETCH_USER_BY_ID_URL = (userId) => `/users/${userId}`;
export const DELETE_SYSTEM_ADMIN_URL = (adminId) =>
  `/system-administrators/${adminId}`;
export const APPROVE_RESERVATION_URL = (reservationId) =>
  `/reservations/${reservationId}/approve`;
export const CREATE_RESERVATION_MEETING_LINK_URL = (reservationId) =>
  `/reservations/${reservationId}/add-meeting-link`;
export const CHANGE_BOARDROOM_ADMIN_URL = (boardroomId) =>
  `/boardrooms/${boardroomId}/administrator`;
export const CREATE_BOARDROOM_CONTACT_URL = (boardroomId) =>
  `/boardrooms/${boardroomId}/contacts`;
export const DELETE_BOARDROOM_CONTACT_URL = (boardroomId, contactId) =>
  `/boardrooms/${boardroomId}/contacts/${contactId}`;
export const LOCK_BOARDROOM_URL = (boardroomId) =>
  `/boardrooms/${boardroomId}/lock-message`;
export const UNLOCK_BOARDROOM_URL = (boardroomId) =>
  `/boardrooms/${boardroomId}/unlock`;
