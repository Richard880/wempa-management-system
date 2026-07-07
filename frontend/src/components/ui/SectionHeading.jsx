import { motion } from "framer-motion";

function SectionHeading({ badge, title, description, light = false }) {
  return (
    <motion.div
      className={`section-heading ${light ? "light" : ""}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {badge && (
        <span className={`section-badge ${light ? "light" : ""}`}>{badge}</span>
      )}

      <h2 className="section-title">{title}</h2>

      {description && <p className="section-description">{description}</p>}
    </motion.div>
  );
}

export default SectionHeading;
