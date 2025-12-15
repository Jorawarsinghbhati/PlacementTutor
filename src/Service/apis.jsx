const BASE_URL = "http://localhost:5178";

export const authEndpoints = {
  // 🔹 Google OAuth
  GOOGLE_OAUTH: `${BASE_URL}/auth/google`,

  // 🔹 Email OTP Auth
  SEND_OTP: `${BASE_URL}/auth/send-otp`,
  VERIFY_OTP: `${BASE_URL}/auth/verify-otp`,
};

export const passwordEndpoints = {
  PASSWORDTOKEN_API: `${BASE_URL}/password/passwordtoken`,
  RESETPASSWORD_API: `${BASE_URL}/password/resetpassword`,
};
