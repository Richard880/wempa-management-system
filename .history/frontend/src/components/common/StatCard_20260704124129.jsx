import CountUp from "react-countup";

console.log(typeof CountUp, CountUp);
function StatCard({ icon, value, title }) {
  return (
    <div
      style={{
        padding: "20px",
        background: "white",
        border: "1px solid #ddd",
        textAlign: "center",
      }}
    >
      <div>{icon}</div>

      <h2>
        <CountUp end={value} />
      </h2>

      <p>{title}</p>
    </div>
  );
}

export default StatCard;
