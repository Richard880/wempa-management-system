import { Row, Col } from "react-bootstrap";

import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import PartnerCard from "../common/PartnerCard";

import partners from "../../data/partners";

import "../../styles/partners.css";

function Partners() {
  return (
    <Section background="white">
      <SectionHeading
        badge="OUR PARTNERS"
        title="Trusted Partners"
        description="Working together with government agencies, academic institutions and industry stakeholders to strengthen the maritime sector."
      />

      <Row className="g-4 justify-content-center">
        {partners.map((partner) => (
          <Col
            lg={4}
            md={6}
            key={partner.id}
          >
            <PartnerCard partner={partner} />
          </Col>
        ))}
      </Row>
    </Section>
  );
}

export default Partners;