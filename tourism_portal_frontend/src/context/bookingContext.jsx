import { createContext,useContext,useState } from "react";

const BookingContext = createContext();

export  const BookingProvider = ({children}) => {
    const [bookingData, setBookingData] = useState({
        destination:null,
        hotel:null,
        package:null
    });
    const resetBookingData = () => {
        setBookingData({
            destination:null,
            hotel:null,
            package:null
        });
    };
    return (
        <BookingContext.Provider value={{bookingData,setBookingData,resetBookingData}}>
            {children}
        </BookingContext.Provider>
    );
}

export const useBooking = () => useContext(BookingContext);

