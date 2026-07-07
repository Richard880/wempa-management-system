import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

import HeroContent from "./HeroContent";

import heroData from "../../data/heroData";
import ScrollIndicator from "./ScrollIndicator";
import WaveDivider from "./WaveDivider";
import "../../styles/hero.css";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>

      <Container>
        <Row className="align-items-center min-vh-100">
          <Col lg={6}>
            <HeroContent data={heroData} />
          </Col>

          <Col lg={6}>
            <motion.div
              className="hero-image"
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              <div className="hero-placeholder">🚢</div>
            </motion.div>
          </Col>
        </Row>
      </Container>
      
      <WaveDivider />
    </section>
  );
}

export default Hero;
