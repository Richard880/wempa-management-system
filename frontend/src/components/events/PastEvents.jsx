// src/components/events/PastEvents.jsx
import { Container, 
  Row,
   Col, 
 // Button, 
  Badge } from "react-bootstrap";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
 // FaImages,
} from "react-icons/fa";
import { motion } from "framer-motion";

import SectionHeading from "../common/SectionHeading";

// 1. Import your dynamic live data stream engine hook
import { useEvents } from "../../features/events/hooks/useEvents";

function PastEvents() {
  // 2. Fetch live data records stream directly from Firestore
  const { events, loading } = useEvents();

  // 3. Return a clean loading placeholder state while fetching database matrix
  if (loading) return null;

  // 4. Calculate today's string format (YYYY-MM-DD) to compare dates chronologically
  const todayStr = new Date().toISOString().split("T")[0];
  
  // 5. Filter out events where the scheduled date is strictly less than today
  const historicalItems = events.filter((event) => event.date < todayStr);

  // 6. Gracefully hide the section if there are no historical records in the database
  if (historicalItems.length === 0) return null;

  return (
    <section className="past-events-section">
      <Container>
        <SectionHeading
          badge="PAST EVENTS"
          title="Highlights From Previous Events"
          description="Take a look at some of the conferences, workshops and community initiatives organized by WEMPA."
        />

        <Row className="g-4">
          {/* 7. Loop dynamically through your filtered database items array */}
          {historicalItems.map((event) => (
            <Col lg={4} md={6} key={event.id}>
              <motion.div className="past-event-card" whileHover={{ y: -8 }}>
                <div className="past-event-image" style={{ height: "240px", overflow: "hidden" }}>
                  {/* 8. Use real live cloud storage optimization URL or fallback */}
                  <img 
                    src={event.poster?.posterUrl || "/events/default-placeholder.jpg"} 
                    alt={event.title} 
                    className="w-100 h-100 object-fit-cover"
                  />

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
                      {event.location || "Kisumu"}
                    </span>

                    <span>
                      <FaUsers />
                      {/* 9. Seamlessly map your administrative seats parameter field */}
                      {event.seats || 0} Participants
                    </span>
                  </div>

                  {/* <Button variant="outline-primary" className="w-100 mt-3">
                    <FaImages className="me-2" />
                    View Gallery
                  </Button> */}
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
