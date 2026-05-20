import {
  useEffect,
  useMemo,
  useState
} from "react";

import "./adminanalytics.css";

import {
  getAllBookings
} from "../../services/bookingservice";

const AdminAnalytics = ()=>{

  const [bookings,setBookings] =
  useState([]);

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
        await getAllBookings();

        setBookings(data || []);

      }

      catch(err){

        console.log(err);

      }

      finally{

        setLoading(false);

      }

    };

    fetchBookings();

  },[]);

  /* =========================
     KPI CALCULATIONS
  ========================= */

  const totalRevenue =
  bookings.reduce(

    (acc,curr)=>

      acc +
      (curr.totalprice || 0),

    0

  );

  const totalBookings =
  bookings.length;

  const activeUsers =
  new Set(

    bookings.map(
      (b)=>b.email
    )

  ).size;

  const avgBookingValue =

    totalBookings > 0

    ?

    Math.round(
      totalRevenue /
      totalBookings
    )

    :

    0;

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

  const mostBookedDestination =

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

  const leastBookedDestination =

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
     RECENT BOOKINGS
  ========================= */

  const recentBookings =

    [...bookings]

    .sort(

      (a,b)=>

        new Date(
          b.createdAt
        ) -

        new Date(
          a.createdAt
        )

    )

    .slice(0,5);

  /* =========================
     LOADING
  ========================= */

  if(loading){

    return(

      <section
        className="admin_analytics"
      >

        <h2>
          Loading Analytics...
        </h2>

      </section>

    );

  }

  return(

    <section className="admin_analytics">

      {/* HEADER */}

      <div className="analytics_header">

        <h2>
          Admin Analytics Dashboard
        </h2>

        <p>
          Travel business insights
          and booking performance
        </p>

      </div>

      {/* KPI */}

      <div className="kpi_container">

        <div className="kpi_card">

          <h3>
            Total Revenue
          </h3>

          <p className="kpi_value">
            ₹{totalRevenue}
          </p>

        </div>

        <div className="kpi_card">

          <h3>
            Total Bookings
          </h3>

          <p className="kpi_value">
            {totalBookings}
          </p>

        </div>

        <div className="kpi_card">

          <h3>
            Active Users
          </h3>

          <p className="kpi_value">
            {activeUsers}
          </p>

        </div>

        <div className="kpi_card">

          <h3>
            Average Booking
          </h3>

          <p className="kpi_value">
            ₹{avgBookingValue}
          </p>

        </div>

      </div>

      {/* CHART ROW */}

      <div className="charts_row">

        <div className="analytics_card">

          <div className="card_header">

            <div className="heading">

              <h3>
                Revenue Trend
              </h3>

              <p>
                Monthly revenue
                performance
              </p>

            </div>

          </div>

          <div className="card_body">

            <canvas></canvas>

          </div>

        </div>

        <div className="analytics_card">

          <div className="card_header">

            <div className="heading">

              <h3>
                Booking Trend
              </h3>

              <p>
                Monthly booking
                performance
              </p>

            </div>

          </div>

          <div className="card_body">

            <canvas></canvas>

          </div>

        </div>

      </div>

      {/* DESTINATION */}

      <div className="charts_row">

        <div className="analytics_card">

          <div className="card_header">

            <div className="heading">

              <h3>
                Destination Popularity
              </h3>

              <p>
                Most booked locations
              </p>

            </div>

          </div>

          <div className="card_body">

            <canvas></canvas>

          </div>

        </div>

        <div className="analytics_card">

          <div className="card_header">

            <div className="heading">

              <h3>
                Revenue by Destination
              </h3>

              <p>
                Top earning travel
                locations
              </p>

            </div>

          </div>

          <div className="card_body">

            <canvas></canvas>

          </div>

        </div>

      </div>

      {/* STATUS */}

      <div className="charts_row">

        <div className="analytics_card">

          <div className="card_header">

            <div className="heading">

              <h3>
                Booking Status
              </h3>

              <p>
                Completed vs
                upcoming trips
              </p>

            </div>

          </div>

          <div className="card_body">

            <canvas></canvas>

          </div>

        </div>

        <div className="analytics_card insights_card">

          <div className="card_header">

            <h3>
              Destination Insights
            </h3>

          </div>

          <div className="insight_item">

            <span className="label">
              Most Booked
            </span>

            <span className="value">
              {mostBookedDestination}
            </span>

          </div>

          <div className="insight_item">

            <span className="label">
              Least Booked
            </span>

            <span className="value">
              {leastBookedDestination}
            </span>

          </div>

        </div>

      </div>

      {/* TABLE */}

      <div className="analytics_table">

        <div className="table_header">

          <h3>
            Recent Bookings
          </h3>

        </div>

        <table>

          <thead>

            <tr>

              <th>
                User
              </th>

              <th>
                Destination
              </th>

              <th>
                Start Date
              </th>

              <th>
                Price
              </th>

            </tr>

          </thead>

          <tbody>

            {

              recentBookings.map(
                (booking,index)=>(

                <tr key={index}>

                  <td>
                    {booking.name}
                  </td>

                  <td>
                    {booking.destination}
                  </td>

                  <td>
                    {booking.startDate}
                  </td>

                  <td>
                    ₹{booking.totalprice}
                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </section>

  );

};

export default AdminAnalytics;