import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function MembershipCTA() {
  return (
    <section className="membership-cta">
      <Container>
        <motion.div
          className="membership-cta-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="cta-tag">
            JOIN WEMPA TODAY
          </span>

          <h2>
            Ready to Become Part of Kenya's Maritime Community?
          </h2>

          <p>
            Join hundreds of maritime professionals working together to
            advance careers, strengthen the industry, and promote
            excellence throughout Western Kenya and beyond.
          </p>

          <div className="membership-cta-buttons">
            <Button
              as={Link}
              to="/register"
              size="lg"
            >
              Apply for Membership
            </Button>

            <Button
              variant="outline-light"
              as={Link}
              to="/downloads"
              size="lg"
            >
              Download Membership Guide
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default MembershipCTA;