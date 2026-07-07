import { motion } from "framer-motion";

function SectionHeading({
  badge,
  title,
  description,
  light = false,
  align = "center",
}) {
  return (
    <motion.div
      className={`section-heading text-${align}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {badge && (
        <span className={`section-badge ${light ? "light" : ""}`}>{badge}</span>
      )}

      <h2 className={`section-title ${light ? "text-white" : ""}`}>{title}</h2>

      {description && (
        <p className={`section-description ${light ? "text-light" : ""}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
