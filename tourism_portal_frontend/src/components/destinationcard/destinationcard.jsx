import { useNavigate } from "react-router-dom";
import "./destinationcard.css";
import { getImageUrl } from "../../utils/getimage";

function DestinationCard({ destination }) {

  const navigate = useNavigate();

  const gotoDetails = () => {

    navigate(
      `/destination/destinations/${destination._id}`
    );

  };

  return (

    <div className="destination-card">

      {/* IMAGE */}

      <div className="card-image">

        <img
          src={getImageUrl(destination?.image)}
          alt={destination?.name}
        />

        {/* TYPE BADGE */}

        <span className="type-badge">
          {destination?.type}
        </span>

      </div>

      {/* CONTENT */}

      <div className="card-content">

        <div className="top">

          <h3>
            {destination.name}
          </h3>

          <span className="rating">
            ⭐ {destination.rating}
          </span>

        </div>

        {/* PLACE */}

        <p className="place">
          📍 {destination.place}
        </p>

        {/* DESCRIPTION */}

        <p className="desc">

          {destination.info
            ?.slice(0, 90)}...

        </p>

        {/* FOOTER */}

        <div className="card-footer">

          <div className="price">

            ₹ {destination.price}

          </div>

          <button
            className="btn-primary"
            onClick={gotoDetails}
          >
            View Details
          </button>

        </div>

      </div>

    </div>
  );
}

export default DestinationCard;