function WaveDivider() {
  return (
    <div className="hero-wave">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          fill="#ffffff"
          d="
            M0,64
            C240,120
            480,0
            720,48
            C960,96
            1200,140
            1440,64
            L1440,120
            L0,120
            Z"
        />
      </svg>
    </div>
  );
}

export default WaveDivider;
