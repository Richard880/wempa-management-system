import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

      {/* Hero */}

      <section
        style={{
          padding: "80px",
          background: "#0077b6",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1>Welcome to WEMPA</h1>

        <h3>
          Western Kenya Maritime Professional Association
        </h3>

        <p>
          Bringing together captains, marine engineers,
          seafarers, logistics professionals and maritime
          stakeholders.
        </p>

        <Link to="/register">
          <button>Create Account</button>
        </Link>

        <Link to="/membership">
          <button style={{ marginLeft: 10 }}>
            Become a Member
          </button>
        </Link>
      </section>

      {/* About */}

      <section style={{ padding: 40 }}>
        <h2>About WEMPA</h2>

        <p>
          WEMPA is a professional body dedicated to promoting
          professionalism, safety and collaboration in the
          maritime industry across Western Kenya and the Lake
          Region.
        </p>
      </section>

      {/* Core Values */}

      <section style={{ padding: 40 }}>
        <h2>Core Values</h2>

        <ul>
          <li>Professionalism</li>
          <li>Integrity</li>
          <li>Collaboration</li>
          <li>Safety</li>
          <li>Innovation</li>
          <li>Excellence</li>
        </ul>
      </section>

      {/* Services */}

      <section style={{ padding: 40 }}>
        <h2>Our Services</h2>

        <ul>
          <li>Membership Registration</li>
          <li>Digital Membership Cards</li>
          <li>Training Programs</li>
          <li>Industry Networking</li>
          <li>Events & Conferences</li>
          <li>News & Publications</li>
        </ul>
      </section>

    </div>
  );
}

export default Home;