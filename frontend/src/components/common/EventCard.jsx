import { Card, Badge, Button } from "react-bootstrap";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";

function EventCard({ event }) {
  const date = new Date(event.date);

  const day = date.getDate();

  const month = date.toLocaleString("default", {
    month: "short",
  });

  return (
    <Card className="event-card h-100 shadow-sm border-0">
      <div className="event-image">
        <img src={event.image} alt={event.title} className="img-fluid" />

        <Badge bg="warning" className="event-category">
          {event.category}
        </Badge>

        <div className="event-date">
          <span>{day}</span>

          <small>{month}</small>
        </div>
      </div>

      <Card.Body>
        <h4>{event.title}</h4>

        <p>
          <FaClock /> {event.time}
        </p>

        <p>
          <FaMapMarkerAlt /> {event.location}
        </p>

        <p>
          <FaUsers /> {event.seats} Seats
        </p>

        <Button className="w-100">Register Now</Button>
      </Card.Body>
    </Card>
  );
}

export default EventCard;
