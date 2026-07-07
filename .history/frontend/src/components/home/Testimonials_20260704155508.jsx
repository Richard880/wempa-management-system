import { Row, Col } from "react-bootstrap";

import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import TestimonialCard from "../common/TestimonialCard";

import testimonials from "../../data/testimonials";

import "../../styles/testimonials.css";

function Testimonials() {
  return (
    <Section background="light">
      <SectionHeading
    badge="TESTIMONIALS"
    title="What Our Members Say"
    description="Hear from professionals whose careers and networks have grown through WEMPA."
/>

      <Row className="g-4">
        {testimonials.map((testimonial) => (
          <Col lg={4} md={6} key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} />
          </Col>
        ))}
      </Row>
    </Section>
  );
}

export default Testimonials;
