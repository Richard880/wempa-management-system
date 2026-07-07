import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheckCircle, FaAnchor, FaWater } from "react-icons/fa";

import aboutImage from "../../assets/i/background.png";

function AboutSection() {
  return (
    <section className="about-section">
      <Container>
        <Row className="align-items-center gy-5">
          {/* LEFT */}

          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="section-subtitle">WHO WE ARE</span>

              <h2 className="section-title mt-3">
                Building the Future of Maritime Excellence in Western Kenya
              </h2>

              <p className="section-description mt-4">
                The Western Kenya Maritime Professionals Association (WEMPA) is
                a professional organization committed to promoting
                collaboration, innovation, professionalism and sustainable
                growth within the maritime industry across the Lake Victoria
                region.
              </p>

              <p className="section-description">
                We unite captains, marine engineers, seafarers, maritime
                officers, fishermen, logistics professionals, institutions and
                stakeholders to strengthen the blue economy and create
                opportunities for future generations.
              </p>

              <div className="about-features">
                <div>
                  <FaCheckCircle className="text-success me-2" />
                  Professional Maritime Network
                </div>

                <div>
                  <FaCheckCircle className="text-success me-2" />
                  Industry Leadership & Advocacy
                </div>

                <div>
                  <FaCheckCircle className="text-success me-2" />
                  Serving the Lake Victoria Region
                </div>
              </div>

              <Button as={Link} to="/about" className="hero-btn mt-4">
                Learn More About WEMPA
              </Button>
            </motion.div>
          </Col>

          {/* RIGHT */}

          <Col lg={6}>
            <motion.div
              className="about-image-wrapper"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src={aboutImage}
                alt="WEMPA Maritime"
                className="about-image"
              />

              <div className="about-card card-top">
                <FaAnchor className="text-warning fs-2 mb-2" />
                <h3>2010</h3>
                <p>Established</p>
              </div>

              <div className="about-card card-bottom">
                <FaWater className="text-primary fs-2 mb-2" />
                <h3>Lake Victoria</h3>
                <p>Serving Western Kenya</p>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AboutSection;
