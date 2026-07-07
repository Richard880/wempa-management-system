import { motion } from "framer-motion";

import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

function HeroContent({ data }) {
  return (
    <motion.div
      className="hero-content"
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <span className="hero-badge">{data.badge}</span>

      <h1>{data.title}</h1>

      <p>{data.description}</p>

      <HeroButtons
        primaryButton={data.primaryButton}
        secondaryButton={data.secondaryButton}
      />

      <HeroStats stats={data.stats} />
    </motion.div>
  );
}

export default HeroContent;
