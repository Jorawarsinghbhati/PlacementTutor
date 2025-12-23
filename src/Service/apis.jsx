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
  ADMIN_DASHBOARD_STATS: `${BASE_URL}/admin/getAdminDashboardstats`,
  PENDING_MENTORS: `${BASE_URL}/admin/mentors/pending`,
  APPROVE_MENTOR: (id) => `${BASE_URL}/admin/mentors/${id}/approve`,
  REJECT_MENTOR: (id) => `${BASE_URL}/admin/mentors/${id}/reject`,
  ALL_BOOKINGS_DETAILED: `${BASE_URL}/admin/allBookingsDetailed`,
  ALL_USERS_DETAILED: `${BASE_URL}/admin/getAllUsersDetailed`,
};
export const userEndpoints = {
  UPDATE_PROFILE: `${BASE_URL}/user/me`,
  GET_PROFILE: `${BASE_URL}/user/getprofile`,
};

export const passwordEndpoints = {
  PASSWORDTOKEN_API: `${BASE_URL}/password/passwordtoken`,
  RESETPASSWORD_API: `${BASE_URL}/password/resetpassword`,
};
export const mentorEndpoints = {
  APPLY_MENTOR: `${BASE_URL}/mentor/apply`,
  MY_MENTOR_STATUS: `${BASE_URL}/mentor/status`,

  PUBLIC_MENTORS: `${BASE_URL}/mentor/Allmentor`,
  MENTOR_DETAIL: (id) => `${BASE_URL}/mentor/${id}`,
  MENTOR_AVAILABILITY: (mentorId, date) =>
    `${BASE_URL}/mentor/${mentorId}/availability?date=${date}`,
  DASHBOARD: `${BASE_URL}/mentor/dashboard`,
  MY_AVAILABILITY: `${BASE_URL}/mentor/availability`,
  CREATE_AVAILABILITY: `${BASE_URL}/mentor/availability`,
  MY_BOOKINGS: `${BASE_URL}/mentor/bookings`,
  ABOUT: `${BASE_URL}/mentor/getmentorabout`,
  Totalsession: `${BASE_URL}/mentor/mentortotalsession`,
  Mentorstat:`${BASE_URL}/mentor/getMentorDashboardStats`,
  UPDATE_EXPERTISE :  `${BASE_URL}/mentor/updateexpertise`,
  UPDATE_SESSION_PRICE :  `${BASE_URL}/mentor/updateSessionPrice`,
  MENTOR_BOOKINGS_UPCOMING: `${BASE_URL}/mentor/bookings/upcoming`,
  MENTOR_COMPLETED_BOOKING: `${BASE_URL}/mentor/bookings/completed`,


  // 🔐 Mentor dashboard availability
  GET_MY_AVAILABILITY: `${BASE_URL}/mentor/availability`,
  ADD_AVAILABILITY: `${BASE_URL}/mentor/addavailability`,
  UPDATE_AVAILABILITY: (slotId) =>
    `${BASE_URL}/mentor/updateavailability/${slotId}`,
  DELETE_AVAILABILITY: (slotId) =>
    `${BASE_URL}/mentor/deleteavailability/${slotId}`,
};

export const bookingEndpoints = {
  MY_BOOKINGS: `${BASE_URL}/booking/me`,
  LOCK_SLOT: `${BASE_URL}/bookings/lock-slot`,
  CONFIRM_BOOKING: `${BASE_URL}/bookings/confirm`,
  CANCEL_BOOKING: (id) => `${BASE_URL}/bookings/${id}/cancel`,
};

