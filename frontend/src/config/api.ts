export const API_CONFIG = {
  BASE_URL: "http://192.168.10.115:5001",
  ENDPOINTS: {
    LOGIN: "/api/users/login",
    SIGNUP: "/api/users/signup",
    PROFILE: "/api/profile",
    DELETE_PROFILE: "/api/profile",
    CHANGE_PASSWORD: "/api/profile/password",
  },
} as const;
