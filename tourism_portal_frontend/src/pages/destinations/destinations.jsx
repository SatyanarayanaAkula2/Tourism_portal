import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import DestinationCard from "../../components/destinationcard/destinationcard";

import "./destinations.css";

function Destinations() {

  const navigate = useNavigate();
  const location=useLocation();

  const { type, sort,r1, r2 } = useParams();

  const [destinations, setDestinations] = useState([]);

  const [filteredDestinations, setFilteredDestinations] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [menuFilter, setMenuFilter] = useState(false);

  const [priceMenu, setPriceMenu] = useState(false);

  /* TEMP DATA
     later replace with backend api */

  useEffect(() => {

    async function fetchDestinations() {

      try {

        setLoading(true);

        // later backend api
        const res = await fetch(
          "http://localhost:5000/destination/destinations"
        );

        const data = await res.json();

        let filtered = [...data.destinations];
        if(type){
          filtered=filtered.filter((item)=>item.type.toLowerCase()===type.toLowerCase());
        }
        if(r1&&r2){
          filtered=filtered.filter((item)=>item.price>=Number(r1)&&item.price<=Number(r2));
        }

        /* FILTERS */

        if(sort === "popular"){

          filtered.sort(
            (a,b) => b.rating - a.rating
          );

        }

        else if(sort === "popularrev"){

          filtered.sort(
            (a,b) => a.rating - b.rating
          );

        }

        setDestinations(filtered);

        setFilteredDestinations(filtered);

      }

      catch(error){

        console.log(error);

      }

      finally{

        setLoading(false);

      }

    }

    fetchDestinations();

  }, [type,sort, r1, r2]);

  /* SEARCH */

  useEffect(() => {

    if(!search.trim()){

      setFilteredDestinations(destinations);

      return;

    }

    const filtered = destinations.filter((d) =>

      d.name.toLowerCase().includes(
        search.toLowerCase()
      ) ||

      d.place.toLowerCase().includes(
        search.toLowerCase()
      ) ||

      d.type?.toLowerCase().includes(
        search.toLowerCase()
      )

    );

    setFilteredDestinations(filtered);

  }, [search, destinations]);

  return (

    <section className="destinations" id="destinations">

      {/* BG */}

      <div className="destinations_bg"></div>

      {/* TITLE */}

      <div className="title">

        <span className="sub_heading">
          EXPLORE DESTINATIONS
        </span>

        <h1>
          Find Your Perfect Journey
        </h1>

        <p>
          Explore breathtaking destinations
          across beaches, temples, mountains,
          and cultural wonders.
        </p>

      </div>

      {/* SEARCH + FILTER */}

      <div className="search_filter">

        {/* SEARCH */}

        <div className="search">

          <form
            className="search_form"
            onSubmit={(e) => e.preventDefault()}
          >

            <input
              type="text"
              className="searchbar"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <button className="btn">
              Search
            </button>

          </form>

        </div>

        {/* FILTER */}

        <div className="filter">

          <button
            className="btn"
            onClick={() =>
              setMenuFilter(!menuFilter)
            }
          >
            Filters
          </button>

          {menuFilter && (

            <ul>

              <li
                onClick={() =>
                  navigate(type?`/destinations/${type}/popular`:`/destinations/sort/popular`)
                }
              >
                High-Low Popularity
              </li>

              <li
                onClick={() =>
                  navigate(type?`/destinations/${type}/popularrev`:`/destinations/sort/popularrev`)
                }
              >
                Low-High Popularity
              </li>

              <li
                className="price"
                onClick={() =>
                  setPriceMenu(!priceMenu)
                }
              >
                Price Range
              </li>

              {priceMenu && (

                <ul className="priceranges">

                  <li
                    onClick={() =>
                      navigate(
                        type?`/destinations/${type}/price/0/2500`:`/destinations/price/0/2500`
                      )
                    }
                  >
                    Below 2,500
                  </li>

                  <li
                    onClick={() =>
                      navigate(
                        type?`/destinations/${type}/price/2500/5000`:`/destinations/price/2500/5000`
                      )
                    }
                  >
                    2,500 - 5,000
                  </li>

                  <li
                    onClick={() =>
                      navigate(
                        type?`/destinations/${type}/price/5000/10000`:`/destinations/price/5000/10000`
                      )
                    }
                  >
                    5,000 - 10,000
                  </li>

                </ul>

              )}

              <li
                onClick={() =>
                  navigate("/destinations")
                }
              >
                Reset
              </li>

            </ul>

          )}

        </div>

      </div>

      {/* TYPES */}

      <div className="Types">

        <ul className="allTypes">

          <li
            className={`button ${
              type === "Beaches"
              ? "active"
              : ""
            }`}
            onClick={() =>
              navigate("/destinations/Beaches")
            }
          >
            🌴 Beaches
          </li>

          <li
            className={`button ${
              type === "Temples"
              ? "active"
              : ""
            }`}
            onClick={() =>
              navigate("/destinations/Temples")
            }
          >
            🛕 Temples
          </li>

          <li
            className={`button ${
              type === "Monuments"
              ? "active"
              : ""
            }`}
            onClick={() =>
              navigate("/destinations/Monuments")
            }
          >
            🏛️ Monuments
          </li>

          <li
            className={`button ${
              type === "Hill stations"
              ? "active"
              : ""
            }`}
            onClick={() =>
              navigate(
                "/destinations/Hill stations"
              )
            }
          >
            ⛰️ Hill Stations
          </li>

          <li
            className={`button ${
              !type?"active":""
            }`}
            onClick={() =>
              navigate("/destinations")
            }
          >
            All
          </li>

        </ul>

      </div>

      {/* LOADER */}

      {loading ? (

        <div className="loader-container">

          <div className="loader"></div>

        </div>

      ) : filteredDestinations.length > 0 ? (

        <div className="cards">

          {filteredDestinations.map((dest) => (

            <DestinationCard
              key={dest._id}
              destination={dest}
            />

          ))}

        </div>

      ) : (

        <p className="noData">
          No Destinations Found!
        </p>

      )}

    </section>
  );
}

export default Destinations;