import { Card } from "react-bootstrap";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

function TestimonialCard({ testimonial }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="testimonial-card border-0 h-100">
        <Card.Body>

          <FaQuoteLeft className="quote-icon" />

          <p className="testimonial-text">
            "{testimonial.quote}"
          </p>

          <div className="testimonial-stars">
            {[...Array(testimonial.rating)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>

          <div className="testimonial-profile">

            <div className="testimonial-avatar">
              {testimonial.name.charAt(0)}
            </div>

            <div>

              <h5>{testimonial.name}</h5>

              <small>
                {testimonial.position}
              </small>

              <br />

              <small className="text-muted">
                {testimonial.company}
              </small>

            </div>

          </div>

        </Card.Body>
      </Card>
    </motion.div>
  );
}

export default TestimonialCard;