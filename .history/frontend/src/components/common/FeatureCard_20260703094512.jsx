import { motion } from "framer-motion";

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="feature-card"
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <div className="feature-icon">{icon}</div>

      <h4>{title}</h4>

      <p>{description}</p>
    </motion.div>
  );
}

export default FeatureCard;
