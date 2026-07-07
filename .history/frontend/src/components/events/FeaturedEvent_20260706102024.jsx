import { Container, Row, Col, Button } from "react-bootstrap";
import EventCountdown from "../common/EventCountdown";
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { featuredEvent } from "../../data/eventsData";

import "../../styles/events.css";

function FeaturedEvent() {
  return (
    <section className="featured-event-section">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-heading">
            <span className="section-badge">FEATURED EVENT</span>

            <h2 className="section-title">Don't Miss Our Biggest Event</h2>

            <p className="section-description">
              Join professionals, researchers and industry leaders as we shape
              the future of maritime development in Western Kenya.
            </p>
          </div>

          <div className="featured-event-card">
            <Row className="g-0 align-items-center">
              <Col lg={6}>
                <div className="featured-event-image">
                  <img src={featuredEvent.image} alt={featuredEvent.title} />
                </div>
              </Col>

              <Col lg={6}>
                <div className="featured-event-content">
                  <div className="event-meta">
                    <span>
                      <FaCalendarAlt />

                      {featuredEvent.date}
                    </span>

                    <span>
                      <FaMapMarkerAlt />

                      {featuredEvent.location}
                    </span>
                  </div>

                  <h3>{featuredEvent.title}</h3>

                  <p>{featuredEvent.description}</p>

                  <div className="featured-buttons">


                  
                    <Button as={Link} to="/register">
                      Register Now
                    </Button>

                    <Button variant="outline-primary">
                      Learn More
                      <FaArrowRight className="ms-2" />
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default FeaturedEvent;
