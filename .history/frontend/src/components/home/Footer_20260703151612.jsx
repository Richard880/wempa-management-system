import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa6";

import logo from "../../assets/images/logo.png";

import "../../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <Container>

        <Row className="gy-5">

          {/* Logo */}

          <Col lg={4} md={6}>

            <img
              src={logo}
              alt="WEMPA Logo"
              className="footer-logo"
            />

            <h4>Western Kenya Maritime Professionals Association</h4>

            <p>
              Empowering maritime professionals through networking,
              advocacy, professional development and collaboration
              across Western Kenya.
            </p>

          </Col>

          {/* Quick Links */}

          <Col lg={2} md={6}>

            <h5>Quick Links</h5>

            <ul>

              <li><Link to="/">Home</Link></li>

              <li><Link to="/about">About</Link></li>

              <li><Link to="/membership">Membership</Link></li>

              <li><Link to="/events">Events</Link></li>

              <li><Link to="/news">News</Link></li>

            </ul>

          </Col>

          {/* Resources */}

          <Col lg={3} md={6}>

            <h5>Resources</h5>

            <ul>

              <li><Link to="/register">Become a Member</Link></li>

              <li><Link to="/contact">Contact Us</Link></li>

              <li><Link to="/faq">FAQs</Link></li>

              <li><Link to="/privacy">Privacy Policy</Link></li>

            </ul>

          </Col>

          {/* Contact */}

          <Col lg={3} md={6}>

            <h5>Contact</h5>

            <p>
              <FaMapMarkerAlt />
              Kisumu, Kenya
            </p>

            <p>
              <FaPhone />
              +254 700 000 000
            </p>

            <p>
              <FaEnvelope />
              info@wempa.org
            </p>

            <div className="footer-social">

              <a href="#">
                <FaFacebookF />
              </a>

              <a href="#">
                <FaLinkedinIn />
              </a>

              <a href="#">
                <FaInstagram />
              </a>

              <a href="#">
                <FaXTwitter />
              </a>

            </div>

          </Col>

        </Row>

        <hr />

        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} WEMPA. All Rights Reserved.
          </p>

          <p>
            Designed & Developed by <strong>GP Studios</strong>
          </p>

        </div>

      </Container>

    </footer>
  );
}

export default Footer;