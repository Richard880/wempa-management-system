import { Container, Row, Col } from "react-bootstrap";
import { FaShip } from "react-icons/fa";

function AboutSection() {
  return (
    <section className="section bg-white">
      <Container>
        <Row>
          <Col lg={6}>
            <h2>About WEMPA</h2>

            <p>
              The Western Kenya Maritime Professional Association is a
              professional organization bringing together captains, marine
              engineers, seafarers, maritime officers and logistics
              practitioners.
            </p>
          </Col>

          <Col lg={6} className="text-center">
            <FaShip size={180} color="#003B5C" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AboutSection;
