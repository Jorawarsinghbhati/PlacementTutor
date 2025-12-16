const BASE_URL = "http://localhost:5178";

export const authEndpoints = {
  // 🔹 Google OAuth
  GOOGLE_OAUTH: `${BASE_URL}/auth/google`,
  SET_USERNAME: `${BASE_URL}/auth/set-username`,
  // 🔹 Email OTP Auth
  SEND_OTP: `${BASE_URL}/auth/send-otp`,
  VERIFY_OTP: `${BASE_URL}/auth/verify-otp`,
  ME: `${BASE_URL}/auth/me`,
  SET_GRADUATION: `${BASE_URL}/auth/set-graduation`,
};
export const adminEndpoints = {
    ADMIN_STATS: `${BASE_URL}/admin/stats`,
    // future:
    // GET_USERS: `${BASE_URL}/admin/users`,
    // UPDATE_ROLE: `${BASE_URL}/admin/user/:id/role`,
  };

export const passwordEndpoints = {
  PASSWORDTOKEN_API: `${BASE_URL}/password/passwordtoken`,
  RESETPASSWORD_API: `${BASE_URL}/password/resetpassword`,
};
