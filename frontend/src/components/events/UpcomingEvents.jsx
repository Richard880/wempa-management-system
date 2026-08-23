// src/components/events/UpcomingEvents.jsx
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

import SectionHeading from "../common/SectionHeading";

// 1. Import your dynamic live data stream engine hook
import { useEvents } from "../../features/events/hooks/useEvents";

function UpcomingEvents() {
  // 2. Fetch live data records stream directly from Firestore
  const { events, loading, error } = useEvents();

  if (loading) {
    return (
      <div className="text-center py-5 text-muted">
        <div className="spinner-border spinner-border-sm text-primary me-2" role="status" />
        <span>Loading live schedule...</span>
      </div>
    );
  }

  if (error) return <div className="alert alert-danger mx-3">{error}</div>;

  // 3. Calculate today's string format (YYYY-MM-DD) to filter chronologically
  const todayStr = new Date().toISOString().split("T")[0];

  // 4. Isolate events scheduled for today or in the future
  const upcomingItems = events.filter((event) => event.date >= todayStr);

  // 5. Render a clean placeholder if no future events exist in the database
  if (upcomingItems.length === 0) {
    return (
      <div className="text-center py-5 my-4 border rounded bg-light text-muted">
        <FaCalendarAlt className="display-6 mb-2 d-block mx-auto text-secondary" />
        <p className="mb-0 fw-medium">No upcoming events are currently scheduled.</p>
      </div>
    );
  }

  return (
    <section className="upcoming-events-section">
      <Container>
        <SectionHeading
          badge="UPCOMING EVENTS"
          title="Join Our Upcoming Events"
          description="Participate in conferences, workshops, networking sessions and professional development programmes organized by WEMPA."
        />

        <Row className="g-4">
          {/* 6. Loop dynamically through your filtered database items array */}
          {upcomingItems.map((event) => (
            <Col lg={4} md={6} key={event.id}>
              <motion.div className="event-card" whileHover={{ y: -10 }}>
                <div className="event-image" style={{ height: "240px", overflow: "hidden" }}>
                  {/* 7. Use real live cloud storage optimization URL or fallback */}
                  <img 
                    src={event.poster?.posterUrl || "/events/default-placeholder.jpg"} 
                    alt={event.title} 
                    className="w-100 h-100 object-fit-cover"
                  />

                  <Badge className="event-category">{event.category || "General"}</Badge>
                </div>

                <div className="event-content">
                  <div className="event-info">
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
                      {event.seats || 0} Seats
                    </span>
                  </div>

                  <h4>{event.title}</h4>

                  <div className="event-footer">
                    {/* 8. Fallback to free if no custom billing price parameter is present */}
                    <strong>{event.price || "Free"}</strong>

            
                  <Button as={Link} to={`/register-event/${event.id}`} size="sm">
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
