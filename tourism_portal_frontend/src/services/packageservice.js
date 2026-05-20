import axiosInstance from "../utils/axiosInstance";

export const getPackageByDestinationId=async(id)=>{
    const response=await axiosInstance.get(`/package/destination/${id}`);
    return response.data.packages;
}