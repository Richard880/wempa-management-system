// src/components/events/EventCard.jsx


export default function EventCard({ event }) {
  if (!event) return null;

  return (
    <div className="card h-100 shadow-sm border-0 bg-light">
      <div className="position-relative" style={{ height: "320px", overflow: "hidden" }}>
        {event.poster?.posterUrl ? (
          <img
            src={event.poster.posterUrl}
            alt={`${event.title} poster`}
            className="w-100 h-100 object-fit-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-100 h-100 bg-secondary d-flex flex-column align-items-center justify-content-center text-white-50">
            <i className="bi bi-image display-4 mb-2" />
            <span className="small">No Poster Available</span>
          </div>
        )}
      </div>
      
      <div className="card-body d-flex flex-column p-4">
        <h4 className="card-title fw-bold text-dark text-truncate mb-2" title={event.title}>
          {event.title}
        </h4>
        
        <div className="d-flex flex-wrap gap-3 text-muted small mb-3">
          <span className="d-flex align-items-center gap-1">
            <i className="bi bi-calendar3 text-primary" /> {event.date}
          </span>
          {event.time && (
            <span className="d-flex align-items-center gap-1">
              <i className="bi bi-clock text-primary" /> {event.time}
            </span>
          )}
        </div>

        <p className="card-text text-secondary small flex-grow-1 text-line-clamp-3">
          {event.description || "No event description provided."}
        </p>
      </div>
    </div>
  );
}
