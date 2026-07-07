import { Container, Row, Col } from "react-bootstrap";
import { FaShieldAlt, FaHandshake, FaWater, FaAward } from "react-icons/fa";

import SectionHeading from "../common/SectionHeading";
import FeatureCard from "../common/FeatureCard";



function CoreValues() {
  const values = [
    {
      icon: <FaShieldAlt />,
      title: "Integrity",
      description:
        "We uphold honesty, transparency, accountability and ethical conduct in every decision and interaction.",
    },
    {
      icon: <FaHandshake />,
      title: "Collaboration",
      description:
        "We foster partnerships among professionals, institutions and stakeholders to strengthen the maritime sector.",
    },
    {
      icon: <FaWater />,
      title: "Sustainability",
      description:
        "We support responsible maritime practices that promote environmental stewardship and the Blue Economy.",
    },
    {
      icon: <FaAward />,
      title: "Excellence",
      description:
        "We strive for professionalism, innovation and continuous improvement in all our initiatives.",
    },
  ];

  return (
    <section className="core-values-section">
      <Container>
        <SectionHeading
          badge="OUR CORE VALUES"
          title="The Principles That Guide WEMPA"
          description="Our values shape every programme, partnership and decision as we work to strengthen the maritime profession across Western Kenya."
        />

        <Row className="g-4">
          {values.map((value, index) => (
            <Col key={index} lg={3} md={6}>
              <FeatureCard
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default CoreValues;
