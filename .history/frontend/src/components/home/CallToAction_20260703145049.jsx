import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import "../../styles/cta.css";

function CallToAction() {
  return (
    <section className="cta-section">
      <div className="cta-overlay"></div>

      <div className="container position-relative">

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .8 }}
        >

          <span className="cta-badge">
            JOIN WEMPA TODAY
          </span>

          <h2>
            Ready to Advance Your Maritime Career?
          </h2>

          <p>
            Become part of a vibrant community of maritime professionals,
            access exclusive opportunities, training programmes,
            networking events and industry resources.
          </p>

          <div className="cta-buttons">

            <Link to="/register">
              <Button size="lg">
                Become a Member
              </Button>
            </Link>

            <Link to="/contact">
              <Button
                variant="outline-light"
                size="lg"
              >
                Contact Us
              </Button>
            </Link>

          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default CallToAction;