import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

import SectionHeading from "../ui/SectionHeading";
import { membershipProcess } from "../../data/membershipData";

function MembershipProcess() {
  return (
    <section className="membership-process">
      <Container>
        <SectionHeading
          badge="HOW TO JOIN"
          title="Become a WEMPA Member in 5 Simple Steps"
          description="Our application process is straightforward and designed to get you connected with the maritime community quickly."
        />

        <Row className="g-4">
          {membershipProcess.map((step) => {
            const Icon = step.icon;

            return (
              <Col lg={4} md={6} key={step.id}>
                <motion.div
                  className="process-card"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="process-number">{step.id}</div>

                  <div className="process-icon">
                    <Icon />
                  </div>

                  <h4>{step.title}</h4>

                  <p>{step.description}</p>
                </motion.div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}

export default MembershipProcess;
