import { Children, createContext,useContext,useEffect,useState } from "react";
import { getCurrentUser } from "../services/authservice";

const AuthContext=createContext();
export const AuthProvider=({children})=>{
    const [user,setuser]=useState(null);
    const [loading,setloading]=useState(true);

    useEffect(()=>{
        checkAuth();
    },[]);

    const checkAuth=async()=>{
        try{
            const data=await getCurrentUser();
            setuser(data.user);
        }
        catch(err){
            setuser(null);
        }
        finally{
            setloading(false);
        }
    };

    const login=(userData)=>{
        setuser(userData);
    }

    const logout=()=>{
        setuser(null);
    }

    const updateuser=(updateuser)=>{
        setuser(updateduser);
    };
    return(
        <AuthContext.Provider value={{ user,setuser,loading,login,logout,updateuser}}>
           {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext);