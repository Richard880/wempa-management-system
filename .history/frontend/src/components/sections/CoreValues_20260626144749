import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaUserTie,
  FaHandshake,
  FaShieldAlt,
  FaLightbulb,
  FaAward,
  FaBalanceScale,
} from "react-icons/fa";

const values = [
  {
    icon: <FaUserTie size={45} />,
    title: "Professionalism",
    text: "Maintaining the highest standards in maritime practice.",
  },
  {
    icon: <FaBalanceScale size={45} />,
    title: "Integrity",
    text: "Honesty, transparency and accountability in all activities.",
  },
  {
    icon: <FaHandshake size={45} />,
    title: "Collaboration",
    text: "Building partnerships for a stronger maritime community.",
  },
  {
    icon: <FaShieldAlt size={45} />,
    title: "Safety",
    text: "Promoting safety across maritime operations.",
  },
  {
    icon: <FaLightbulb size={45} />,
    title: "Innovation",
    text: "Embracing modern technology and new ideas.",
  },
  {
    icon: <FaAward size={45} />,
    title: "Excellence",
    text: "Delivering quality service and leadership.",
  },
];

function CoreValues() {
  return (
    <section className="section bg-light">
      <Container>

        <div className="text-center mb-5">
          <h2>Our Core Values</h2>
          <p>
            These values define everything WEMPA stands for.
          </p>
        </div>

        <Row>

          {values.map((value, index) => (
            <Col lg={4} md={6} className="mb-4" key={index}>

              <Card className="value-card h-100 shadow-sm">

                <Card.Body className="text-center">

                  <div className="mb-3 text-primary">
                    {value.icon}
                  </div>

                  <h4>{value.title}</h4>

                  <p>{value.text}</p>

                </Card.Body>

              </Card>

            </Col>
          ))}

        </Row>

      </Container>
    </section>
  );
}

export default CoreValues;