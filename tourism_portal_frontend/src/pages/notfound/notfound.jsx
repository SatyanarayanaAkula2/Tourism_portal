import { useNavigate } from "react-router-dom";

import "./notfound.css";

const NotFound = ()=>{

  const navigate =
  useNavigate();

  return(

    <section className="notfound">

      <div className="notfound_content">

        <h1>
          404
        </h1>

        <h2>
          Page Not Found
        </h2>

        <p>
          The page you are looking for
          does not exist.
        </p>

        <button
          className="home_btn"
          onClick={() =>
            navigate("/")
          }
        >
          Go Back Home
        </button>

      </div>

    </section>

  );

};

export default NotFound;