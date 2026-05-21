import {
  useEffect,
  useMemo,
  useState
} from "react";

import "./analytics.css";

import {
  getMyBookings
} from "../../services/bookingservice";

import {
  useAuth
} from "../../context/authContext";
import Loader from "../../components/loader/loader";
import ErrorComponent from "../../components/errorcomponent/errorcomponent";

const Analytics = ()=>{

  const { user } =
  useAuth();

  const [bookings,setBookings] =
  useState([]);
   const [error,seterror]=useState("");

  const [loading,setLoading] =
  useState(true);

  /* =========================
     FETCH BOOKINGS
  ========================= */

  useEffect(()=>{

    const fetchBookings =
    async()=>{

      try{

        const data =
        await getMyBookings();

        setBookings(
          data || []
        );

      }

      catch(err){

        seterror("something went wrong");

      }

      finally{

        setLoading(false);

      }

    };

    if(user){

      fetchBookings();

    }

  },[user]);

  /* =========================
     KPI CALCULATIONS
  ========================= */

  const totalTrips =
  bookings.length;

  const totalSpend =
  bookings.reduce(

    (acc,curr)=>

      acc +
      (curr.totalprice || 0),

    0
  );

  const travellers =
  bookings.reduce(

    (acc,curr)=>

      acc +
      (curr.members || 0),

    0
  );

  const avgTripCost =

    totalTrips > 0

    ?

    Math.round(
      totalSpend / totalTrips
    )

    :

    0;

  /* =========================
     STATUS
  ========================= */

  const completedTrips =
  bookings.filter(

    (b)=>

      b.status ===
      "Completed"

  ).length;

  const pendingTrips =
  bookings.filter(

    (b)=>

      b.status ===
      "Upcoming"

  ).length;

  const cancelledTrips =
  bookings.filter(

    (b)=>

      b.status ===
      "Cancelled"

  ).length;

  /* =========================
     UPCOMING
  ========================= */

  const upcomingTrips =
  bookings.filter(

    (b)=>

      b.status ===
      "Upcoming"

  );

  /* =========================
     DESTINATION ANALYTICS
  ========================= */

  const destinationCounts =

  bookings.reduce((acc,curr)=>{

    const dest =
    curr.destination;

    acc[dest] =
    (acc[dest] || 0) + 1;

    return acc;

  },{});

  const favdestination =

    Object.keys(
      destinationCounts
    ).length > 0

    ?

    Object.keys(
      destinationCounts
    ).reduce(

      (a,b)=>

        destinationCounts[a] >
        destinationCounts[b]

        ?

        a

        :

        b

    )

    :

    "N/A";

  const leastdestination =

    Object.keys(
      destinationCounts
    ).length > 0

    ?

    Object.keys(
      destinationCounts
    ).reduce(

      (a,b)=>

        destinationCounts[a] <
        destinationCounts[b]

        ?

        a

        :

        b

    )

    :

    "N/A";

  /* =========================
     HELPERS
  ========================= */

  const getDaysremaining =
  (date)=>{

    const today =
    new Date();

    const start =
    new Date(date);

    const diff =
    Math.ceil(

      (start - today) /

      (1000 * 60 * 60 * 24)

    );

    return diff > 0 ? diff : 0;

  };

  const getPercent =
  (value)=>{

    if(totalTrips === 0)
      return 0;

    return (
      (value / totalTrips) * 100
    );

  };

  /* =========================
     LOADING
  ========================= */

  if(loading){

    return(

      <section className="analytics">

      <Loader/>
      <h2>Loading analytics...</h2>
      </section>

    );

  }
  if(error){
    return (
      <ErrorComponent message={error} onRetry={()=>window.location.reload()}/>
    )
  }

  return(

    <section className="analytics">

      <div className="heading">

        <h1>
          My Analytics
        </h1>

      </div>

      {/* ROW-1 */}

      <div className="row kpi_row">

        <div className="kpi_card">

          <p className="kpi_value">
            {totalTrips}
          </p>

          <div className="kpi_divided"></div>

          <p className="kpi_label">
            Total Trips
          </p>

        </div>

        <div className="kpi_card">

          <p className="kpi_value">
            ₹{totalSpend}
          </p>

          <div className="kpi_divided"></div>

          <p className="kpi_label">
            Total Spend
          </p>

        </div>

        <div className="kpi_card">

          <p className="kpi_value">
            {travellers}
          </p>

          <div className="kpi_divided"></div>

          <p className="kpi_label">
            Travellers
          </p>

        </div>

        <div className="kpi_card">

          <p className="kpi_value">
            ₹{avgTripCost}
          </p>

          <div className="kpi_divided"></div>

          <p className="kpi_label">
            Avg Trip Cost
          </p>

        </div>

      </div>

      {/* ROW-2 */}

      <div className="row second_row">

        <div className="card upcoming_card">

          <h3 className="card_title">
            Upcoming Trips
          </h3>

          {

            upcomingTrips.length > 0

            ?

            upcomingTrips
            .slice(0,2)
            .map((ut,index)=>(

              <div
                className="trip_item"
                key={index}
              >

                <div className="trip_destination">

                  {ut.destination}

                </div>

                <div className="trip_dates">

                  {ut.startDate} -

                  {ut.endDate}

                </div>

                <span className="countdown">

                  {
                    getDaysremaining(
                      ut.startDate
                    )
                  }

                  {" "}days remaining

                </span>

              </div>

            ))

            :

            <p>
              No Upcoming Trips
            </p>

          }

        </div>

        <div className="destination_insights">

          <div className="card fav_item">

            <h4>

              <span className="icon">
                ⭐
              </span>

              {" "}Favourite

            </h4>

            <p>
              {favdestination}
            </p>

          </div>

          <div className="card least_item">

            <h4>

              <span className="icon">
                📍
              </span>

              {" "}Least Visited

            </h4>

            <p>
              {leastdestination}
            </p>

          </div>

        </div>

      </div>

      {/* ROW-3 */}

      <div className="row third_row">

        <div className="card trips_status">

          <h3 className="card_title">
            Trips Status
          </h3>

          <div className="status_container">

            <div className="status_item">

              <span>
                Completed
              </span>

              <div className="progress">

                <div
                  className="completed_bar"
                  style={{
                    width:
                    `${getPercent(completedTrips)}%`
                  }}
                />

              </div>

            </div>

            <div className="status_item">

              <span>
                Pending
              </span>

              <div className="progress">

                <div
                  className="pending_bar"
                  style={{
                    width:
                    `${getPercent(pendingTrips)}%`
                  }}
                />

              </div>

            </div>

            <div className="status_item">

              <span>
                Cancelled
              </span>

              <div className="progress">

                <div
                  className="cancelled_bar"
                  style={{
                    width:
                    `${getPercent(cancelledTrips)}%`
                  }}
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

};

export default Analytics;