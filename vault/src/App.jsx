import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import  Home  from "./Page/Home";
import LoginForm from "./Page/LoginForm";
import SignupForm from "./Page/SignupForm";
import ForgotPassword from "./Page/ForgotPassword";
import NewCars from "./Page/NewCars";
import ViewDetails from "./Page/ViewDetails";
import AdminLogin from "./Page/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import Footer from "./Components/Footer";
import UsedCars from "./Page/UsedCars";
import VerifyOTP from "./Page/VerifyOTP";
import NewPassword from "./Page/NewPassword";
import CompareList from "./Page/CompareList";
import Wishlist from "./Page/Wishlist";
import Accessory from "./Page/Accessory";
import AddNewVehicle from "./Admin/AddNewVehicle";

const Layout = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup","/forgotpassword","/admin/login","/reset-password","/admin/dashboard","/verify-otp","/add-vehicle"].includes(location.pathname);
  const hideFooter = ["/login","/signup","/forgotpassword","/admin/login","/reset-password","/admin/dashboard","/verify-otp","/add-vehicle"].includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet />
      {!hideFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="newcars" element={<NewCars />} />
            <Route path="/cars/:id" element={<ViewDetails />} />
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="footer" element={<Footer />} />
            <Route path="usedcars" element={<UsedCars/>} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/reset-password" element={<NewPassword />} />
            <Route path="compareList" element={<CompareList/>} />
            <Route path="favorites" element={<Wishlist/>} />
            <Route path="accessory" element={<Accessory/>} />
            <Route path="/add-vehicle" element={<AddNewVehicle />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
