function StatCard({ icon, value, title, color }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>

      <h2>{value}</h2>

      <p>{title}</p>
    </div>
  );
}

export default StatCard;
