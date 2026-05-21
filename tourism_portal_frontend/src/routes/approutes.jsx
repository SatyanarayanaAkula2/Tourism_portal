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
import ProtectedRoute from "./protectedroute";
import ScrollToTop from "../components/scrolltoTop/scrolltoTop";
import { useAuth } from "../context/authContext";
import NotFound from "../pages/notfound/notfound";
import Analytics from "../pages/analytics/analytics";
import AdminAnalytics from "../pages/adminanalytics/adminanalytics";
import AdminRoute from "./adminroute";



const AppRoutesContent=()=>{
    const {loading}=useAuth();
    if(loading){
        return (
            <div className="loader_container">
                <div className="loader"></div>
            </div>
        );
    }
    return(
         <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<Home/>} />
                    <Route path="/destinations" element={<Destinations/>}/>
                     <Route path="/destinations/sort/:sort" element={<Destinations/>}/>
                      <Route path="/destinations/:type" element={<Destinations/>}/>
                    <Route path="/destinations/:type/:sort" element={<Destinations/>}/>
                    <Route path="/destinations/price/:r1/:r2" element={<Destinations/>}/>
                    <Route path="/destinations/:type/price/:r1/:r2" element={<Destinations/>}/>
                    <Route path="/destination/destinations/:id" element={<DestinationDetails/>}/>
                    <Route path='/booktour' element={<ProtectedRoute><Booking/></ProtectedRoute>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/signin" element={<GuestRoute><Signin/></GuestRoute>}/>
                    <Route path="/signup" element={<GuestRoute><Signup/></GuestRoute>}/>
                    <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                    <Route path="/analytics" element={<ProtectedRoute><Analytics/></ProtectedRoute>}/>
                    <Route path="/adminanalytics" element={<AdminRoute><AdminAnalytics/></AdminRoute>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
        </Routes>
    )
}
function AppRoutes(){

   
     
    return(
        <BrowserRouter>
        <ScrollToTop/>
        <AuthProvider>
        <ToastProvider>
        <BookingProvider>
           <AppRoutesContent/>
            </BookingProvider>
            </ToastProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default AppRoutes;