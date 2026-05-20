import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";
import { logoutUser } from "../../services/authservice";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const {user,logout}=useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const profileRef = useRef();

   const transparentRoutes = ["/"];
   const isHomePage=transparentRoutes.includes(location.pathname);
   const shouldshowWhite=darkMode?false:(!isHomePage || isScrolled);

  // scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // outside click close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  
  
  const handlelogout=async()=>{
    try{
      await logoutUser();
      logout();
      navigate("/signin")
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <nav
      className={`navbar ${shouldshowWhite?"white":""}${darkMode?" dark":""}`}
    >
      {/* LOGO */}
      <div className="logo">
        <h1>
          Yatri<span>Go</span>
        </h1>
      </div>

      {/* RIGHT */}
      <div className="nav-right">

        {/* MOBILE MENU BTN */}
        <button className="menu-btn" onClick={toggleMenu}>
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* NAV LINKS */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/destinations"
              onClick={() => setMenuOpen(false)}
            >
              Destinations
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/booktour"
              onClick={() => setMenuOpen(false)}
            >
              Book Tour
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </NavLink>
          </li>

          {/* THEME */}
          <li>
            <button
              className="toggle-btn"
              onClick={toggleTheme}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </li>

          {/* USER */}
          {user ? (
            <li
              className="profile-container"
              ref={profileRef}
            >
              <button
                className="user-prof"
                onClick={() =>
                  setProfileOpen(!profileOpen)
                }
              >
                {user.name.charAt(0).toUpperCase()}
              </button>

              {profileOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/profile">
                      Profile
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/profile">
                      My Bookings
                    </NavLink>
                  </li>

                  <li>
                    <button
                      className="logout-btn"
                      onClick={handlelogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li>
              <NavLink
                to="/signin"
                className="login-btn"
              >
                <span>Sign In</span>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;