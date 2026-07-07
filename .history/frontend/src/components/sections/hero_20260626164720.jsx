import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="hero">

      <Container>

        <Row className="align-items-center">

          <Col lg={6}>

            <motion.div
              initial={{ opacity:0,x:-80 }}
              animate={{ opacity:1,x:0 }}
              transition={{ duration:1 }}
            >

              <span className="badge bg-warning text-dark mb-3">
                Maritime Excellence Since 2010
              </span>

              <h1 className="display-3 fw-bold text-white">

                Connecting Maritime Professionals Across
                Western Kenya

              </h1>

              <p className="lead text-light mt-4">

                Join captains, marine engineers, maritime officers,
                seafarers, logistics professionals and stakeholders
                working together to transform the maritime sector.

              </p>

              <div className="mt-5">

                <Link to="/register">

                  <Button size="lg">
                    Join WEMPA
                  </Button>

                </Link>

                <Link to="/about">

                  <Button
                    variant="outline-light"
                    className="ms-3"
                    size="lg"
                  >
                    Learn More
                  </Button>

                </Link>

              </div>

            </motion.div>

          </Col>

          <Col lg={6} className="text-center">

            <motion.img

              src="../..png"

              className="img-fluid"

              initial={{ opacity:0,y:60 }}

              animate={{ opacity:1,y:0 }}

              transition={{ duration:1.2 }}

            />

          </Col>

        </Row>

      </Container>

    </section>
  );
}

export default Hero;