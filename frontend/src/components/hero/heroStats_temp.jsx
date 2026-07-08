function HeroStats({ stats }) {
    return (
      <div className="hero-stats">
        {stats.map((item, index) => (
          <div className="hero-stat-card" key={index}>
            <h3>{item.value}</h3>
  
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    );
  }
  
  export default HeroStats;