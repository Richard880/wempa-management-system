import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function EventsCTA() {
  return (
    <section className="events-cta-section">
      <Container>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
        >

          <Row className="align-items-center g-5">

            <Col lg={7}>

              <span className="events-tag">
                STAY CONNECTED
              </span>

              <h2>
                Never Miss Another WEMPA Event
              </h2>

              <p>
                Subscribe to receive notifications about conferences,
                workshops, networking sessions, maritime training,
                scholarships and career opportunities.
              </p>

            </Col>

            <Col lg={5}>

              <div className="events-subscribe">

                <Form>

                  <Form.Group className="mb-3">

                    <Form.Control
                      type="email"
                      placeholder="Enter your email address"
                    />

                  </Form.Group>

                  <Button
                    className="w-100 mb-3"
                  >
                    Subscribe
                  </Button>

                  <Button
                    as={Link}
                    to="/register"
                    variant="outline-light"
                    className="w-100"
                  >
                    Become a Member
                  </Button>

                </Form>

              </div>

            </Col>

          </Row>

        </motion.div>

      </Container>
    </section>
  );
}

export default EventsCTA;