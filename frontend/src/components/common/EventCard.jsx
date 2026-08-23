// src/components/common/EventCard.jsx
import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";

export default function EventCard({ event }) {
  if (!event) return null;

  // 1. Safe parsing engine checks for undefined dates to prevent application crash
  const date = event.date ? new Date(event.date) : new Date();
  
  // Guard against invalid formats displaying raw "NaN" values on screen
  const isInvalidDate = isNaN(date.getTime());
  const day = isInvalidDate ? "--" : date.getDate();
  const month = isInvalidDate ? "..." : date.toLocaleString("default", { month: "short" });

  return (
    <Card className="event-card h-100 shadow-sm border-0">
      {/* 2. Added explicit dimensions wrapper to prevent image height crushing layout shifts */}
      <div className="event-image" style={{ height: "220px", width: "100%", overflow: "hidden", position: "relative" }}>
        
        {/* 3. Stream optimized live Storage URL token link with fallback handlers */}
        <img 
          src={event.poster?.posterUrl || event.image || "/events/default-placeholder.jpg"} 
          alt={event.title} 
          className="w-100 h-100 object-fit-cover img-fluid"
          onError={(e) => { e.target.src = "/events/default-placeholder.jpg"; }}
        />

        <Badge bg="warning" className="event-category position-absolute top-0 end-0 m-3 text-uppercase">
          {event.category || "General"}
        </Badge>

        <div className="event-date">
          <span>{day}</span>
          <small>{month}</small>
        </div>
      </div>

      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <h4 className="fw-bold text-dark mb-3 text-start fs-5">{event.title}</h4>

          <p className="text-secondary small mb-2 text-start">
            <FaClock className="text-primary me-2" /> {event.time || "Time TBD"}
          </p>

          <p className="text-secondary small mb-2 text-start">
            <FaMapMarkerAlt className="text-danger me-2" /> {event.location || "Kisumu"}
          </p>

          <p className="text-secondary small mb-4 text-start">
            <FaUsers className="text-success me-2" /> {event.seats !== undefined ? `${event.seats} Seats Available` : "Seats TBD"}
          </p>
        </div>

        {/* 4. Link routing redirects directly down to public ticket registration views */}
        <Button 
          as={Link} 
          to={`/register-event/${event.id}`} 
          className="w-100 py-2.5 fw-semibold mt-auto"
          disabled={event.seats <= 0}
        >
          {event.seats <= 0 ? "Fully Booked" : "Register Now"}
        </Button>
      </Card.Body>
    </Card>
  );
}


