import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./destinationdetail.css"
import { useBooking } from "../../context/bookingContext";
import { getDestinationById } from "../../services/destinationservice";
import { getHotelsByDestinationId } from "../../services/hotelservice";
import { getPackageByDestinationId } from "../../services/packageservice";
import { useToast } from "../../context/toastContext";
import Loader from "../../components/loader/loader";
import ErrorComponent from "../../components/errorcomponent/errorcomponent";
import { getImageUrl } from "../../utils/getimage";
import Pagewraper from "../../components/pagewraper";

function DestinationDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const {showToast}=useToast();

  const [destination, setDestination] = useState(null);

  const [hotels, setHotels] = useState([]);

  const [packages, setPackages] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [filteredLocations, setFilteredLocations] = useState([]);

  const [allLocations, setAllLocations] = useState([]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [error,seterror]=useState("");
  

  const [selectedHotel, setSelectedHotel] = useState(null);

  const [selectedPackage, setSelectedPackage] = useState(null);

  const [activeDropdown, setActiveDropdown] = useState("");

  const [showMap, setShowMap] = useState(false);

  const [mapUrl, setMapUrl] = useState("");
  const [loading,setloading]=useState(true);
  const {setBookingData}=useBooking();

  useEffect(() => {

    // FETCH DESTINATION
    // Replace with your API/service

    const fetchDestination = async () => {

      try {
        setloading(true);
        const destinationData=await getDestinationById(id);
        setDestination(destinationData);

        const hotelsData=await getHotelsByDestinationId(id);
        setHotels(hotelsData);

        const packagesData=await getPackageByDestinationId(id);
        setPackages(packagesData);

        setAllLocations([
          "Goa",
          "Hyderabad",
          "Delhi",
          "Mumbai",
          "Kerala"
        ]);

      } catch (err) {
        seterror("something went wrong");;
      }
      finally{
        setloading(false);
      }
    };

    fetchDestination();

  }, [id]);

  // ======================
  // LOCATION SEARCH
  // ======================

  const filterLocations = (value) => {

    setSearchText(value);

    if (!value.trim()) {
      setFilteredLocations([]);
      setShowDropdown(false);
      return;
    }

    const filtered = allLocations.filter((loc) =>
      loc.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredLocations(filtered);

    setShowDropdown(true);
  };

  const selectLocation = (loc) => {
    setSearchText(loc);
    setShowDropdown(false);
  };

  // ======================
  // HOTEL SELECT
  // ======================

  const selectHotel = (hotel) => {

    if (selectedHotel?._id === hotel._id) {
      setSelectedHotel(null);
    } else {
      setSelectedHotel(hotel);
    }
  };

  // ======================
  // PACKAGE SELECT
  // ======================

  const selectPackage = (pkg) => {

    if (selectedPackage?._id === pkg._id) {
      setSelectedPackage(null);
    } else {
      setSelectedPackage(pkg);
    }
  };

  // ======================
  // PACKAGE CLASS
  // ======================

  const getPackageClass = (name) => {

    const lower = name.toLowerCase();

    switch (lower) {

      case "basic":
        return "basic-card";

      case "standard":
        return "standard-card";

      case "premium":
        return "premium-card";

      default:
        return "";
    }
  };

  // ======================
  // ACCORDION
  // ======================

  const toggle = (type) => {

    if (activeDropdown === type) {
      setActiveDropdown("");
    } else {
      setActiveDropdown(type);
    }
  };

  // ======================
  // MAP
  // ======================

  const toggleMap = () => {

    setShowMap(!showMap);

    if (!showMap && destination) {

      const url = `https://www.google.com/maps?q=${destination.place}&output=embed`;

      setMapUrl(url);
    }
  };

  // ======================
  // BOOK
  // ======================

  const gotoBook = () => {

    if (!selectedPackage) {
      showToast("Please select a package","error");
      return;
    }
    setBookingData({
        destination:destination,
        hotel:selectedHotel,
        package:selectedPackage
    });
    navigate("/booktour");
  };

  // ======================
  // LOADING
  // ======================

  if(loading){
    return(
        <Pagewraper><Loader/></Pagewraper>
    )
  }
  if(error){
    return (
      <Pagewraper>
      <ErrorComponent message={error} />
        </Pagewraper>
    )
  }

  return (
    <Pagewraper>

    <section className="spec-dest" id="destination_detail">

      {/* GALLERY */}

      <div className="gallery">

        <img
          className="main-img"
          src={getImageUrl(destination?.image)}
          alt={destination?.name}
        />

        <div className="thumbs">

          {destination?.images?.map((img, index) => (

            <img
              key={index}
              src={img}
              alt=""
            />

          ))}

        </div>

      </div>

      {/* DESCRIPTION */}

      <div className="description">

        <h2>{destination?.name}</h2>

        <p>{destination?.description}</p>

      </div>

      {/* LOCATION */}

      <div className="location-selection">

        <h3>Update Your Location</h3>

        <div className="location-row">

          <div className="location-box">

            <input
              type="text"
              placeholder="Enter your location"
              value={searchText}
              onChange={(e) =>
                filterLocations(e.target.value)
              }
            />

            {showDropdown &&
              filteredLocations.length > 0 && (

              <ul className="location-list">

                {filteredLocations.map((location, index) => (

                  <li
                    key={index}
                    onClick={() =>
                      selectLocation(location)
                    }
                  >
                    {location}
                  </li>

                ))}

              </ul>

            )}

          </div>

          <button
            className="map-btn"
            onClick={toggleMap}
          >
            {showMap ? "Hide Map" : "Show Map"}
          </button>

        </div>

      </div>

      {/* MAP */}

      {showMap && (

        <div className="map-container">

          <iframe
            title="map"
            width="100%"
            height="400"
            src={mapUrl}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />

        </div>

      )}

      {/* HOTELS */}

      <div className="hotels">

        <h3>
          Hotels near {destination?.name}
        </h3>

        <div className="hotel-list">

          {hotels.map((hotel) => (

            <div
              key={hotel.id}
              className={`hotel-card ${
                selectedHotel?.id === hotel.id
                  ? "selected"
                  : ""
              }`}
            >

              <div className="hotel-img">

                <img
                  src={hotel.image}
                  alt={hotel.name}
                />

              </div>

              <div className="hotel-content">

                <h4>{hotel.name}</h4>

                <p>
                  ⭐ {hotel.rating}/5
                </p>

                <p>{hotel.type}</p>

                <p>{hotel.pricePerNight}/night</p>

                <button
                  className={`btn-primary ${
                    selectedHotel?._id === hotel._id
                      ? "btn-selected"
                      : ""
                  }`}
                  onClick={() =>
                    selectHotel(hotel)
                  }
                >
                  {selectedHotel?._id === hotel._id
                    ? "Selected"
                    : "Select Hotel"}
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* PACKAGES */}

      <div className="Packages">

        <h3>Select Package</h3>

        <div className="package-list">

          {packages.map((pkg) => (

            <div
              key={pkg.id}
              className={`package-card 
                ${getPackageClass(pkg.name)}
                ${
                  selectedPackage?._id === pkg._id
                    ? "selected"
                    : ""
                }`}
            >

              <h4>{pkg.name}</h4>

              <p className="price">
                {pkg.price}
              </p>

              <p className="package-duration">
                {pkg.duration}
              </p>
              {/* <p className="package-hotel">
                Hotel:{pkg.hotel}
              </p> */}
              <ul>

                {pkg.includes.map((item, index) => (

                  <li key={index}>
                    {item}
                  </li>

                ))}

              </ul>
              <p className="package-desc">
                {pkg.description}
              </p>

              <button
                className="btn-primary"
                onClick={() =>
                  selectPackage(pkg)
                }
              >
                {selectedPackage?._id === pkg._id
                  ? "Selected"
                  : "Select Package"}
              </button>

            </div>

          ))}

        </div>

      </div>

      {/* ACCORDION */}

      <div className="info-section">

        <div
          className="dropdown-block"
          onClick={() => toggle("info")}
        >

          <h3>Info</h3>

          {activeDropdown === "info" && (
            <p>{destination.info}</p>
          )}

        </div>

        <div
          className="dropdown-block"
          onClick={() => toggle("famous")}
        >

          <h3>Famous For</h3>

          {activeDropdown === "famous" && (
            <p>{destination.famousfor}</p>
          )}

        </div>

        <div
          className="dropdown-block"
          onClick={() => toggle("best")}
        >

          <h3>Best Time To Visit</h3>

          {activeDropdown === "best" && (
            <p>{destination.bestTime}</p>
          )}

        </div>

      </div>

      {/* EXTRA */}

      <div className="extra-info">

        <h3>
          Why Visit {destination?.name} ?
        </h3>

        <p>
          Experience the beauty, culture and
          unforgettable charm of{" "}
          {destination?.name}.
        </p>

      </div>

      {/* CTA */}

      <div className="book-cta">

        <button
          className="book-btn"
          onClick={gotoBook}
        >
          Book Now
        </button>

      </div>

    </section>
    </Pagewraper>
  );
}

export default DestinationDetails;