import {Navigate} from "react-router-dom"
import { useAuth } from "../context/authContext"
import Loader from "../components/loader/loader";

const GuestRoute=({children})=>{
    const {user,loading}=useAuth();
    if(loading) return (
        <Loader/>
    );

    if(user){
        return <Navigate to="/" replace/>;
    }
    return children;
};

export default GuestRoute;