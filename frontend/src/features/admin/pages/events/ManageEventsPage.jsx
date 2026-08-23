// src/features/admin/pages/events/ManageEventsPage.jsx

import { Link } from "react-router-dom";
import { useEvents } from "../../../events/hooks/useEvents";
import Button from "../../../../components/ui/Button";

export default function ManageEventsPage() {
  const { events, loading, error } = useEvents();

  if (loading) {
    return (
      <div className="p-5 text-center text-white">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-white-50">Loading event records...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        {error}
      </div>
    );
  }

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="container-fluid p-4 text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-primary fw-bold mb-1">Events Directory</h2>
          <p className="text-white-50 small mb-0">
            Monitor, edit, or configure visibility parameters for upcoming and past events.
          </p>
        </div>
        <Link to="/admin/events/new">
          <Button variant="primary" type="button">
            <i className="bi bi-plus-lg me-2" />
            Create Event
          </Button>
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="card bg-dark border-secondary p-5 text-center text-white-50">
          <i className="bi bi-calendar-x display-4 mb-3" />
          <h5>No events found</h5>
          <p className="small">Get started by creating your first system event.</p>
        </div>
      ) : (
        <div className="table-responsive card bg-dark border-secondary">
          <table className="table table-dark table-hover mb-0 align-middle">
            <thead>
              <tr className="border-bottom border-secondary text-white-50">
                <th scope="col" className="ps-3" style={{ width: "80px" }}>Poster</th>
                <th scope="col">Event Details</th>
                <th scope="col">Date & Time</th>
                <th scope="col">Status</th>
                <th scope="col">Featured</th>
                {/* 🟢 Expanded width slightly to cleanly accommodate both action buttons */}
                <th scope="col" className="text-end pe-3" style={{ width: "220px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => {
                const isUpcoming = event.date >= todayStr;
                return (
                  <tr key={event.id} className="border-bottom border-secondary">
                    <td className="ps-3">
                      {event.poster?.posterUrl ? (
                        <img
                          src={event.poster.posterUrl}
                          alt="Poster mini"
                          style={{ width: "45px", height: "60px", objectFit: "cover" }}
                          className="rounded border border-secondary"
                        />
                      ) : (
                        <div 
                          className="bg-secondary rounded d-flex align-items-center justify-content-center"
                          style={{ width: "45px", height: "60px" }}
                        >
                          <i className="bi bi-image text-white-50" />
                        </div>
                      )}
                    </td>
                    <td>
                      <div className="fw-bold text-white mb-1">{event.title}</div>
                      <div className="text-white-50 small text-truncate" style={{ maxWidth: "300px" }}>
                        {event.description || "No descriptive summary."}
                      </div>
                    </td>
                    <td>
                      <div className="small text-white">{event.date}</div>
                      <div className="small text-white-50">{event.time || "Time not specified"}</div>
                    </td>
                    <td>
                      {isUpcoming ? (
                        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25">
                          Upcoming
                        </span>
                      ) : (
                        <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25">
                          Past Event
                        </span>
                      )}
                    </td>
                    <td>
                      {event.isFeatured ? (
                        <span className="text-warning small d-flex align-items-center gap-1">
                          <i className="bi bi-star-fill" /> Yes
                        </span>
                      ) : (
                        <span className="text-white-50 small">No</span>
                      )}
                    </td>
                    <td className="text-end pe-3">
                      {/* 🟢 Actions Button Group wrapper block */}
                      <div className="d-flex justify-content-end gap-2">
                        {/* 🟢 Added Attendee Roster Navigation Button Link */}
                        <Link to={`/admin/events/attendees/${event.id}`}>
                          <Button variant="outline-warning" type="button" className="btn-sm py-1 d-inline-flex align-items-center gap-1">
                            <i className="bi bi-people" /> Attendees
                          </Button>
                        </Link>
                        
                        <Link to={`/admin/events/edit/${event.id}`}>
                          <Button variant="outline-primary" type="button" className="btn-sm py-1 d-inline-flex align-items-center gap-1">
                            <i className="bi bi-pencil" /> Edit
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
