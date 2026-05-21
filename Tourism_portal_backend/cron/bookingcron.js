import cron from "node-cron";

import bookings from "../models/booking.js";

const bookingCron=()=>{
    cron.schedule(
        "0 0 * * *",
        async()=>{
            try{
                const today=new Date();
                await bookings.updateMany(
                    {
                        endDate:{
                            $lt:today
                        },
                        status:"Upcoming"
                    },
                    {
                        $set:{
                            status:"Completed"
                        }
                    }
                );
                console.log("booking statuses updated");
            }
            catch(err){
                console.log(err);
            }
        }
    );
};
export default bookingCron;
