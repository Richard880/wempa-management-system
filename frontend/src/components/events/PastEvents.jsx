import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaImages,
} from "react-icons/fa";
import { motion } from "framer-motion";

import SectionHeading from "../ui/SectionHeading";
import { pastEvents } from "../../data/eventsData";

function PastEvents() {
  return (
    <section className="past-events-section">
      <Container>
        <SectionHeading
          badge="PAST EVENTS"
          title="Highlights From Previous Events"
          description="Take a look at some of the conferences, workshops and community initiatives organized by WEMPA."
        />

        <Row className="g-4">
          {pastEvents.map((event) => (
            <Col lg={4} md={6} key={event.id}>
              <motion.div className="past-event-card" whileHover={{ y: -8 }}>
                <div className="past-event-image">
                  <img src={event.image} alt={event.title} />

                  <Badge bg="secondary">Completed</Badge>
                </div>

                <div className="past-event-content">
                  <h4>{event.title}</h4>

                  <div className="past-meta">
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
                      {event.attendees} Participants
                    </span>
                  </div>

                  <Button variant="outline-primary" className="w-100 mt-3">
                    <FaImages className="me-2" />
                    View Gallery
                  </Button>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default PastEvents;
