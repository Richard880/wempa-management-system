import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

import logo from "../../assets/logo/wempa-logo.jpeg";

import "../../styles/navbar.css";

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`wempa-navbar ${scrolled ? "navbar-scrolled" : ""}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <img src={logo} alt="WEMPA" />

          <div className="brand-text">
  <h5>WEMPA</h5>

  <small>
    Western Kenya Maritime Professionals Association
  </small>
</div>
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="mx-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>

            <Nav.Link as={NavLink} to="/membership">
              Membership
            </Nav.Link>

            <Nav.Link as={NavLink} to="/events">
              Events
            </Nav.Link>

            <Nav.Link as={NavLink} to="/news">
              News
            </Nav.Link>

            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>
          </Nav>

          <div className="navbar-buttons">
            <Button variant="outline-primary" as={Link} to="/login">
              Login
            </Button>

            <Button as={Link} to="/register">
              Become a Member
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
