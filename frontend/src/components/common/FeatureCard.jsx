import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="feature-card h-100"
      whileHover={{
        y: -10,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="feature-icon">{icon}</div>

      <h4>{title}</h4>

      <p>{description}</p>

      <div className="feature-link">
        Learn More <FaArrowRight />
      </div>
    </motion.div>
  );
}

export default FeatureCard;
