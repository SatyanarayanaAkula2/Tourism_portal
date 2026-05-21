import axiosInstance from '../utils/axiosInstance';

export const getDestinationById=async(id)=>{
    const response=await axiosInstance.get(`/destination/destinations/${id}`);
    return response.data.destination;
}

export const getDestinations=async(page=1)=>{
    const response=await axiosInstance.get(`/destination/destinations?page=${page}&limit=8`);
    return response.data;
}

export const getAllDestinations=async()=>{
    const response=await axiosInstance.get("/destination/all");
    return response.data.destinations;
}