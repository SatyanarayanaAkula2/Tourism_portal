import "./about.css";

function About() {

  return (

    <section className="about">

      <div className="about_container">

        {/* LEFT */}

        <div className="about_text">

          <span className="sub_heading">
            ABOUT US
          </span>

          <h2>
            Explore The World
            With <span>YatriGo</span>
          </h2>

          <p>

            YatriGo is your all-in-one tourism platform
            for discovering destinations, planning trips,
            and booking unforgettable experiences with ease.

          </p>

          <p>

            We simplify travel by bringing everything
            together — from exploration to booking —
            in one seamless and user-friendly experience.

          </p>

          {/* POINTS */}

          <div className="about_points">

            <div className="point">
              <span>✔️</span>
              Curated Destinations
            </div>

            <div className="point">
              <span>✔️</span>
              Easy & Secure Booking
            </div>

            <div className="point">
              <span>✔️</span>
              Trusted Travel Experience
            </div>

          </div>

        </div>

        {/* RIGHT IMAGE */}

        <div className="about_image">

          <div className="image_overlay"></div>

        </div>

      </div>

    </section>

  );
}

export default About