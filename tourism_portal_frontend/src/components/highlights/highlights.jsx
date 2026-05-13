import "./highlights.css";

const highlightCards = [

  {
    id:1,
    icon:"fa-globe",
    title:"Wide Variety Of Destinations",
    matter:
    "Explore beaches, mountains, spiritual places, adventure spots, and cultural destinations tailored to every traveler."
  },

  {
    id:2,
    icon:"fa-plane",
    title:"Booking Made Easy",
    matter:
    "Book your dream destination in just a few clicks with a fast, secure, and hassle-free booking experience."
  },

  {
    id:3,
    icon:"fa-mobile-alt",
    title:"User Friendly Experience",
    matter:
    "Enjoy a clean and intuitive interface designed for smooth navigation across all devices and screen sizes."
  }

];

function Highlights() {

  return (

    <section className="highlights">

      <div className="highlight-container">

        <div className="section-title">

          <span className="sub-heading">
            WHY CHOOSE US
          </span>

          <h2 className="heading_highlight">
            Why Travelers Love
            <span> YatriGo</span>
          </h2>

          <p className="section-desc">

            Everything you need for a seamless
            and memorable travel experience.

          </p>

        </div>

        {/* CARDS */}

        <div className="high-cards">

          {highlightCards.map((card) => (

            <div
              className="high-card"
              key={card.id}
            >

              {/* ICON */}

              <div className="icons">

                <i className={`fas ${card.icon}`}></i>

              </div>

              {/* CONTENT */}

              <div className="card-content">

                <h3>{card.title}</h3>

                <p>{card.matter}</p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );
}

export default Highlights;