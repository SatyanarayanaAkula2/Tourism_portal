import { Navigate } from "react-router-dom";

import { useAuth } from "../context/authContext";

export default function ProtectedRoute({children}){
    const {user,loading}=useAuth();
    if(loading){
        return (
            <div className="loading_container">
                <div className="loader"></div>
            </div>
        )
    }
    if(!user){
        return <Navigate to="/signin" replace/>
    }
    return children;
}