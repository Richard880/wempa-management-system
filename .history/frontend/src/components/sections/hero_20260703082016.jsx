import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaAnchor,
  FaUsers,
  FaShip,
  FaGlobeAfrica,
  FaCheckCircle,
} from "react-icons/fa";

import heroImage from "../../assets/images/background.png";
import "../../styles/hero.css";

function Hero() {
  return (
    <section className="hero">
      <Container>
        <Row className="align-items-center min-vh-100">

          {/* LEFT SIDE */}

          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge bg="warning" text="dark" className="hero-badge px-3 py-2">
                <FaAnchor className="me-2" />
                Maritime Excellence Since 2010
              </Badge>

              <h1 className="hero-title mt-4">
                Connecting{" "}
                <span className="text-warning">
                  Maritime Professionals
                </span>{" "}
                Across Western Kenya
              </h1>

              <p className="hero-text mt-4">
                WEMPA brings together captains, marine engineers,
                maritime officers, fishermen, logistics professionals,
                students and stakeholders dedicated to strengthening the
                blue economy around Lake Victoria.
              </p>

              {/* Trust indicators */}

              <div className="hero-features">

                <div>
                  <FaCheckCircle className="text-success me-2" />
                  Registered Association
                </div>

                <div>
                  <FaCheckCircle className="text-success me-2" />
                  Professional Maritime Network
                </div>

                <div>
                  <FaCheckCircle className="text-success me-2" />
                  Serving Western Kenya
                </div>

              </div>

              {/* Buttons */}

              <div className="hero-buttons mt-5">

                <Button
                  as={Link}
                  to="/register"
                  size="lg"
                  className="hero-btn"
                >
                  Become a Member
                </Button>

                <Button
                  as={Link}
                  to="/about"
                  variant="outline-light"
                  size="lg"
                  className="ms-3"
                >
                  Learn More
                </Button>

              </div>

              {/* Statistics */}

              <Row className="hero-stats mt-5">

                <Col xs={4}>
                  <h2>500+</h2>
                  <p>Members</p>
                </Col>

                <Col xs={4}>
                  <h2>20+</h2>
                  <p>Ports</p>
                </Col>

                <Col xs={4}>
                  <h2>100+</h2>
                  <p>Events</p>
                </Col>

              </Row>

            </motion.div>
          </Col>

          {/* RIGHT SIDE */}

          <Col
            lg={6}
            className="position-relative d-flex justify-content-center mt-5 mt-lg-0"
          >
            <motion.img
              src={heroImage}
              alt="WEMPA"
              className="hero-image"
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            />

            {/* Floating Card */}

            <motion.div
              className="floating-card card-one"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <FaUsers size={28} className="text-warning mb-2" />
              <h4>500+</h4>
              <small>Active Members</small>
            </motion.div>

            <motion.div
              className="floating-card card-two"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              <FaShip size={28} className="text-warning mb-2" />
              <h4>20+</h4>
              <small>Ports & Beaches</small>
            </motion.div>

            <motion.div
              className="floating-card card-three"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <FaGlobeAfrica size={28} className="text-warning mb-2" />
              <h4>Western Kenya</h4>
              <small>Lake Victoria Region</small>
            </motion.div>

          </Col>

        </Row>
      </Container>
    </section>
  );
}

export default Hero;