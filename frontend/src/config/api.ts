export const API_CONFIG = {
  BASE_URL: "http://10.0.0.64:5001",
  ENDPOINTS: {
    LOGIN: "/api/users/login",
    SIGNUP: "/api/users/signup",
    PROFILE: "/api/profile",
    DELETE_PROFILE: "/api/profile",
    CHANGE_PASSWORD: "/api/profile/password",
  },
} as const;
