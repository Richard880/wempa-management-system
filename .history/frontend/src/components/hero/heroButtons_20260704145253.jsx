import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function HeroButtons({ primaryButton, secondaryButton }) {
  return (
    <div className="hero-buttons">
      <Button as={Link} to="/register" size="lg" className="hero-primary-btn">
        {primaryButton}
      </Button>

      <Button
        as={Link}
        to="/about"
        variant="outline-light"
        size="lg"
        className="hero-secondary-btn"
      >
        {secondaryButton}
      </Button>
    </div>
  );
}

export default HeroButtons;
