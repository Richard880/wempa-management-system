import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

import logo from "../../assets/logo/wempa-logo.jpeg";

import "../../styles/footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row className="gy-5">
          {/* Company */}
          <Col lg={4} md={6}>
            <img src={logo} alt="WEMPA" className="footer-logo" />

            <p className="footer-description">
              Western Kenya Maritime Professionals Association (WEMPA) is
              committed to promoting professionalism, innovation and
              collaboration within the maritime industry across Western Kenya.
            </p>

            <div className="footer-social">
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>

              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>

              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>

              <a href="#" aria-label="X">
                <FaXTwitter />
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6}>
            <h5>Quick Links</h5>

            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/membership">Membership</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>
              <li>
                <Link to="/news">News</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </Col>

          {/* Resources */}
          <Col lg={3} md={6}>
            <h5>Resources</h5>

            <ul>
              <li>
                <Link to="/register">Become a Member</Link>
              </li>
              <li>
                <Link to="/downloads">Downloads</Link>
              </li>
              <li>
                <Link to="/faq">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms & Conditions</Link>
              </li>
            </ul>
          </Col>

          {/* Contact */}
          <Col lg={3} md={6}>
            <h5>Contact Us</h5>

            <div className="footer-contact">
              <p>
                <FaMapMarkerAlt />
                <span>Kisumu, Kenya</span>
              </p>

              <p>
                <FaPhoneAlt />
                <span>+254 713 093 502</span>
              </p>

              <p>
                <FaEnvelope />
                <span>info@wempa.org</span>
              </p>
            </div>
          </Col>
        </Row>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>
            © {year} Western Kenya Maritime Professionals Association. All
            Rights Reserved.
          </p>

          <p>
            Designed & Developed by
            <strong> RF e</strong>
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
