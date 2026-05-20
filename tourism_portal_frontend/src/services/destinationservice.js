import axiosInstance from '../utils/axiosInstance';

export const getDestinationById=async(id)=>{
    const response=await axiosInstance.get(`/destination/destinations/${id}`);
    return response.data.destination;
}

export const getDestinations=async()=>{
    const response=await axiosInstance.get(`/destination/destinations`);
    return response.data.destinations;
}