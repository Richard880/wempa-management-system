import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

import logo from "../../assets/logo/wempa-logo.jpeg";

import "../../styles/navbar.css";

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
      className={`wempa-navbar ${scrolled ? "navbar-scrolled" : ""}`}
    >
      <Container>

        <Navbar.Brand
          as={Link}
          to="/"
          className="navbar-brand-custom"
          onClick={closeMenu}
        >
          <img src={logo} alt="WEMPA Logo" />

          <div className="brand-text">
            <h5>WEMPA</h5>

            <span>
              Western Kenya Maritime
              <br />
              Professionals Association
            </span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">

          <Nav className="mx-auto">

            <Nav.Link
              as={NavLink}
              to="/"
              end
              onClick={closeMenu}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/about"
              onClick={closeMenu}
            >
              About
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/membership"
              onClick={closeMenu}
            >
              Membership
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/events"
              onClick={closeMenu}
            >
              Events
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/news"
              onClick={closeMenu}
            >
              News
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/contact"
              onClick={closeMenu}
            >
              Contact
            </Nav.Link>

          </Nav>

          <div className="navbar-buttons">

            <Button
              as={Link}
              to="/login"
              variant="link"
              className="login-btn"
              onClick={closeMenu}
            >
              Login
            </Button>

            <Button
              as={Link}
              to="/register"
              className="join-btn"
              onClick={closeMenu}
            >
              Become a Member
            </Button>

          </div>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default Navigation;