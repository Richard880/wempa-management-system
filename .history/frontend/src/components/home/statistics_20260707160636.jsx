import { Container, Row, Col } from "react-bootstrap";
import {
  FaUsers,
  FaUserCheck,
  FaFileSignature,
  FaCalendarAlt,
} from "react-icons/fa";
import SectionHeading from "../ui/SectionHeading";
import StatCard from "../common/StatCard";
import useStatistics from "../../hooks/useStatistics";

import "../../styles/components/statistics.css";

function Statistics() {
  const { stats, loading } = useStatistics();

  if (loading) {
    return (
      <section className="statistics-section">
        <Container>
          <h3 className="text-center">Loading Statistics...</h3>
        </Container>
      </section>
    );
  }

  return (
    <section className="statistics-section">
      <Container>
        <SectionHeading
          badge="OUR IMPACT"
          title="WEMPA in Numbers"
          description="Our growing community continues to strengthen the maritime industry through collaboration, training, and innovation."
        />

        <Row className="g-4">
          <Col lg={3} md={6}>
            <StatCard
              icon={<FaUsers />}
              value={stats.users}
              title="Registered Members"
              color="#003B73"
            />
          </Col>

          <Col lg={3} md={6}>
            <StatCard
              icon={<FaUserCheck />}
              value={stats.activeMembers}
              title="Active Members"
              color="#0077B6"
            />
          </Col>

          <Col lg={3} md={6}>
            <StatCard
              icon={<FaFileSignature />}
              value={stats.applications}
              title="Applications"
              color="#FFC107"
            />
          </Col>

          <Col lg={3} md={6}>
            <StatCard
              icon={<FaCalendarAlt />}
              value={stats.events}
              title="Events Hosted"
              color="#16A34A"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Statistics;
