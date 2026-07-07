import { motion } from "framer-motion";
import Section from "./Section";

function PageBanner({ title, subtitle, backgroundImage }) {
  return (
    <Section fluid className="page-banner">
      <div
        className="page-banner-overlay"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <motion.div
          className="page-banner-content"
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <h1>{title}</h1>

          <p>{subtitle}</p>
        </motion.div>
      </div>
    </Section>
  );
}

export default PageBanner;
