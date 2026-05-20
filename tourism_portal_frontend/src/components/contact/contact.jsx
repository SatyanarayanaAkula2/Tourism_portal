import { useState } from "react";
import { useToast } from "../../context/toastContext";
import "./contact.css";

function Contact() {
  const {showToast}=useToast();

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    message:""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    console.log(formData);

    showToast("Message sent successfully","success");

    setFormData({
      name:"",
      email:"",
      message:""
    });

  };

  return (

    <section className="contact-container" id="contact">

      <div className="contact-card">

        {/* LEFT */}

        <div className="contact-info">

          <h2>Contact Us</h2>

          <p>
            We'd love to help you plan your next trip.
          </p>

          {/* INFO */}

          <div className="info-item">

            <span className="icon">
              📞
            </span>

            <p>
              +91 9876543210
            </p>

          </div>

          <div className="info-item">

            <span className="icon">
              📧
            </span>

            <p>
              yatrigo99@email.com
            </p>

          </div>

          <div className="info-item">

            <span className="icon">
              📍
            </span>

            <p>
              Kakinada, Andhra Pradesh, India
            </p>

          </div>

          {/* SOCIALS */}

          <div className="social-icons">

            <span>🌐</span>

            <span>📷</span>

            <span>🐦</span>

          </div>

        </div>

        {/* RIGHT */}

        <div className="contact-form">

          <h2>Send Message</h2>

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="form-group">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>

            {/* EMAIL */}

            <div className="form-group">

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            {/* MESSAGE */}

            <div className="form-group">

              <textarea
                rows="5"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />

            </div>

            {/* BUTTON */}

            <button type="submit">
              Send Message
            </button>

          </form>

        </div>

      </div>

    </section>

  );
}

export default Contact;