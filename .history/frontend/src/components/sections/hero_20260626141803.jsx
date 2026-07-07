import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section
      className="hero-section d-flex align-items-center"
      style={{
        minHeight: "90vh",
      }}
    >
      <Container>

        <Row className="align-items-center">

          <Col lg={6}>

            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >

              <h5 className="text-warning">
                Welcome to
              </h5>

              <h1 className="display-3 fw-bold text-white">
                Western Kenya Maritime
                Professional Association
              </h1>

              <p className="lead text-light mt-4">

                Bringing together maritime professionals,
                captains, marine engineers, seafarers,
                logistics practitioners and stakeholders
                across Western Kenya and the Lake Region.

              </p>

              <div className="mt-4">

                <Link to="/register">

                  <Button
                    size="lg"
                    className="me-3"
                  >
                    Become a Member
                  </Button>

                </Link>

                <Link to="/about">

                  <Button
                    variant="outline-light"
                    size="lg"
                  >
                    Learn More
                  </Button>

                </Link>

              </div>

            </motion.div>

          </Col>

          <Col lg={6}>

            <motion.img
              src="/hero.png"
              alt="Hero"
              className="img-fluid"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            />

          </Col>

        </Row>

      </Container>
    </section>
  );
}

export default Hero;