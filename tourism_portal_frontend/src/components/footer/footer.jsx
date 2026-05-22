import { Link } from "react-router-dom";
import "./footer.css";
import Reveal from "../reveal";

function Footer() {

  return (

   <Reveal>
     <footer className="footer">

      <div className="footer_container">

        {/* BRAND */}

        <div className="footer_col brand">

          <h2>
            Yatri<span>Go</span>
          </h2>

          <p>

            Discover, plan, and book your perfect
            journey with ease. Travel smarter with
            YatriGo.

          </p>

        </div>

        {/* EXPLORE */}

        <div className="footer_col">

          <h3>Explore</h3>

          <Link to="/">
            Home
          </Link>

          <Link to="/destinations">
            Destinations
          </Link>

          <Link to="/booktour">
            Book a Tour
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </div>

        {/* SUPPORT */}

        <div className="footer_col">

          <h3>Support</h3>

          <a href="#">
            Help Center
          </a>

          <a href="#">
            Terms & Conditions
          </a>

          <a href="#">
            Privacy Policy
          </a>

        </div>

        {/* CONTACT */}

        <div className="footer_col">

          <h3>Contact</h3>

          <p>📍 India</p>

          <p>📧 support@yatrigo.com</p>

          <p>📞 +91 9876543210</p>

          {/* SOCIALS */}

          <div className="socials">

            <span>
              <i className="fas fa-globe"></i>
            </span>

            <span>
              <i className="fab fa-facebook-f"></i>
            </span>

            <span>
              <i className="fab fa-instagram"></i>
            </span>

          </div>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="footer_bottom">

        © 2026 YatriGo. All rights reserved.

      </div>

    </footer>
   </Reveal>

  );
}

export default Footer;