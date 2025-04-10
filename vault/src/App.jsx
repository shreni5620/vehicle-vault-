import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import  Home  from "./Page/Home";
import LoginForm from "./Page/LoginForm";
import SignupForm from "./Page/SignupForm";
import ForgotPassword from "./Page/ForgotPassword";
import NewCars from "./Page/NewCars";
import ViewDetails from "./Page/ViewDetails";
import Footer from "./Components/Footer";
import UsedCars from "./Page/UsedCars";
import VerifyOTP from "./Page/VerifyOTP";
import NewPassword from "./Page/NewPassword";
import CompareModel from "./Page/CompareModal";
import favorites from "./Page/Wishlist";
import Accessory from "./Page/Accessory";
import Dashboard from "./Page/Dashboard";
import Wishlist from "./Page/Wishlist";
import { WishlistProvider } from "./Page/WishlistContext";


const Layout = () => {
  const location = useLocation();
  const hideNavbar = ["/login", "/signup","/forgotpassword","/admin/login","/reset-password","/verify-otp"].includes(location.pathname);
  const hideFooter =  hideNavbar ;/*["/login","/signup","/forgotpassword","/admin/login","/reset-password","/verify-otp"].includes(location.pathname);*/
  
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Outlet />
      {!hideFooter && <Footer />}
    </>
  );
};

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="signup" element={<SignupForm />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="newcars" element={<NewCars />} />
            <Route path="/cars/:id" element={<ViewDetails />} />
            <Route path="footer" element={<Footer />} />
            <Route path="usedcars" element={<UsedCars/>} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/reset-password" element={<NewPassword />} />
            <Route path="favorites" element={<Wishlist/>} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="accessory" element={<Accessory/>} />
            <Route path="comparemodel" element={<CompareModel />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="wishlistcontext" element={<WishlistProvider />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
