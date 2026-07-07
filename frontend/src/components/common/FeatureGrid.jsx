import { Row, Col } from "react-bootstrap";
import FeatureCard from "./FeatureCard";

function FeatureGrid({
  items,
  lg = 3,
  md = 6,
}) {
  return (
    <Row className="g-4">
      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <Col
            key={index}
            lg={lg}
            md={md}
          >
            <FeatureCard
              icon={<Icon />}
              title={item.title}
              description={item.description}
            />
          </Col>
        );
      })}
    </Row>
  );
}

export default FeatureGrid;