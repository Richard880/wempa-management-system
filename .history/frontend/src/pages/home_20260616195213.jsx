import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to WEMPA</h1>
      <p>Western Kenya Maritime Authority</p>

      <br />

      <Link to="/register">
        <button>Register</button>
      </Link>

      <br /><br />

      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
}

export default Home;