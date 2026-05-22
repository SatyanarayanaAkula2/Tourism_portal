import { useState } from "react";
import { Link } from "react-router-dom";
import "./populardest.css";

import beaches from "../../assets/beaches.jpg";
import hillstations from "../../assets/hillstations.jpg";
import mountains from "../../assets/mountains.jpg";
import temples from "../../assets/temples.jpg";
import Reveal from "../reveal";

function PopularDest() {
  const [title, setTitle] = useState("Destinations");

  const types = [
    {
      id: 1,
      title: "Beaches",
      image: beaches,
      content:
        "Relax by the soothing sound of waves and golden sands under the sun. Perfect destinations for sunsets and peaceful holidays.",
    },
    {
      id: 2,
      title: "Hill stations",
      image: hillstations,
      content:
        "Escape the heat and enjoy cool weather surrounded by misty hills and scenic nature views.",
    },
    {
      id: 3,
      title: "Mountains",
      image: mountains,
      content:
        "Experience breathtaking peaks and adventurous trekking trails with unforgettable sunrise views.",
    },
    {
      id: 4,
      title: "Temples",
      image: temples,
      content:
        "Discover spiritual serenity in ancient temples filled with culture and timeless architecture.",
    },
  ];

  return (
    <Reveal>
      <section className="pop_dests">
      <div className="heading">
        <h1>Find Your Favourite Destinations.</h1>
      </div>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          <span>🔥 Limited Time Offers</span>
          <span>✈️ Flat 20% Off on Bookings</span>
          <span>🌴 Explore Top Beaches</span>
          <span>🏔️ Book Mountain Trips Now</span>
          <span>🛕 Discover Spiritual Destinations</span>

          <span>🔥 Limited Time Offers</span>
          <span>✈️ Flat 20% Off on Bookings</span>
          <span>🌴 Explore Top Beaches</span>
          <span>🏔️ Book Mountain Trips Now</span>
        </div>
      </div>

      <div className="pop_destbar">
        <div className="type">
          <h3>{title}</h3>
        </div>

        <div className="bar">
          {types.map((t) => (
            <Reveal>
              <div
              key={t.id}
              className="bar_card"
              style={{
                backgroundImage: `url(${t.image})`,
              }}
            >
              <div
                className="hover_con"
                onMouseEnter={() => setTitle(t.title)}
              >
                <div className="content">
                  <h3>{t.title}</h3>

                  <p>{t.content}</p>

                  <Link
                    to={`/destinations/${t.title}`}
                    className="btn"
                  >
                    View {t.title}
                  </Link>
                </div>
              </div>
            </div>
            </Reveal>
          ))}
        </div>

        <div className="All">
          <Link to="/destinations" className="btn">
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
    </Reveal>
  );
}

export default PopularDest;