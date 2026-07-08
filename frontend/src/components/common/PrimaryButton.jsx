import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function PrimaryButton({
  children,
  to,
  variant = "primary",
  size = "lg",
  className = "",
}) {
  return (
    <Button
      as={Link}
      to={to}
      size={size}
      variant={variant}
      className={`primary-button ${className}`}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;
