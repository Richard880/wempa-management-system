import { Container } from "react-bootstrap";
import { motion } from "framer-motion";

import "../../styles/layout/pageBanner.css";

function PageBanner({ title, subtitle, background }) {
  return (
    <section
      className="page-banner"
      style={{
        backgroundImage: `
        linear-gradient(
        rgba(0,40,80,.70),
        rgba(0,40,80,.70)
        ),
        url(${background})
        `,
      }}
    >
      <Container>
        <motion.div
          className="page-banner-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>{title}</h1>

          <p>{subtitle}</p>
        </motion.div>
      </Container>
    </section>
  );
}

export default PageBanner;
