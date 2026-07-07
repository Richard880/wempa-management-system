import { Container, Row, Col } from "react-bootstrap";
import {
  FaIdCard,
  FaUsers,
  FaGraduationCap,
  FaBell,
} from "react-icons/fa";

function WhyJoin() {
  return (
    <section className="section">

      <Container>

        <div className="text-center mb-5">
          <h2>Why Join WEMPA?</h2>
        </div>

        <Row>

          <Col md={3} className="text-center">

            <FaIdCard
              size={55}
              className="text-primary mb-3"
            />

            <h4>Digital ID</h4>

            <p>
              Receive a secure digital membership card with QR verification.
            </p>

          </Col>

          <Col md={3} className="text-center">

            <FaUsers
              size={55}
              className="text-primary mb-3"
            />

            <h4>Networking</h4>

            <p>
              Connect with maritime professionals across Kenya.
            </p>

          </Col>

          <Col md={3} className="text-center">

            <FaGraduationCap
              size={55}
              className="text-primary mb-3"
            />

            <h4>Training</h4>

            <p>
              Access workshops, seminars and certification programmes.
            </p>

          </Col>

          <Col md={3} className="text-center">

            <FaBell
              size={55}
              className="text-primary mb-3"
            />

            <h4>Updates</h4>

            <p>
              Receive newsletters, notices and industry news instantly.
            </p>

          </Col>

        </Row>

      </Container>

    </section>
  );
}

export default WhyJoin;