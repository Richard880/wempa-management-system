import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function StatCard({ icon, value, title, color = "#003B73" }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  return (
    <div
      ref={ref}
      className="stat-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{
        y: -10,
        transition: { duration: 0.2 },
      }}
    >
      <div className="stat-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>

      <h2 className="stat-number">
        {inView && <CountUp end={value} duration={2} />}+
      </h2>

      <p>{title}</p>
    </div>
  );
}

export default StatCard;
