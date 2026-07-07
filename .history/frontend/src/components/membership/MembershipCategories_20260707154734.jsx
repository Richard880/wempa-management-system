import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

import SectionHeading from "../ui/SectionHeading";
import { membershipCategories } from "../../data/membershipData";

import "../../styles/pages/membership.css";

function MembershipCategories() {
  return (
    <section className="membership-section">
      <Container>
        <SectionHeading
          badge="MEMBERSHIP CATEGORIES"
          title="Choose the Membership That Fits You"
          description="Whether you are a student, an experienced maritime professional, or an organization, WEMPA offers membership options tailored to your needs."
        />

        <Row className="g-4">
          {membershipCategories.map((category) => {
            const Icon = category.icon;

            return (
              <Col lg={3} md={6} key={category.id}>
                <motion.div
                  className="membership-card"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="membership-icon">
                    <Icon />
                  </div>

                  <h4>{category.title}</h4>

                  <p>{category.description}</p>
                </motion.div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}

export default MembershipCategories;