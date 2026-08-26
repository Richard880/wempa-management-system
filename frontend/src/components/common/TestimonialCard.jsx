import { Card } from "react-bootstrap";
import { motion } from "framer-motion";

function TestimonialCard({ testimonial }) {
  // 🟢 1. EXTRACT PROPERTY KEYS MATCHING YOUR DATA ARRAY EXACTLY
  const userMessage = testimonial.message || testimonial.quote || "";
  const userRole = testimonial.role || testimonial.position || "Maritime Professional";
  
  // Safe integer fallback for the stars loop array mapping
  const starRatingCount = testimonial.rating || 5; 

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-100"
    >
      <Card className="testimonial-card border-0 h-100 shadow-sm">
        <Card.Body className="d-flex flex-column justify-content-between p-4">
          <div>
            {/* ⚓ SWITCHED TO NATIVE BOOTSTRAP ICON FOR SYSTEM UNIFORMITY */}
            <i className="bi bi-quote quote-icon fs-2 text-primary d-block mb-2" aria-hidden="true" />

            {/* 🟢 2. RENDER THE CORRECT MESSAGE FIELD PROP */}
            <p className="testimonial-text text-secondary italic mb-3">
              "{userMessage}"
            </p>

            {/* 🟢 3. SAFE RATING STAR FALLBACK ACCORD ARRAY HOOK */}
            <div className="testimonial-stars text-warning mb-4 gap-1 d-flex">
              {[...Array(starRatingCount)].map((_, i) => (
                <i key={i} className="bi bi-star-fill" />
              ))}
            </div>
          </div>

          <div className="testimonial-profile d-flex align-items-center gap-3 mt-auto border-top pt-3">
            {/* Elegant Circle Avatar Fallback Badge background matching layout lines */}
            <div className="testimonial-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold font-monospace" style={{ width: '44px', height: '44px', minWidth: '44px' }}>
              {testimonial.name?.charAt(0).toUpperCase()}
            </div>

            <div className="text-start">
              <h5 className="mb-0 fs-6 fw-bold text-dark">{testimonial.name}</h5>
              <small className="text-muted d-block fw-medium">{userRole}</small>
              
              {/* Only render company block element markers if fields exist inside payload data arrays */}
              {testimonial.company && (
                <small className="text-muted d-block small-sub-text">{testimonial.company}</small>
              )}
            </div>
          </div>

        </Card.Body>
      </Card>
    </motion.div>
  );
}

export default TestimonialCard;
