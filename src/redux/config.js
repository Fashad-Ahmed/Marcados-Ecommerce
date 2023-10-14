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
    addWishlist: "/user/wishlist/",
  },
  inquiry: {
    createInquiry: "/inquiry/create",
  },
  newsletter: {
    subscribe: "/newsletter/subscribe",
  },
  content: {
    aboutUs: "/content/get?type=aboutus",
    privacyPolicy: "/content/get?type=privacypolicy",
    terms: "/content/get?type=terms",
    zip: "/postcode/get",
    social: "/content/get-social-links",
    homeBanner: "/banner/get?type=home",
    discountBanner: "/banner/get?type=offer",
  },
  checkout: {
    getOrder: "/order/get",
    singleOrder: "/order/get/",
    createOrder: "/order/create",
    applyCoupon: "/code/get",
  },
  shop: {
    categories: "/category/get",
    product: "/product/get?page=1&rowsPerPage=10",
    getProduct: "/product/get?",
    productDetail: "/product/get",
    postReview: "/review/create",
    getReview: "/review/get",
  },
};

const configs = {
  url: url,
  endpoints: endpoints,
};

export default configs;
