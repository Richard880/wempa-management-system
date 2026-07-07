import { Row, Col } from "react-bootstrap";

import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import EventCard from "../common/EventCard";

import events from "../../data/events";

import "../../styles/pages/events.css";

function UpcomingEvents() {
  return (
    <Section background="white">
      <SectionHeading
        badge="UPCOMING EVENTS"
        title="Join Our Upcoming Maritime Events"
        description="Stay connected through workshops, conferences, seminars and networking opportunities organized by WEMPA."
      />

      <Row className="g-4">
        {events.map((event) => (
          <Col lg={4} md={6} key={event.id}>
            <EventCard event={event} />
          </Col>
        ))}
      </Row>
    </Section>
  );
}

export default UpcomingEvents;
