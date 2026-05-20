import axios from "axios";

const axiosInstance=axios.create({
    baseURL:"http://localhost:5000",
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }
});

// axiosInstance.interceptors.response.use(
//     (response)=>response,
//     (error)=>{
//         if(error.response?.status===401){
//             localStorage.removeItem("bookingform");
//             window.location.href="/signin";
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;