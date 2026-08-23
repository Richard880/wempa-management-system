// src/components/hero/HeroButtons.jsx
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function HeroButtons({ primaryButton, secondaryButton }) {
  // 1. Safe Processing for the Primary Action Button
  const isPrimaryObj = primaryButton && typeof primaryButton === "object";
  const primaryText = isPrimaryObj ? primaryButton.text : primaryButton;
  const primaryLink = isPrimaryObj ? primaryButton.link : "/register"; // Uses dynamic path if object exists

  // 2. Safe Processing for the Secondary Action Button
  const isSecondaryObj = secondaryButton && typeof secondaryButton === "object";
  const secondaryText = isSecondaryObj ? secondaryButton.text : secondaryButton;
  const secondaryLink = isSecondaryObj ? secondaryButton.link : "/about"; // Uses dynamic path if object exists

  return (
    <div className="hero-buttons">
      {primaryText && (
        <Button 
          as={Link} 
          to={primaryLink} 
          size="lg" 
          className="hero-primary-btn"
        >
          {primaryText}
        </Button>
      )}

      {secondaryText && (
        <Button
          as={Link}
          to={secondaryLink}
          variant="outline-light"
          size="lg"
          className="hero-secondary-btn"
        >
          {secondaryText}
        </Button>
      )}
    </div>
  );
}

export default HeroButtons;
