export const VERSION = "1";
// const BASE_URL = "https://njmercados-be-production.up.railway.app/njmercados/v1/apiAC";
export const BASE_URL = "https://njmercados-be-production.up.railway.app";
export const url = BASE_URL + "/njmercados/v" + VERSION + "/api";
export const base_url = url;
export const custom_url = url;
export const banner_url = url;

export const endpoints = {
  auth: {
    login: "/auth/login",
    forgetPassword: "/auth/forget-password",
    verifyOtp: "/auth/verify-otp",
    resetPassword: "/auth/reset-password",
  },
  user: {
    createUser: "/user/create",
    getUser: "/user/get", //  subjective on the basis of query parameters to give a single user or a list of users
    deleteUser: "/user/delete",
    updateUser: "/user/update",
    changePassword: "/user/change-password",
  },

  inquiry: {
    createInquiry: "/inquiry/create",
  },
  newsletter: {
    subscribe: "/newsletter/subscribe",
  },
};

const configs = {
  url: url,
  endpoints: endpoints,
};

export default configs;
