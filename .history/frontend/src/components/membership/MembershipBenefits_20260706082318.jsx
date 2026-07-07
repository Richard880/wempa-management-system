import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

import SectionHeading from "../ui/SectionHeading";
import { membershipBenefits } from "../../data/membershipData";

function MembershipBenefits() {
  return (
    <section className="membership-benefits">
      <Container>
        <SectionHeading
          badge="WHY JOIN WEMPA"
          title="Membership Benefits"
          description="Membership provides access to valuable opportunities that support your professional growth and strengthen the maritime community."
        />

        <Row className="g-4">
          {membershipBenefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <Col lg={4} md={6} key={benefit.id}>
                <motion.div className="benefit-card" whileHover={{ y: -8 }}>
                  <div className="benefit-icon">
                    <Icon />
                  </div>

                  <h4>{benefit.title}</h4>

                  <p>{benefit.description}</p>
                </motion.div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}

export default MembershipBenefits;
