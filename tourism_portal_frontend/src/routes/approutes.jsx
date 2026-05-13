import { BrowserRouter,Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";
import Home from "../pages/Home";
import Contact from "../components/contact/contact";
import Destinations from "../pages/destinations/destinations";
import DestinationDetails from "../pages/destinationdetail/destinationdetail";
import Booking from "../pages/booking/booking";
import { BookingProvider } from "../context/bookingContext";
import Signin from "../pages/signin/signin";
import Signup from "../pages/signup/signup";
import Profile from "../pages/profile/profile";
import { ToastProvider } from "../context/toastContext";
import { AuthProvider } from "../context/authContext";
import GuestRoute from "./guestroute";

function AppRoutes(){
    return(
        <BrowserRouter>
        <AuthProvider>
        <ToastProvider>
        <BookingProvider>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<Home/>} />
                    <Route path="/destinations" element={<Destinations/>}/>
                    <Route path="/destinations/:type" element={<Destinations/>}/>
                    <Route path="/destinations/:type/:r1/:r2" element={<Destinations/>}/>
                    <Route path="/destination/destinations/:id" element={<DestinationDetails/>}/>
                    <Route path='/booktour' element={<Booking/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/signin" element={<GuestRoute><Signin/></GuestRoute>}/>
                    <Route path="/signup" element={<GuestRoute><Signup/></GuestRoute>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </Route>
            </Routes>
            </BookingProvider>
            </ToastProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default AppRoutes;