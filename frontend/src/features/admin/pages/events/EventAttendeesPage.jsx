// src/features/admin/pages/events/EventAttendeesPage.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { eventStorageService } from "../../../events/services/eventStorageService";
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaArrowLeft, FaFileCsv } from "react-icons/fa";

export default function EventAttendeesPage() {
  const { eventId } = useParams();
  const [attendees, setAttendees] = useState([]);
  const [eventTitle, setEventTitle] = useState("Event");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAttendees() {
      try {
        setLoading(true);
        // Fetch matching registration documents from Firestore
        const records = await eventStorageService.getEventRegistrations(eventId);
        setAttendees(records);
        
        // Dynamic title resolution check
        if (records.length > 0) {
          setEventTitle(records[0].eventTitle || "Selected Event");
        } else {
          const allEvents = await eventStorageService.getAllEvents();
          const currentEvent = allEvents.find(e => e.id === eventId);
          if (currentEvent) setEventTitle(currentEvent.title);
        }
      } catch (err) {
        console.error("Error loading roster:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAttendees();
  }, [eventId]);

  // Client-side CSV generator utility
  const exportToCSV = () => {
    if (attendees.length === 0) return;
    const headers = ["Full Name", "Email", "Phone", "Organization", "Registration Date\n"];
    const rows = attendees.map(a => 
      `"${a.fullName}","${a.email}","${a.phone}","${a.organization || 'None'}","${a.registeredAt}"\n`
    );
    
    const blob = new Blob([headers.join(",") + rows.join("")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${eventTitle.toLowerCase().replace(/\s+/g, "_")}_attendees.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="p-5 text-center text-white">Compiling attendee lists...</div>;

  return (
    <div className="container-fluid p-4 text-white">
      {/* Header Panel */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <Link to="/admin/events" className="btn btn-sm btn-outline-secondary mb-2 text-white-50">
            <FaArrowLeft className="me-1" /> Back to Events
          </Link>
          <h2 className="text-primary fw-bold mb-1">Event Attendee Roster</h2>
          <p className="text-white-50 mb-0 small">{eventTitle}</p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="bg-dark border border-secondary px-3 py-2 rounded text-center">
            <span className="small text-white-50 d-block">Total Confirmed</span>
            <strong className="fs-4 text-warning">{attendees.length}</strong>
          </div>
          {attendees.length > 0 && (
            <button onClick={exportToCSV} className="btn btn-outline-success h-100 d-flex align-items-center gap-2">
              <FaFileCsv /> Export CSV
            </button>
          )}
        </div>
      </div>

      {/* Roster Data Grid Sheet */}
      <div className="card bg-dark border-secondary overflow-hidden">
        {attendees.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <FaUser className="display-4 d-block mx-auto mb-3 text-secondary" />
            <p className="fs-5 mb-0">No personnel have registered for this event yet.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0 align-middle">
              <thead>
                <tr className="border-bottom border-secondary text-white-50">
                  <th className="ps-4">Full Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Organization</th>
                  <th className="pe-4 text-end">Registration Date</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((person) => (
                  <tr key={person.id} className="border-bottom border-secondary">
                    <td className="ps-4 fw-semibold text-white">
                      <FaUser className="text-primary me-2 opacity-50" /> {person.fullName}
                    </td>
                    <td>
                      <FaEnvelope className="text-white-50 me-2" /> {person.email}
                    </td>
                    <td>
                      <FaPhone className="text-white-50 me-2" /> {person.phone}
                    </td>
                    <td>
                      <FaBuilding className="text-white-50 me-2" /> {person.organization || <span className="text-muted small">N/A</span>}
                    </td>
                    <td className="pe-4 text-end text-white-50 small">
                      {new Date(person.registeredAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
