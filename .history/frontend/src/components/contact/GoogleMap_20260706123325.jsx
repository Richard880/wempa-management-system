import { Container } from "react-bootstrap";
import { motion } from "framer-motion";

function GoogleMap() {
  return (
    <section className="map-section">
      <Container>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >

          <div className="map-heading">

            <span className="section-badge">
              LOCATION
            </span>

            <h2 className="section-title">
              Visit Our Office
            </h2>

            <p className="section-description">
              Our offices are located in Kisumu, serving maritime
              professionals throughout Western Kenya.
            </p>

          </div>

          <div className="map-container">

            <iframe
              title="WEMPA Office"
              src="https://www.google.com/maps?q=Kisumu,Kenya&output=embed"
              loading="lazy"
              allowFullScreen
            />

          </div>

        </motion.div>

      </Container>
    </section>
  );
}

export default GoogleMap;