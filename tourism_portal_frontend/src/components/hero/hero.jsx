import Reveal from "../reveal";
import "./hero.css";
import { NavLink } from "react-router-dom";

const Hero = () => {

  // TEMP USER
  // later connect with AuthContext
  const user = null;

  return (

   <Reveal>
    <section className="hero" id="home">

      {/* OVERLAY */}

      <div className="hero-overlay"></div>

      {/* CONTENT */}

      <div className="hero-content">

        <div className="desc">

          {user && (

            <h1 className="welcome-heading">
              Welcome,
              <span className="highlight">
                {" "} {user.name}
              </span>
            </h1>

          )}

          <h1 className="heading">

            Discover Your Next Adventure with{" "}

            <span className="highlight">
              YatriGo
            </span>

          </h1>

          <p className="matter">

            Browse top destinations, book guided tours,
            and plan your journey — all in one seamless
            tourism platform.

          </p>

        </div>

        {/* BUTTONS */}

        <div className="cta">

          <NavLink
            to="/destinations"
            className="btn primary"
          >
            Explore Destinations
          </NavLink>

          <NavLink
            to="/contact"
            className="btn secondary"
          >
            Learn More
          </NavLink>

        </div>

      </div>

    </section>
   </Reveal>
  );
};

export default Hero;