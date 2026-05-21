import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import NotFound from "../pages/notfound/notfound";
import Loader from "../components/loader/loader";

export default function ProtectedRoute({children}){
    const {user,loading}=useAuth();
    if(loading){
        return (
            <Loader/>
        )
    }
    if(!user){
        return <Navigate to="/signin" replace/>
    }
    
    return children;
}