const BASE_URL = "https://placementtutor-1.onrender.com";

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

  DELETE_USER: (userId) => `${BASE_URL}/admin/users/${userId}`,
  GLOBAL_BLOCK:`${BASE_URL}/admin/globalblock`,
  GET_ALL_BLOCKSLOT:`${BASE_URL}/admin/getAllGlobalBlockedSlots`,
  GET_ALL_MENTOR:`${BASE_URL}/admin/getallmentor`,
  REJECT_MENTOR_AND_DEGRADETOUSER:(mentorId)=>`${BASE_URL}/admin/mentorss/${mentorId}/reject`,
  GET_REVIEW:`${BASE_URL}/admin/reviews`,
  DELETE_REVIEW:(bookingId)=>`${BASE_URL}/admin/reviews/${bookingId}`,
  POPULAR_TIME_SLOT:`${BASE_URL}/admin/getPopularTimeSlot`,
  ReviewApprove:(bookingId)=>`${BASE_URL}/admin/reviews/${bookingId}/status`
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
  MENTOR_REQUEST_RESCHEDULE: (bookingId) => 
    `${BASE_URL}/mentor/${bookingId}/reschedule`,
  ACCEPT_RESCHEDULE: (bookingId) =>
    `${BASE_URL}/mentor/${bookingId}/reschedule/accept`,
  REJECT_RESCHEDULE: (bookingId) =>
    `${BASE_URL}/mentor/${bookingId}/reschedule/reject`,

  // 🔐 Mentor dashboard availability
  GET_MY_AVAILABILITY: `${BASE_URL}/mentor/availability`,
  ADD_AVAILABILITY: `${BASE_URL}/mentor/addavailability`,
  UPDATE_AVAILABILITY: `${BASE_URL}/mentor/updateavailability`,
  DELETE_AVAILABILITY: `${BASE_URL}/mentor/deleteavailability`,



};

export const bookingEndpoints = {
  MY_BOOKINGS: `${BASE_URL}/booking/me`,
  SUBMIT_REVIEW: (bookingId) => `${BASE_URL}/booking/${bookingId}/review`,
  LOCK_SLOT: `${BASE_URL}/booking/lock`,
  CONFIRM_BOOKING: `${BASE_URL}/booking/confirm`,
  CANCEL_BOOKING: (id) => `${BASE_URL}/booking/${id}/cancel`,
};

export const PublicEndpoints ={
  public_review:`${BASE_URL}/public/review`,
}
// Add payment endpoints
export const paymentEndpoints = {
  CREATE_ORDER: `${BASE_URL}/payment/create-order`,
  VERIFY_PAYMENT: `${BASE_URL}/payment/verify`,
  PAYMENT_KEY: `${BASE_URL}/payment/key`,
};

