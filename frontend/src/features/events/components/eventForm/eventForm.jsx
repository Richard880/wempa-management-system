// src/features/events/components/EventForm.jsx
import { useState } from "react";
import Button from "../../../components/ui/Button"; // Adjust path to matches your UI folder
import EventPosterUpload from "./EventPosterUpload/EventPosterUpload";
import { eventStorageService } from "../services/eventStorageService";

export default function EventForm({ initialEventId = null }) {
  // Generate a random unique ID if it is a brand-new creation
  const [eventId] = useState(() => initialEventId || `event_${Date.now()}`);
  
  // Core administrative metadata fields
  const [formData, setFormData] = useState({
    title: "",
    date: "",        // Saved as YYYY-MM-DD
    time: "",
    description: "",
    isFeatured: false, // Toggled manually by admin
  });

  // Track the uploaded poster payload emitted by the hook via onChange
  const [posterPayload, setPosterPayload] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePosterChange = (uploadedMetadata) => {
    setPosterPayload(uploadedMetadata);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.date) {
      alert("Please fill in the Event Title and Date.");
      return;
    }

    if (!posterPayload || posterPayload.status !== "uploaded") {
      alert("Please upload a poster image or wait for it to finish uploading.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Construct a clean, standardized payload matching public category structures
      const finalEventData = {
        title: formData.title,
        date: formData.date,
        time: formData.time,
        description: formData.description,
        isFeatured: formData.isFeatured,
        // Nest your verified upload infrastructure fields safely inside the record
        poster: posterPayload, 
      };

      await eventStorageService.saveEvent(eventId, finalEventData);
      alert("Event structured and synchronized successfully!");
      
    } catch (error) {
      console.error("Failed to save full event record:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <label htmlFor="title">Event Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <label htmlFor="date">Event Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div style={{ flex: 1 }}>
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="description">Event Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows="4"
        />
      </div>

      {/* Categories Toggle Flag */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input
          type="checkbox"
          id="isFeatured"
          name="isFeatured"
          checked={formData.isFeatured}
          onChange={handleInputChange}
        />
        <label htmlFor="isFeatured" style={{ margin: 0, fontWeight: "600" }}>
          ⭐️ Feature this event on the main public hero banner
        </label>
      </div>

      {/* Your exact EventPosterUpload component wireframe layout */}
      <EventPosterUpload
        eventId={eventId}
        value={posterPayload}
        onChange={handlePosterChange}
        disabled={isSubmitting}
      />

      <Button type="submit" variant="primary" disabled={isSubmitting}>
        {isSubmitting ? "Publishing Event..." : "Publish to Public Pages"}
      </Button>
    </form>
  );
}
