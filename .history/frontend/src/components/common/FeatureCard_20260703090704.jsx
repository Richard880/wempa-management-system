import { motion } from "framer-motion";

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="feature-card"
      whileHover={{
        y: -10,
        transition: { duration: 0.2 },
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="feature-icon">{icon}</div>

      <h4>{title}</h4>

      <p>{description}</p>
    </motion.div>
  );
}

export default FeatureCard;
