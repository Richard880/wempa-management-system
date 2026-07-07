import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

import SectionHeading from "../ui/SectionHeading";
import { membershipFees } from "../../data/membershipData";

function MembershipFees() {
  return (
    <section className="membership-fees">
      <Container>
        <SectionHeading
          badge="MEMBERSHIP FEES"
          title="Choose Your Membership"
          description="Affordable membership plans designed for students, professionals, and organizations."
        />

        <Row className="g-4 justify-content-center">
          {membershipFees.map((plan) => (
            <Col lg={4} md={6} key={plan.id}>
              <motion.div
                className={`pricing-card ${
                  plan.featured ? "featured-plan" : ""
                }`}
                whileHover={{ y: -10 }}
              >
                {plan.featured && (
                  <div className="featured-badge">Most Popular</div>
                )}

                <h3>{plan.title}</h3>

                <div className="price">{plan.fee}</div>

                <small>{plan.annual}</small>

                <ul>
                  {plan.features.map((feature, index) => (
                    <li key={index}>
                      <FaCheckCircle />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button as={Link} to="/register" className="w-100">
                  Apply Now
                </Button>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default MembershipFees;
