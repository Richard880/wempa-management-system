// src/features/public/pages/EventRegistrationPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaCheckCircle, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { useEvents } from "../../events/hooks/useEvents";
import { getFirestore, doc, runTransaction } from "firebase/firestore";

export default function EventRegistrationPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { events, loading } = useEvents();
  const db = getFirestore();

  const [activeEvent, setActiveEvent] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
  });

  useEffect(() => {
    if (!loading && events) {
      const match = events.find((e) => e.id === eventId);
      if (match) setActiveEvent(match);
    }
  }, [eventId, events, loading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      // Use an atomic transaction to ensure seats are decremented safely without race conditions
      const eventRef = doc(db, "events", eventId);
      const registrationRef = doc(db, "registrations", `reg_${Date.now()}`);

      await runTransaction(db, async (transaction) => {
        const eventSnapshot = await transaction.get(eventRef);
        if (!eventSnapshot.exists()) {
          throw new Error("Event record no longer exists.");
        }

        const eventData = eventSnapshot.data();
        const availableSeats = Number(eventData.seats) || 0;

        if (availableSeats <= 0) {
          throw new Error("Sorry, this event has reached maximum seating capacity.");
        }

        // Deduct exactly one seat from the remaining total pool
        transaction.update(eventRef, { seats: availableSeats - 1 });

        // Build out registration document mapping
        transaction.set(registrationRef, {
          id: registrationRef.id,
          eventId,
          eventTitle: eventData.title,
          ...formData,
          registeredAt: new Date().toISOString(),
          status: "Confirmed",
        });
      });

      setSuccess(true);
    } catch (err) {
      console.error("Booking transactional error context:", err);
      setErrorMsg(err.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-center p-5 text-secondary">Loading ticket context matrix...</div>;
  if (!activeEvent && !loading) return <div className="text-center p-5 text-danger">Event asset matching target identifier not found.</div>;

  if (success) {
    return (
      <Container className="py-5 text-center" style={{ maxWidth: "600px" }}>
        <Card className="border-0 shadow p-5 bg-white text-dark rounded-3">
          <FaCheckCircle className="text-success display-1 mb-4 mx-auto" />
          <h2 className="fw-bold mb-3">Registration Successful!</h2>
          <p className="text-secondary mb-4">
            Your seat for <strong>{activeEvent.title}</strong> has been secured. We have logged your parameters into our WEMPA attendance portal databases.
          </p>
          <Button as={Link} to="/events" variant="primary" className="px-4">
            Return to Events Schedule
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="g-4 justify-content-center">
        <Col lg={5}>
          {/* Summary contextual review card */}
          <Card className="border-0 bg-dark text-white p-4 shadow h-100 rounded-3">
            <div className="mb-3">
              <span className="badge bg-primary text-uppercase px-2.5 py-1.5 fw-bold" style={{ fontSize: "0.75rem" }}>
                {activeEvent.category}
              </span>
            </div>
            <h3 className="fw-bold mb-4">{activeEvent.title}</h3>
            
            <div className="d-flex flex-column gap-3 text-white-50 mb-4">
              <div className="d-flex align-items-center gap-2"><FaCalendarAlt className="text-primary" /> <span>{activeEvent.date}</span></div>
              <div className="d-flex align-items-center gap-2"><FaClock className="text-primary" /> <span>{activeEvent.time || "TBD"}</span></div>
              <div className="d-flex align-items-center gap-2"><FaMapMarkerAlt className="text-danger" /> <span>{activeEvent.location || "Kisumu"}</span></div>
            </div>

            <div className="p-3 rounded bg-opacity-10 bg-white border border-secondary text-start mb-4">
              <span className="d-block small text-white-50">Remaining Availability:</span>
              <strong className="fs-4 text-warning">{activeEvent.seats} Seats Left</strong>
            </div>

            {activeEvent.poster?.posterUrl && (
              <img src={activeEvent.poster.posterUrl} alt="" className="img-fluid rounded border border-secondary w-100 object-fit-cover" style={{ maxHeight: "200px" }} />
            )}
          </Card>
        </Col>

        <Col lg={6}>
          {/* User processing parameter registration capture block card */}
          <Card className="border-0 bg-white text-dark p-4 p-md-5 shadow rounded-3">
            <h4 className="fw-bold text-dark mb-2">Secure Your Ticket</h4>
            <p className="text-secondary small mb-4">Please input your current communication coordinates accurately to finalize seat reservations.</p>

            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

            <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3 text-start">
              <Form.Group>
                <Form.Label className="small fw-bold text-muted"><FaUser className="me-2" />Full Name</Form.Label>
                <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required placeholder="Enter full name" disabled={submitting} />
              </Form.Group>

              <Form.Group>
                <Form.Label className="small fw-bold text-muted"><FaEnvelope className="me-2" />Email Address</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="email@address.com" disabled={submitting} />
              </Form.Group>

              <Form.Group>
                <Form.Label className="small fw-bold text-muted"><FaPhone className="me-2" />Phone Number</Form.Label>
                <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="+254..." disabled={submitting} />
              </Form.Group>

              <Form.Group>
                <Form.Label className="small fw-bold text-muted">Organization / Institution</Form.Label>
                <Form.Control type="text" name="organization" value={formData.organization} onChange={handleInputChange} placeholder="e.g. Maritime Corp" disabled={submitting} />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100 py-2.5 mt-3 fw-bold" disabled={submitting || activeEvent.seats <= 0}>
                {submitting ? "Processing Ticket Seat Assignment..." : "Confirm Attendance Registration"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
