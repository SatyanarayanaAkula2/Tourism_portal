import axiosInstance from "../utils/axiosInstance";

export const getHotelsByDestinationId=async(id)=>{
    const response=await axiosInstance.get(`/hotel/destination/${id}`);
    return response.data.hotels;
}
