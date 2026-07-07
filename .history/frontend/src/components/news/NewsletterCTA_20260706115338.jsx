import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

function NewsletterCTA() {
  return (
    <section className="newsletter-section">
      <Container>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          <Row className="align-items-center g-5">

            <Col lg={7}>

              <span className="newsletter-tag">
                WEMPA NEWSLETTER
              </span>

              <h2>
                Get Weekly Maritime Updates
              </h2>

              <p>
                Subscribe to receive maritime industry news,
                WEMPA announcements, conference updates,
                training opportunities and partnership news
                directly in your inbox.
              </p>

              <div className="newsletter-social">

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

            <Col lg={5}>

              <div className="newsletter-card">

                <FaEnvelope className="newsletter-icon"/>

                <h4>Subscribe</h4>

                <Form>

                  <Form.Group className="mb-3">

                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                    />

                  </Form.Group>

                  <Button
                    className="w-100"
                  >
                    Subscribe Now
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

export default NewsletterCTA;