import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Footer from "../components/footer";
import MobileBottombar from "../components/bottomBar/bottombar";
import Topbar from "../components/topbar";
import { useSelector } from "react-redux";
import Loader from "../components/loader/loader";

const Home = lazy(() => import("../views/index"));
const Login = lazy(() => import("../views/login"));
const ForgotPassword = lazy(() => import("../views/forgotPassword"));
const Register = lazy(() => import("../views/register"));
const Shop = lazy(() => import("../views/shop"));
const Cart = lazy(() => import("../views/cart"));
const Checkout = lazy(() => import("../views/checkout"));
const Wishlist = lazy(() => import("../views/wishlist"));
const Dashboard = lazy(() => import("../views/dashboard"));
const SingleProduct = lazy(() => import("../views/singleProduct"));
const Account = lazy(() => import("../views/account"));
const Orders = lazy(() => import("../views/orders"));
const ContactUs = lazy(() => import("../views/contactUs"));
const AboutUs = lazy(() => import("../views/aboutus"));
const TermsConditions = lazy(() => import("../views/terms"));
const PrivacyPolicy = lazy(() => import("../views/privacy"));
const ChangePassword = lazy(() => import("../views/changePassword"));
const SingleOrder = lazy(() => import("../views/singleOrder"));
const TypeSearch = lazy(() => import("../views/typeSearch"));
const EditProfile = lazy(() => import("../views/editProfile"));
const RoutesProvider = () => {
  const token = useSelector((state) => state.data.user.userToken);
  return token ? (
    <BrowserRouter>
      <Topbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/Home" exact element={<Navigate to="/" replace />} />
          <Route path="/Login" exact element={<Login />} />
          <Route path="/Cart" exact element={<Cart />} />
          <Route path="/Checkout" exact element={<Checkout />} />
          <Route path="/Shop" exact element={<Shop />} />
          <Route path="/Wishlist" exact element={<Wishlist />} />
          <Route path="/SingleProduct" exact element={<SingleProduct />} />
          <Route path="/TypeSearch" exact element={<TypeSearch />} />
          <Route path="/Account" exact element={<Account />} />
          <Route path="/Orders" exact element={<Orders />} />
          <Route path="/SingleOrder" exact element={<SingleOrder />} />
          <Route path="/Contact" exact element={<ContactUs />} />
          <Route path="/ChangePassword" exact element={<ChangePassword />} />
          <Route path="/EditProfile" exact element={<EditProfile />} />
          <Route path="/AboutUs" exact element={<AboutUs />} />
          <Route path="/TermsConditions" exact element={<TermsConditions />} />
          <Route path="/PrivacyPolicy" exact element={<PrivacyPolicy />} />
          <Route
            path={"/Dashboard"}
            exact
            element={token ? <Dashboard /> : <Navigate to="/Login" replace />}
          />
        </Routes>
      </Suspense>
      <MobileBottombar />
      <Footer />
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/Login" exact element={<Login />} />
          <Route path="/Register" exact element={<Register />} />
          <Route path="/ForgotPassword" exact element={<ForgotPassword />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default RoutesProvider;
