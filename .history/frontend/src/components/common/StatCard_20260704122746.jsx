import * as CountUpModule from "react-countup";

const CountUp = CountUpModule.default;

console.log("CountUp =", CountUp);

function StatCard({ icon, value, title, color }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: color }}>
        {icon}
      </div>

      <h2>
        <CountUp end={value} duration={2} />
      </h2>

      <p>{title}</p>
    </div>
  );
}

export default StatCard;
