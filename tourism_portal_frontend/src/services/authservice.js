import axiosInstance from "../utils/axiosInstance";

export const signupUser= async(data)=>{
    const response=await axiosInstance.post(
        "/auth/signup",data
    );
    return response.data;
};

export const signinUser=async(data)=>{
    const response=await axiosInstance.post(
        "/auth/signin",data
    );
    return response.data;
}

export const logoutUser=async(data)=>{
    const response=await axiosInstance.post("/auth/logout");
    return response.data;
}

export const updateUser=async(data)=>{
    const response=await axiosInstance.put("/user/update",data);
    return response.data;
}

export const getCurrentUser=async()=>{
    const response=await axiosInstance.get("/me");
    return response.data;
};