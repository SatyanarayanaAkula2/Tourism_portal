import { useEffect, useMemo, useState } from "react";
import { useBooking } from "../../context/bookingContext";
import { useNavigate } from "react-router-dom";
import "./booking.css";
import { getAllDestinations} from "../../services/destinationservice";
import { getHotelsByDestinationId } from "../../services/hotelservice";
import { getPackageByDestinationId } from "../../services/packageservice";
import { createBooking } from "../../services/bookingservice";
import { useAuth } from "../../context/authContext";
import { useToast } from "../../context/toastContext";
import ErrorComponent from "../../components/errorcomponent/errorcomponent";

const Booking = () => {
  const {user}=useAuth();
  const {showToast}=useToast();
  const navigate=useNavigate();
  const {bookingData} = useBooking();
   const [error,seterror]=useState("");
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedDestination, setselectedDestination] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [minStartDate,setminStartDate]=useState("");
  const [minEndDate,setminEndDate]=useState("");
  const [loading,setloading]=useState(false);
  

  const [formData, setFormData] = useState({

    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    location: "",

    destination:"",

    adults: 1,
    children: 0,

    startDate: "",
    endDate: "",

    transport: "",
    payment: ""
  });

  

  const [submitted, setSubmitted] = useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [showSuccess, setShowSuccess] =
    useState(false);


  const transports = [
    "Bus",
    "Train",
    "Flight"
  ];

  const paymentMethods = [
    "UPI",
    "Card",
    "NetBanking"
  ];


  useEffect(()=>{
    const data={
      formData,
      destId:selectedDestination?._id||null,
      hotelId:selectedHotel?._id|null,
      packageId:selectedPackage?._id|null
    };
    localStorage.setItem("bookingform",JSON.stringify({
      data
    }));
  },[formData,selectedDestination,selectedHotel,selectedPackage])

  useEffect(() => {
    const fetchDestinations=async()=>{
      try{
        const destinationsData=await getAllDestinations();
        setDestinations(destinationsData||[]);
        const saved=localStorage.getItem("bookingform");
        if(!saved) return ;
        const parsed=JSON.parse(saved).data;
        if(!parsed) return;
        setFormData(parsed.formData);
        const foundDestination=destinationsData.find((d)=>d._id===parsed.destId);
        if(!foundDestination) return ;
        setselectedDestination(foundDestination);
        const HotelsData=await getHotelsByDestinationId(foundDestination._id);
        setHotels(HotelsData);
        console.log("hotels:",HotelsData)
        const packagesData=await getPackageByDestinationId(foundDestination._id);
        setPackages(packagesData);
        console.log("packages:",packagesData);
        const foundHotel=HotelsData.find((h)=>String(h._id)===String(parsed.hotelId));
        setSelectedHotel(foundHotel||null);
        console.log(foundHotel);
        const foundPackage=packagesData.find((p)=>String(p._id)===String(parsed.packageId));
        setSelectedPackage(foundPackage||null);
        console.log(foundPackage);
      }
      catch(err){
       seterror("something went wrong");;
      }
    }
    fetchDestinations();
    
  }, []);

  useEffect(()=>{
    if(user){
      setFormData((prev)=>({
        ...prev,
        firstName:user.name||"",
        email:user.email||"",
        phone:user.mobile||"",
        location:user.place||""
      }));
    }
  },[user])
  
  useEffect(() => {

  async function setupBooking(){

    if(!bookingData?.destination) return;

    if(selectedDestination) return;

    setselectedDestination(
      bookingData.destination
    );

    setFormData((prev) => ({
      ...prev,
      destination:
        bookingData.destination.name
    }));

    const data =
      await loadHotelsandPackages(
        bookingData.destination._id
      );

    // RESET SELECTED HOTEL
    if(bookingData.hotel){

      const matchedHotel =
        data?.hotelsData?.find(
          (h) =>
            String(h._id) ===
            String(bookingData.hotel._id)
        );

      setSelectedHotel(
        matchedHotel || null
      );

    }

    // RESET SELECTED PACKAGE
    if(bookingData.package){

      const matchedPackage =
        data?.packagesData?.find(
          (p) =>
            String(p._id) ===
            String(bookingData.package._id)
        );

      setSelectedPackage(
        matchedPackage || null
      );

    }

  }

  setupBooking();

}, [bookingData]);

  const loadHotelsandPackages=async(destId)=>{
    try{
      const hotelsData=await getHotelsByDestinationId(destId);
      setHotels(hotelsData);
      const packagesData=await getPackageByDestinationId(destId);
      setPackages(packagesData);
      return{
        hotelsData,packagesData
      }
    }
    catch(err){
      seterror("something went wrong");;
    }
  };

  useEffect(()=>{
    const tomorrow=new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    const formatted=tomorrow.toISOString().split("T")[0];
    setminStartDate(formatted);
  },[]);

  useEffect(() => {

  if(formData?.startDate){

    const nextDay =
      new Date(
        formData?.startDate
      );

    nextDay.setDate(
      nextDay.getDate() + 1
    );

    const formatted =
      nextDay.toISOString()
      .split("T")[0];

    setminEndDate(formatted);
  }

}, [formData?.startDate]);

   const handleDestinationChange=(e)=>{
    const value=e.target.value;
    setFormData((prev) => ({
      ...prev,
      destination:value
    }));
    const foundDestination=destinations.find((d)=>d.name===value);
    setselectedDestination(foundDestination);
    setSelectedHotel(null);
    setSelectedPackage(null);
    if(foundDestination){
      loadHotelsandPackages(foundDestination._id);
    }
   };
   const handleHotelSelect=(hotelId)=>{
    const hotel=hotels.find((h)=>String(h._id)===String(hotelId));
    setSelectedHotel(hotel);
   }
   const handlePackageSelect=(pkg)=>{
    setSelectedPackage(pkg);
   }
 

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  

  const totalPrice = useMemo(() => {

  const adults =
    Number(formData?.adults);

  const children =
    Number(formData?.children);

  const packagePrice =
    Number(
      selectedPackage?.price || 0
    );

  const hotelPrice =
    Number(
      selectedHotel?.pricePerNight || 0
    );

  let nights = 1;

  if(
    formData?.startDate &&
    formData?.endDate
  ){

    const start =
      new Date(
        formData?.startDate
      );

    const end =
      new Date(
        formData?.endDate
      );

    nights = Math.max(
      1,

      Math.ceil(
        (end - start) /
        (1000*60*60*24)
      )
    );
  }

  return (

    packagePrice * adults +

    packagePrice * 0.5 * children +

    hotelPrice * nights
  );

}, [

  formData,

  selectedHotel,

  selectedPackage
]);
  

  const submitBooking = (e) => {

    e.preventDefault();
    if(loading) return;
    setSubmitted(true);
    if(!selectedDestination){
      showToast("select destination","error");
      return ;
    }
    if(!selectedPackage){
      showToast("select package","error");
      return;
    }
    

    if (
      !formData?.firstName ||
      !formData?.email ||
      !formData?.phone ||
      !formData?.transport ||
      !formData?.payment
    ) {
      showToast("fill all the details","error");
      return;
    }

    setShowConfirm(true);
  };

  

  const confirmBooking = async() => {
     if(loading) return;
    try{
      setloading(true);
      const bookingPayload={
        destinationId:selectedDestination._id,
        hotelId:selectedHotel?._id || null,
        packageId:selectedPackage._id,
        destination:selectedDestination.name,
        hotel:selectedHotel?.name||selectedPackage?.hotel,
        package:selectedPackage.name,
        name:formData.firstName+" "+formData.lastName,
        email:formData?.email,
        phone:formData?.phone,
        location:formData?.location,
        members:Number(formData?.adults)+Number(formData?.children),
        startDate:formData?.startDate,
        endDate:formData?.endDate,
        transport:formData?.transport,
        payment:formData?.payment,
        totalprice:totalPrice,
        status:"Upcoming"
      };
      await createBooking(bookingPayload);
      setShowConfirm(true);
      setShowSuccess(true);
      showToast("Booking Successful","success");
      localStorage.removeItem("bookingform");
    }
    catch(err){
      showToast(err.response?.data?.message||"Booking failed","error");
    }
    finally{
      setloading(false);
    }
  };
  if(error){
    return (
      <ErrorComponent message={error} onRetry={()=>window.location.reload()}/>
    )
  }
  return (

    <section className="booking" id="booking">

      <div className="booking_container">

        {/* LEFT */}

        <div className="booking_left">

          <div className="booking_box">

            <div className="heading">

              <h2>
                Book Your Tour Here
              </h2>

            </div>

            <form
              className="booking_form"
              onSubmit={submitBooking}
            >

              {/* NAME */}

              <div className="name">

                <div className="form_com">

                  <label>
                    First Name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    value={formData?.firstName}
                    onChange={handleChange}
                    className={
                      submitted &&
                      !formData?.firstName
                        ? "error-input"
                        : ""
                    }
                  />

                </div>

                <div className="form_com">

                  <label>
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    value={formData?.lastName}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* EMAIL */}

              <div className="form_com">

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData?.email}
                  onChange={handleChange}
                  className={
                    submitted &&
                    !formData?.email
                      ? "error-input"
                      : ""
                  }
                />

              </div>

              {/* PHONE */}

              <div className="form_com">

                <label>Phone</label>

                <input
                  type="number"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData?.phone}
                  onChange={handleChange}
                  className={
                    submitted &&
                    !formData?.phone
                      ? "error-input"
                      : ""
                  }
                />

              </div>

              {/* LOCATION */}

              <div className="form_com">

                <label>
                  Current Location
                </label>

                <input
                  type="text"
                  name="location"
                  placeholder="Enter location"
                  value={formData?.location}
                  onChange={handleChange}
                />

              </div>
              {/*destination*/}
                <div className="form_com">
                  <label>
                    Destination
                  </label>

                  <select
                    value={formData?.destination}
                    onChange={
                      handleDestinationChange
                    }
                  >

                    <option value="">
                      Select Destination
                    </option>

                    {destinations.map((dest) => (

                      <option
                        key={dest._id}
                        value={dest.name}
                      >

                        {dest.name}

                      </option>

                    ))}

                  </select>
                </div>

                {/*Hotels*/}
                    { selectedDestination && <div className="form_com">

                      <label>
                        Hotel (Optional)
                      </label>

                      <select
                        

                        value={
                          selectedHotel?._id || ""
                        }

                        onChange={(e) =>
                          handleHotelSelect(
                            e.target.value
                          )
                        }
                      >

                        <option value="">
                          Select Hotel
                        </option>

                        {hotels.map((hotel) => (

                          <option
                            key={hotel._id}
                            value={hotel._id}
                          >

                            {hotel.name}

                          </option>

                        ))}

                      </select>

                    </div> }

                    {/* packages */}
                    {selectedDestination && <div className="form_com">

                            <h3>
                              Select Package
                            </h3>

                            <div className="option-row">

                              {packages.map((pkg) => (

                                <div
                                  key={pkg._id}

                                  className={`option-card ${
                                    selectedPackage?._id ===
                                    pkg._id
                                    ? "selected"
                                    : ""
                                  }`}

                                  onClick={() =>
                                    handlePackageSelect(pkg)
                                  }
                                >

                                  <h4>
                                    {pkg.name}
                                  </h4>

                                  <p>
                                    ₹{pkg.price}
                                  </p>

                                </div>

                              ))}

                            </div>

                          </div> }

              {/* DATES */}

              <div className="passengers">

                <div className="form_com">

                  <label>
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="startDate" min={minStartDate}
                    value={formData?.startDate}
                    onChange={handleChange}
                  />

                </div>

                <div className="form_com">

                  <label>
                    End Date
                  </label>

                  <input
                    type="date"
                    name="endDate" min={minEndDate}
                    value={formData?.endDate}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* PASSENGERS */}

              <div className="passengers">

                <div className="form_com">

                  <label>
                    Adults
                  </label>

                  <input
                    type="number"
                    name="adults"
                    value={formData?.adults}
                    onChange={handleChange}
                  />

                </div>

                <div className="form_com">

                  <label>
                    Children
                  </label>

                  <input
                    type="number"
                    name="children"
                    value={formData?.children}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* TRANSPORT */}

              <div className="form_com">

                <h3>Select Transport</h3>

                <div className="option-row">

                  {transports.map((item) => (

                    <div
                      key={item}
                      className={`option-card ${
                        formData?.transport ===
                        item
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          transport: item
                        }))
                      }
                    >
                      {item}
                    </div>

                  ))}

                </div>

              </div>

              {/* PAYMENT */}

              <div className="form_com">

                <h3>
                  Payment Method
                </h3>

                <div className="option-row">

                  {paymentMethods.map(
                    (item) => (

                    <div
                      key={item}
                      className={`option-card ${
                        formData?.payment ===
                        item
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          payment: item
                        }))
                      }
                    >
                      {item}
                    </div>

                  ))}

                </div>

              </div>

              {/* BUTTON */}

              <button
                className={`btn_form ${loading?"disabled_btn":""}`}
                type="submit" disabled={loading}
              >
                {loading?"Booking...":"Book Now"}
              </button>

            </form>

          </div>

        </div>

        {/* RIGHT */}

        <div className="booking_right">

          <div
            className="preview_image"
            style={{
              backgroundImage:selectedDestination?.image?
              `url(${import.meta.env.VITE_API_URL}${selectedDestination.image}`:"none"
            }}
          />

          <div className="preview_info">

            <div className="summary_box">

              <h3 className="summary_title">
                Booking Summary
              </h3>

              <div className="summary_row">
                <span>Destination</span>
                <strong>
                  {selectedDestination?.name}
                </strong>
              </div>

              <div className="summary_row">
                <span>Package</span>
                <strong>
                  {selectedPackage?.name}
                </strong>
              </div>

              <div className="summary_row">
                <span>Hotel</span>
                <strong>
                  {selectedHotel?.name}
                </strong>
              </div>

              <div className="summary_row">
                <span>Transport</span>
                <strong>
                  {formData?.transport}
                </strong>
              </div>

              <div className="summary_row">
                <span>Adults</span>
                <strong>
                  {formData?.adults}
                </strong>
              </div>

              <div className="summary_row">
                <span>Children</span>
                <strong>
                  {formData?.children}
                </strong>
              </div>

              <div className="summary_total">

                Total : ₹{totalPrice}

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* CONFIRM MODAL */}

      {showConfirm && (

        <div className="modal-backdrop">

          <div className="modal-box">

            <h2>
              Confirm Your Booking?
            </h2>

            <div className="btns">

              <button
                className={`primary ${loading?"disabled_btn":""}`}
                onClick={confirmBooking} disabled={loading}
              >
                {loading?"Processing...":"Yes"}
              </button>

              <button
                className="secondary"
                onClick={() =>
                  setShowConfirm(false)
                }
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

      {/* SUCCESS MODAL */}

      {showSuccess && (

        <div className="modal-backdrop">

          <div className="modal-box">

            <div className="tick">
              ✔️
            </div>

            <h2>
              Booking Confirmed!
            </h2>

            <p>
              Your trip has been booked
              successfully.
            </p>

            <div className="btns">

              <button className="primary" onClick={()=> navigate("/profile")}>
                Go to Profile
              </button>

            </div>

          </div>

        </div>

      )}

    </section>
  );
};

export default Booking;