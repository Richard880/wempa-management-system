// src/components/events/FeaturedEvent.jsx
import { Container, Row, Col, Button } from "react-bootstrap";
import EventCountdown from "../common/EventCountdown";
import { FaCalendarAlt, 
  FaMapMarkerAlt, 
  //FaArrowRight 
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// 1. Import your dynamic live stream data pipeline engine hook
import { useEvents } from "../../features/events/hooks/useEvents";

import "../../styles/pages/events.css";

function FeaturedEvent() {
  // 2. Fetch live data records stream directly from Firestore
  const { events, loading } = useEvents();

  // 3. Isolate the entry explicitly flagged with "isFeatured: true" by an admin
  const liveFeaturedEvent = !loading ? events.find((e) => e.isFeatured === true) : null;

  // 4. Return null or placeholder row block structure while fetching
  if (loading) {
    return (
      <div className="text-center py-5 text-muted">
        <div className="spinner-border spinner-border-sm text-primary me-2" role="status" />
        <span>Syncing live community highlight...</span>
      </div>
    );
  }

  // 5. Hide section gracefully if no event is currently marked as featured
  if (!liveFeaturedEvent) return null;

  // 6. Format execution timestamp seamlessly for the target countdown string engine
  // Combines "YYYY-MM-DD" and "HH:MM" paths into a valid ISO string combo
  const targetCountdownString = liveFeaturedEvent.time 
    ? `${liveFeaturedEvent.date}T${liveFeaturedEvent.time}:00`
    : `${liveFeaturedEvent.date}T00:00:00`;

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
                <div className="featured-event-image" style={{ height: "100%", minHeight: "350px", overflow: "hidden" }}>
                  {/* 7. Read the real live cloud storage optimization URL or fallback */}
                  <img 
                    src={liveFeaturedEvent.poster?.posterUrl || "/events/default-placeholder.jpg"} 
                    alt={liveFeaturedEvent.title} 
                    className="w-100 h-100 object-fit-cover"
                  />
                </div>
              </Col>

              <Col lg={6}>
                <div className="featured-event-content">
                  <div className="event-meta">
                    <span>
                      <FaCalendarAlt />
                      {/* 8. Output real live database text strings values instead */}
                      {liveFeaturedEvent.date}
                    </span>

                    <span>
                      <FaMapMarkerAlt />
                      {/* 9. Output dynamic location field text values */}
                      {liveFeaturedEvent.location || "Kisumu"}
                    </span>
                  </div>

                  <h3>{liveFeaturedEvent.title}</h3>

                  <p>{liveFeaturedEvent.description}</p>

                  <div className="featured-buttons">
                    {/* 10. Pass calculated dynamic database target path strings */}
                    <EventCountdown targetDate={targetCountdownString} />

                  <Button as={Link} to={`/register-event/${liveFeaturedEvent.id}`}>
                          Register Now
                        </Button>

{/* 
                    <Button variant="outline-primary" as={Link} to="/events">
                      Learn More
                      <FaArrowRight className="ms-2" />
                    </Button> */}
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
