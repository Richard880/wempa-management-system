// src/features/admin/pages/events/EventAttendeesPage.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { eventStorageService } from "../../../events/services/eventStorageService";
import ROUTES from "../../../../constants/routes"; // 🟢 Added for route consistency

export default function EventAttendeesPage() {
  const { eventId } = useParams();
  const [attendees, setAttendees] = useState([]);
  const [eventTitle, setEventTitle] = useState("Event");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAttendees() {
      try {
        setLoading(true);
        const records = await eventStorageService.getEventRegistrations(eventId);
        setAttendees(records);
        
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

  if (loading) {
    return (
      <div className="p-5 text-center text-white">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-white-50">Compiling attendee lists...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4 text-white">
      {/* Header Panel */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          {/* 🟢 Updated to match News/Events standard back button styling */}
          <Link 
  to={ROUTES.ADMIN_EVENTS} 
  className="btn btn-link text-primary p-0 mb-2 text-decoration-none d-inline-flex align-items-center"
>
  <i className="bi bi-arrow-left me-1" /> Back to Events
</Link>

          <h2 className="text-primary fw-bold mb-1">Event Attendee Roster</h2>
          <p className="text-white-50 mb-0 small">Project Briefing: <span className="text-white">{eventTitle}</span></p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="bg-dark border border-secondary px-3 py-2 rounded text-center">
            <span className="small text-white-50 d-block">Total Confirmed</span>
            <strong className="fs-4 text-warning">{attendees.length}</strong>
          </div>
          {attendees.length > 0 && (
            <button onClick={exportToCSV} className="btn btn-primary fw-bold py-2 px-3 d-flex align-items-center gap-2 h-100">
              <i className="bi bi-file-earmark-spreadsheet" /> Export CSV
            </button>
          )}
        </div>
      </div>

      {/* Roster Data Grid Sheet */}
      <div className="table-responsive card bg-dark border-secondary overflow-hidden">
        {attendees.length === 0 ? (
          <div className="text-center py-5 text-white-50">
            <i className="bi bi-people display-4 d-block mb-3 opacity-25" />
            <h5 className="text-white">No attendees found</h5>
            <p className="small">Personnel who register for this event will appear in this roster.</p>
          </div>
        ) : (
          <table className="table table-dark table-hover mb-0 align-middle">
            <thead>
              <tr className="border-bottom border-secondary text-white-50">
                <th scope="col" className="ps-4">Full Name</th>
                <th scope="col">Email Address</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Organization</th>
                <th scope="col" className="pe-4 text-end">Registration Date</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((person) => (
                <tr key={person.id} className="border-bottom border-secondary">
                  <td className="ps-4 fw-semibold text-white">
                    <i className="bi bi-person-circle text-primary me-2 opacity-50" /> {person.fullName}
                  </td>
                  <td>
                    <i className="bi bi-envelope text-white-50 me-2" /> {person.email}
                  </td>
                  <td>
                    <i className="bi bi-phone text-white-50 me-2" /> {person.phone}
                  </td>
                  <td>
                    <i className="bi bi-building text-white-50 me-2" /> {person.organization || <span className="text-muted small">N/A</span>}
                  </td>
                  <td className="pe-4 text-end text-white-50 small">
                    {new Date(person.registeredAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
