import AnimatedCounter from "./AnimatedCounter";

function StatCard({ icon, value, title, color }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>

      <h2 className="stat-number">
        <AnimatedCounter end={value} />+
      </h2>

      <p>{title}</p>
    </div>
  );
}

export default StatCard;
