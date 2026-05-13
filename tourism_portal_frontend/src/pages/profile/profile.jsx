import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { updateUser,logoutUser } from "../../services/authservice";
import { useToast } from "../../context/toastContext";
import "./profile.css";

const Profile = () => {

  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [myBookings, setMyBookings] = useState([]);

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
      fetchBookings(user._id);
    }
  },[user])
  /* =========================
     FETCH BOOKINGS
  ========================= */

  const fetchBookings = async (userId) => {};

  /* =========================
     INPUT CHANGE
  ========================= */

  const handleChange = (e) => {

    const { name, value } = e.target;

    setProfileForm((prev) => ({
      ...prev,
      [name]: value
    }));

  };

  /* =========================
     SAVE PROFILE
  ========================= */

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

  /* =========================
     LOADING
  ========================= */

  if (loading) {

    return (
      <div className="msg">
        Loading Profile...
      </div>
    );

  }

  /* =========================
     NOT LOGGED IN
  ========================= */

  if (!user) {

    return (
      <div className="msg">
        Please login to view profile.
      </div>
    );

  }

  return (

    <section className="profile">

      {/* =========================
          EDIT MODAL
      ========================= */}

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
              onClick={logout}
            >
              Logout
            </button>

          </div>

        </div>

      </div>

      {/* =========================
          BOOKINGS
      ========================= */}

      <div className="my_bookings">

        <div className="heading">

          <h2>My Bookings</h2>

          <button className="view_all_btn">
            View All
          </button>

        </div>

        {

          myBookings.length > 0 ? (

            <div className="act_bookings">

              {

                myBookings.map(
                  (booking, index) => (

                    <div
                      className="booking_card"
                      key={index}
                    >

                      <h4>
                        {
                          booking.destination
                        }
                      </h4>

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
                        Date:
                        {" "}
                        {
                          booking.startdate
                        }
                      </p>

                      <p>
                        Price:
                        {" "}
                        ₹{booking.price}
                      </p>

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