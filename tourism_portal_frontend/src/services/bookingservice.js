import axios from "axios";
import axiosInstance from "../utils/axiosInstance";


export const getAllBookings=async(data)=>{
    const response=await axiosInstance.get('/booking/bookings');
    return response.data.bookings;
}
export const createBooking=async(data)=>{
    const response=await axiosInstance.post('/booking/create',data);
    return (await response).data.booking;
}

export const cancelBooking=async(id)=>{
    const repsonse=await axiosInstance.post(`/booking/cancel/${id}`);
    return response.data.booking;
}

export const getMyBookings=async()=>{
    const response=await axiosInstance.get("/booking/myBookings");
    return response.data.bookings;
}