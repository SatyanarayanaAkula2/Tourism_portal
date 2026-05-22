import {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";
import { signupUser } from "../../services/authservice";
import { useAuth } from "../../context/authContext";
import { useToast } from "../../context/toastContext";

import "./signup.css";
import Pagewraper from "../../components/pagewraper";

const Signup = () => {

  const navigate = useNavigate();
  const {login}=useAuth();
  const {showToast}=useToast();

  const[loading,setloading]=useState(false);


  const [submitted, setSubmitted] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      password: "",

      confirmPassword: ""
    });

  // HANDLE INPUTS

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value
    });
  };

  // PASSWORD VALIDATION

  const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;

  // SUBMIT

  const submit = async(e)=>{

  e.preventDefault();

  /* =====================
     VALIDATIONS
  ===================== */

  if(
    !formData.name ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword
  ){

    showToast(
      "Fill complete details",
      "error"
    );

    return;
  }
  if(!passwordRegex.test(formData.password)){
    showToast("Password must contain 8 chars,letter and special character","error");
    return;
  }

  if(
    formData.password !==
    formData.confirmPassword
  ){

    showToast(
      "Passwords do not match",
      "error"
    );

    return;
  }

  try{
    setloading(true);
    const payload = {

      name:formData.name,

      email:formData.email,

      password:formData.password,

      role:"user",

      mobile:"",

      place:""

    };

    const data =
    await signupUser(payload);

    /* =====================
       SAVE USER IN CONTEXT
    ===================== */

    login(data.user);

    showToast(
      "Signup successful!",
      "success"
    );

    navigate("/");

  }

  catch(err){

    showToast(
      err.response?.data?.message
      ||
      "Signup failed",
      "error"
    );

  }
  finally{
    setloading(false);
  }

};

  return (
    <Pagewraper>

    <section className="signup_page" id="signup">

      <div className="signup_overlay">

        <div className="signup_form">

          <h2 className="heading">

            Create Account

          </h2>

          <form
            className="form"
            onSubmit={submit}
          >

            {/* NAME */}

            <div className="form_com">

              <label>
                Name
              </label>

              <input
                type="text"

                name="name"

                placeholder=
                "Enter your name"

                value={
                  formData.name
                }

                onChange={
                  handleChange
                }
              />

            </div>

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

                <span>

                  (min 8 chars,
                  1 letter,
                  1 number,
                  1 special char)

                </span>

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

            </div>

            {/* CONFIRM PASSWORD */}

            <div className="form_com">

              <label>
                Confirm Password
              </label>

              <input
                type="password"

                name="confirmPassword"

                placeholder=
                "Enter password again"

                value={
                  formData.confirmPassword
                }

                onChange={
                  handleChange
                }
              />

            </div>

            {/* ERROR */}

            {error && (

              <div className="form_error">

                {error}

              </div>

            )}

            {/* BUTTON */}

            <button
              className={loading?"signup_btn disabled_btn":"signup_btn"}
              type="submit" disabled={loading}
            >

              {loading?"Creating...":"Create Account"}

            </button>

            {/* LOGIN LINK */}

            <div className="bottom_link">

              <Link to="/signin">

                Already have an account?
                Login

              </Link>

            </div>

          </form>

        </div>

      </div>

    </section>
    </Pagewraper>
  );
};

export default Signup;