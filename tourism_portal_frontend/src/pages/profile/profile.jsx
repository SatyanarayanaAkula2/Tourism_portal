import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { updateUser,logoutUser } from "../../services/authservice";
import { useToast } from "../../context/toastContext";
import "./profile.css";
import { getMyBookings,cancelBooking } from "../../services/bookingservice";
import Loader from "../../components/loader/loader";

const Profile = () => {

  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [myBookings, setMyBookings] = useState([]);
  const [bookingFilter,setbookingFilter]=useState("All");

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    mobile: "",
    place: ""
  });
  const {user,loading,logout,setuser}=useAuth();
  const {showToast}=useToast();


  useEffect(()=>{
    if(user){
      setProfileForm({
        name:user.name||"",
        email:user.email||"",
        mobile:user.mobile||"",
        place:user.place||""
      });
      fetchBookings();
    }
  },[user])
  

 const fetchBookings = async () => {

  try{

    const data =
    await getMyBookings();
    console.log(data);

    setMyBookings(data);

  }

  catch(error){

    console.log(error);

  }

};

const getBookingStatus=(booking)=>{
  return booking.status;
}

const filteredBookings =

bookingFilter === "All"

? myBookings

: myBookings.filter(

  (booking)=>

  booking.status ===
  bookingFilter

);

const handleCancelBooking =
async(id)=>{

  try{

    await cancelBooking(id);

    showToast(
      "Booking cancelled",
      "success"
    );

    const updated =
    myBookings.map((booking)=>{

      if(
        booking._id === id
      ){

        return {

          ...booking,

          status:"Cancelled"

        };

      }

      return booking;

    });

    setMyBookings(updated);

  }

  catch(error){

    console.log(error);

    showToast(
      "Cancellation failed",
      "error"
    );

  }

};

  

  const saveProfile = async () => {
    if (
      !profileForm.name ||
      !profileForm.email
    ) {
      showToast("Fill complete details","error");
      return;
    }

    try {

      const data=await updateUser({
        name:profileForm.name,
        mobile:profileForm?.mobile,
        place:profileForm.place
      });
      console.log("sucess:",data);
      setuser(data.user);
      showToast("Profile updated","success");
      setEditMode(false);

    } catch (err) {
      console.log("eror:",err);
      showToast(err.response?.data?.message||"update failed","error");

    }

  };



  const handlelogout = async() => {
    await logoutUser();
    await logout();
    showToast("Logged out","success");
    navigate("/signin");
  };

  /* =========================
     ANALYTICS
  ========================= */

  const openAnalytics = () => {

    if (!user) {

      navigate("/signin");

      return;

    }

    if (user.role === "admin") {

      navigate("/adminanalytics");

    } else {

      navigate("/analytics");

    }

  };



  if (loading) {

    return (
      <>
      <Loader/>
      <h2>Loading Profile...</h2>
      </>
    );

  }

  /* =========================
     NOT LOGGED IN
  ========================= */

  if (!user) {

    return (
      <div className="msg">
        Please login to view profile.
        <button onClick={navigate("/signin")}>Signin</button>
      </div>
    );

  }

  return (

    <section className="profile" id="profile">


      {
        editMode && (

          <div
            className="edit_overlay"
            onClick={() =>
              setEditMode(false)
            }
          >

            <div
              className="edit_card"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="edit_header">
                <h2>Edit Profile</h2>
              </div>

              {/* NAME */}

              <div className="form_group">

                <label>Name</label>

                <input
                  type="text"
                  name="name"
                  value={profileForm.name}
                  onChange={handleChange}
                />

              </div>

              {/* EMAIL */}

              <div className="form_group">

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleChange}
                />

              </div>

              {/* MOBILE */}

              <div className="form_group">

                <label>Mobile</label>

                <input
                  type="text"
                  name="mobile"
                  value={profileForm.mobile}
                  onChange={handleChange}
                />

              </div>

              {/* PLACE */}

              <div className="form_group">

                <label>Place</label>

                <input
                  type="text"
                  name="place"
                  value={profileForm.place}
                  onChange={handleChange}
                />

              </div>

              {/* BUTTONS */}

              <div className="edit_buttons">

                <button
                  className="btn save_btn"
                  onClick={saveProfile}
                >
                  Save Changes
                </button>

                <button
                  className="btn back_btn"
                  onClick={() =>
                    setEditMode(false)
                  }
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        )
      }

      {/* =========================
          PROFILE CARD
      ========================= */}

      <div className="my_details">

        {/* PROFILE PIC */}

        <div className="profile_pic">

          {
            user?.name
              ?.charAt(0)
              ?.toUpperCase()
          }

        </div>

        {/* INFO */}

        <div className="my_info">

          <h2>{user?.name}</h2>

          <ul className="details_list">

            <li>
              <span>Email:</span>
              {user?.email}
            </li>

            <li>
              <span>Mobile:</span>
              {
                user?.mobile ||
                "Not Added"
              }
            </li>

            <li>
              <span>Place:</span>
              {
                user?.place ||
                "Not Added"
              }
            </li>

          </ul>

          {/* BUTTONS */}

          <div className="buttons">

            <button
              className="btn update_btn"
              onClick={() =>
                setEditMode(true)
              }
            >
              Update Profile
            </button>

            <button
              className="btn logout_btn"
              onClick={handlelogout}
            >
              Logout
            </button>

          </div>

        </div>

      </div>

      

      <div className="my_bookings" id="my_bookings">

        <div className="heading">

  <h2>
    My Bookings
  </h2>

  <div className="booking_filters">

    <button

      className={
        bookingFilter==="All"
        ? "active_filter"
        : ""
      }

      onClick={() =>
        setbookingFilter("All")
      }
    >
      All
    </button>

    <button

      className={
        bookingFilter==="Upcoming"
        ? "active_filter"
        : ""
      }

      onClick={() =>
        setbookingFilter(
          "Upcoming"
        )
      }
    >
      Upcoming
    </button>

    <button

      className={
        bookingFilter==="Completed"
        ? "active_filter"
        : ""
      }

      onClick={() =>
        setbookingFilter(
          "Completed"
        )
      }
    >
      Completed
    </button>

    <button

      className={
        bookingFilter==="Cancelled"
        ? "active_filter"
        : ""
      }

      onClick={() =>
        setbookingFilter(
          "Cancelled"
        )
      }
    >
      Cancelled
    </button>

  </div>

</div>

        {

          filteredBookings.length > 0 ? (

            <div className="act_bookings">

              {

                filteredBookings.map(
                  (booking, index) => (

                           <div
  className="booking_card"
  key={booking._id}
>

  <div className="booking_top">

    <h4>
      {booking.destination}
    </h4>

    <span className={`
      booking_status
      ${booking.status}
    `}>

      {booking.status}

    </span>

  </div>

  <p>

    Package:

    {" "}

    {booking.package}

  </p>

  <p>

    Hotel:

    {" "}

    {
      booking.hotel ||

      "Not Selected"
    }

  </p>

  <p>

    Start:

    {" "}

    {
      new Date(
        booking.startDate
      ).toLocaleDateString()
    }

  </p>

  <p>

    End:

    {" "}

    {
      new Date(
        booking.endDate
      ).toLocaleDateString()
    }

  </p>

  <p>

    Transport:

    {" "}

    {booking.transport}

  </p>

  <p>

    Total:

    {" "}

    ₹{booking.totalPrice}

  </p>

  {

    booking.status ===
    "Upcoming"

    &&

    (

      <button

        className="cancel_booking_btn"

        onClick={() =>
          handleCancelBooking(
            booking._id
          )
        }

      >

        Cancel Booking

      </button>

    )

  }

</div>

                  )
                )

              }

            </div>

          ) : (

            <p className="no_bookings">
              No bookings yet
            </p>

          )

        }

      </div>

      {/* =========================
          ANALYTICS
      ========================= */}

      <div className="gotoanalytics">

        <button
          className="btn"
          onClick={openAnalytics}
        >
          Go To Analytics
        </button>

      </div>

    </section>

  );

};

export default Profile;