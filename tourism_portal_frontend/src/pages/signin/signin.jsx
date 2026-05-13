import {
  useState
} from "react";

import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

import { signinUser } from "../../services/authservice";
import { useAuth } from "../../context/authContext";
import Toast from "../../components/toast/toast";

import "./signin.css";
import { useToast } from "../../context/toastContext";

const Signin = () => {
  const {login}=useAuth();
  const {showToast}=useToast();

  const navigate = useNavigate();

  const location = useLocation();

  const returnUrl =
    location.state?.from || "/";

  const [submitted, setSubmitted] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({

      email: "",

      password: ""
    });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value
    });
  };

 const submit =
async(e)=>{

  e.preventDefault();

  if(
    !formData.email ||
    !formData.password
  ){

    showToast(
      "Fill all details",
      "error"
    );

    return;
  }

  try{

    const data =
    await signinUser(formData);


    login(data.user);

    showToast(
      "Login successful!",
      "success"
    );

    navigate("/");

  }

  catch(err){

    showToast(

      err.response?.data?.message
      ||
      "Login failed",

      "error"

    );

  }

};

  return (

    <section className="signin_page">

      <div className="signin_overlay">

        <div className="signin_form">

          <h2 className="heading">

            Sign In

          </h2>

          <form
            className="login_form"
            onSubmit={submit}
          >

            {/* EMAIL */}

            <div className="form_com">

              <label>
                Email
              </label>

              <input
                type="email"

                name="email"

                placeholder=
                "Enter your email"

                value={
                  formData.email
                }

                onChange={
                  handleChange
                }
              />

              {submitted &&
              !formData.email && (

                <p className="pass_errors">

                  Email is required

                </p>

              )}

            </div>

            {/* PASSWORD */}

            <div className="form_com">

              <label>
                Password
              </label>

              <input
                type="password"

                name="password"

                placeholder=
                "Enter your password"

                value={
                  formData.password
                }

                onChange={
                  handleChange
                }
              />

              {submitted &&
              !formData.password && (

                <p className="pass_errors">

                  Password is required

                </p>

              )}

            </div>

            {/* API ERROR */}

            {error && (

              <div className="form_error">

                {error}

              </div>

            )}

            {/* BUTTON */}

            <button
              className="signin_btn"
              type="submit"
            >

              Login

            </button>

            {/* LINK */}

            <div className="bottom_link">

              <Link to="/signup">

                Don't have an account?
                Signup

              </Link>

            </div>

          </form>

        </div>

      </div>

    </section>
  );
};

export default Signin;