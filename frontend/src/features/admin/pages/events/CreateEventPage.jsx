// src/features/admin/pages/events/CreateEventPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { eventStorageService } from "../../../events/services/eventStorageService";
import EventPosterUpload from "../../../events/components/EventPosterUpload/EventPosterUpload";
import ROUTES from "../../../../constants/routes"; // 🟢 Use centralized routes

export default function CreateEventPage() {
  const { eventId: urlEventId } = useParams();
  const navigate = useNavigate();

  const [eventId] = useState(() => urlEventId || `event_${Date.now()}`);
  const isEditMode = Boolean(urlEventId);

  const [formData, setFormData] = useState({
    title: "",
    category: "Workshop",
    date: "",
    time: "",
    location: "Kisumu",
    seats: 100,
    description: "",
    isFeatured: false,
  });

  const [posterPayload, setPosterPayload] = useState(null);
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditMode) return;

    async function loadEventData() {
      try {
        const allEvents = await eventStorageService.getAllEvents();
        const activeRecord = allEvents.find((e) => e.id === urlEventId);

        if (activeRecord) {
          setFormData({
            title: activeRecord.title || "",
            category: activeRecord.category || "Workshop",
            date: activeRecord.date || "",
            time: activeRecord.time || "",
            location: activeRecord.location || "Kisumu", // 🟢 Ensure edit mode loads location
            seats: activeRecord.seats || 100,             // 🟢 Ensure edit mode loads seats
            description: activeRecord.description || "",
            isFeatured: activeRecord.isFeatured || false,
          });
          setPosterPayload(activeRecord.poster || null);
        }
      } catch (err) {
        console.error("Error retrieving historical event properties:", err);
      } finally {
        setLoading(false);
      }
    }
    loadEventData();
  }, [urlEventId, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!posterPayload || posterPayload.status !== "uploaded") {
      alert("Please ensure the event poster has completed uploading successfully.");
      return;
    }

    try {
      setSubmitting(true);
      await eventStorageService.saveEvent(eventId, {
        ...formData,
        poster: posterPayload,
      });

      alert(isEditMode ? "System record updated." : "New event listing registered!");
      navigate(ROUTES.ADMIN_EVENTS);
    } catch (err) {
      console.error("Save failure transaction alert:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-5 text-center text-white">
        <div className="spinner-border text-primary mb-3" />
        <p className="text-white-50 small">Fetching record content map...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4 text-white" style={{ maxWidth: "800px" }}>
      {/* 🟢 Standardized Back Link styling */}
      <Link to={ROUTES.ADMIN_EVENTS} className="btn btn-link text-white-50 p-0 mb-2 text-decoration-none d-inline-flex align-items-center">
        <i className="bi bi-arrow-left me-1" /> Back to Events
      </Link>
      
      <h2 className="text-primary fw-bold mb-4">
        {isEditMode ? "Modify Event Context" : "Register System Event"}
      </h2>

      <div className="card bg-dark border-secondary p-4 shadow-lg">
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div className="form-group">
            <label className="form-label text-white-50 small fw-bold">Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="form-control bg-transparent text-white border-secondary"
              placeholder="e.g. Annual Maritime Symposium"
              required
              disabled={submitting}
            />
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-white-50 small fw-bold">Event Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-select bg-transparent text-white border-secondary"
                required
                disabled={submitting}
              >
                <option value="Workshop" className="bg-dark">Workshop</option>
                <option value="Conference" className="bg-dark">Conference</option>
                <option value="Seminar" className="bg-dark">Seminar</option>
              </select>
            </div>
            
            <div className="col-md-6">
              <label className="form-label text-white-50 small fw-bold">Event Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="form-control bg-transparent text-white border-secondary"
                placeholder="e.g. Kisumu Yacht Club"
                required
                disabled={submitting}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label text-white-50 small fw-bold">Total Available Seats</label>
            <input
              type="number"
              name="seats"
              value={formData.seats}
              onChange={handleInputChange}
              className="form-control bg-transparent text-white border-secondary"
              placeholder="100"
              required
              disabled={submitting}
            />
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-white-50 small fw-bold">Execution Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="form-control bg-transparent text-white border-secondary"
                required
                disabled={submitting}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label text-white-50 small fw-bold">Starting Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="form-control bg-transparent text-white border-secondary"
                disabled={submitting}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label text-white-50 small fw-bold">Summary Context Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-control bg-transparent text-white border-secondary"
              placeholder="Provide a brief overview of the event..."
              rows="4"
              disabled={submitting}
            />
          </div>

          <div className="form-check form-switch my-2">
            <input
              type="checkbox"
              name="isFeatured"
              id="isFeaturedSwitch"
              checked={formData.isFeatured}
              onChange={handleInputChange}
              className="form-check-input cursor-pointer"
              disabled={submitting}
            />
            <label className="form-check-label text-white fw-bold small ms-2" htmlFor="isFeaturedSwitch">
              ⭐️ Feature this entry inside the website billboard hero section
            </label>
          </div>

          <div className="border border-secondary rounded p-3 bg-opacity-25 bg-black">
            <EventPosterUpload
              eventId={eventId}
              value={posterPayload}
              onChange={setPosterPayload}
              disabled={submitting}
            />
          </div>

          {/* 🟢 Action Row Grouping with Standard Buttons */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary px-4 fw-bold text-white"
              disabled={submitting}
              onClick={() => navigate(ROUTES.ADMIN_EVENTS)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary px-4 fw-bold" 
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Synchronizing...
                </>
              ) : isEditMode ? (
                "Update Event"
              ) : (
                "Publish Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
