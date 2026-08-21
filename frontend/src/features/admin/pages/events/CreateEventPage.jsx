// src/features/admin/pages/events/CreateEventPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { eventStorageService } from "../../../events/services/eventStorageService";
import EventPosterUpload from "../../../events/components/EventPosterUpload/EventPosterUpload";
import Button from "../../../../components/ui/Button";

export default function CreateEventPage() {
  const { eventId: urlEventId } = useParams();
  const navigate = useNavigate();

  const [eventId] = useState(() => urlEventId || `event_${Date.now()}`);
  const isEditMode = Boolean(urlEventId);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
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
            date: activeRecord.date || "",
            time: activeRecord.time || "",
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
      navigate("/admin/events");
    } catch (err) {
      console.error("Save failure transaction alert:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-5 text-center text-white">Fetching record content map...</div>;
  }

  return (
    <div className="container-fluid p-4 text-white" style={{ maxWidth: "800px" }}>
      <h2 className="text-primary fw-bold mb-4">
        {isEditMode ? "Modify Event Context" : "Register System Event"}
      </h2>

      <div className="card bg-dark border-secondary p-4">
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div className="form-group">
            <label className="form-label text-white-50 small fw-bold">Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="form-control bg-transparent text-white border-secondary"
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

          <div className="d-flex justify-content-end gap-2 mt-2">
            <Button
              variant="outline-secondary"
              type="button"
              disabled={submitting}
              onClick={() => navigate("/admin/events")}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? "Processing Transaction..." : "Publish Content Frame"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
