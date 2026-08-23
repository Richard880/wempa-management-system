// src/components/home/UpcomingEvents.jsx
import { Row, Col } from "react-bootstrap";

import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import EventCard from "../common/EventCard";

// 1. Import your dynamic live data stream engine hook
import { useEvents } from "../../features/events/hooks/useEvents";

import "../../styles/pages/events.css";

function UpcomingEvents() {
  // 2. Fetch live data records stream directly from Firestore
  const { events, loading, error } = useEvents();

  // 3. Render a clean placeholder while fetching the active database matrix
  if (loading) {
    return (
      <Section background="white">
        <div className="text-center py-5 text-muted">
          <div className="spinner-border spinner-border-sm text-primary me-2" role="status" />
          <span>Syncing live community schedule...</span>
        </div>
      </Section>
    );
  }

  if (error) return null; // Failsafe: hide homepage segment quietly if database drops

  // 4. Calculate today's string format (YYYY-MM-DD) to filter entries chronologically
  const todayStr = new Date().toISOString().split("T")[0];

  // 5. Isolate events scheduled for today or in the future
  const upcomingItems = events.filter((event) => event.date >= todayStr);

  // 6. Gracefully hide the block or show a small alert if no future events exist
  if (upcomingItems.length === 0) {
    return (
      <Section background="white">
        <SectionHeading
          badge="UPCOMING EVENTS"
          title="Join Our Upcoming Maritime Events"
          description="Stay connected through workshops, conferences, seminars and networking opportunities organized by WEMPA."
        />
        <div className="text-center py-4 text-muted border border-dashed rounded bg-light">
          <p className="mb-0 small fw-medium">No public events are currently scheduled. Check back soon!</p>
        </div>
      </Section>
    );
  }

  return (
    <Section background="white">
      <SectionHeading
        badge="UPCOMING EVENTS"
        title="Join Our Upcoming Maritime Events"
        description="Stay connected through workshops, conferences, seminars and networking opportunities organized by WEMPA."
      />

      <Row className="g-4">
        {/* 7. Loop dynamically through your first 3 filtered database items for homepage cleanup */}
        {upcomingItems.slice(0, 3).map((event) => (
          <Col lg={4} md={6} key={event.id}>
            {/* The live properties match perfectly due to your updated CreateEventPage form fields */}
            <EventCard event={event} />
          </Col>
        ))}
      </Row>
    </Section>
  );
}

export default UpcomingEvents;
