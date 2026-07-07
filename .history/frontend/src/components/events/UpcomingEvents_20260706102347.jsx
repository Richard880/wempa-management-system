import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

import SectionHeading from "../ui/SectionHeading";
import { upcomingEvents } from "../../data/eventsData";

function UpcomingEvents() {
  return (
    <section className="upcoming-events-section">
      <Container>
        <SectionHeading
          badge="UPCOMING EVENTS"
          title="Join Our Upcoming Events"
          description="Participate in conferences, workshops, networking sessions and professional development programmes organized by WEMPA."
        />

        <Row className="g-4">
          {upcomingEvents.map((event) => (
            <Col lg={4} md={6} key={event.id}>
              <motion.div className="event-card" whileHover={{ y: -10 }}>
                <div className="event-image">
                  <img src={event.image} alt={event.title} />

                  <Badge className="event-category">{event.category}</Badge>
                </div>

                <div className="event-content">
                  <div className="event-info">
                    <span>
                      <FaCalendarAlt />
                      {event.date}
                    </span>

                    <span>
                      <FaMapMarkerAlt />
                      {event.location}
                    </span>

                    <span>
                      <FaUsers />
                      {event.seats} Seats
                    </span>
                  </div>

                  <h4>{event.title}</h4>

                  <div className="event-footer">
                    <strong>{event.price}</strong>

                    <Button as={Link} to="/register" size="sm">
                      Register
                      <FaArrowRight className="ms-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default UpcomingEvents;
