import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

import SectionHeading from "../ui/SectionHeading";
import { newsCategories } from "../../data/newsData";

function NewsCategories() {
  return (
    <section className="news-categories-section">
      <Container>
        <SectionHeading
          badge="EXPLORE"
          title="Browse by Category"
          description="Discover maritime news, announcements and professional updates by category."
        />

        <Row className="g-4">
          {newsCategories.map((category) => (
            <Col lg={4} md={6} key={category.id}>
              <motion.div
                className="news-category-card"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="category-circle"
                  style={{
                    background: category.color,
                  }}
                >
                  {category.count}
                </div>

                <h4>{category.name}</h4>

                <p>
                  Browse the latest articles related to{" "}
                  <strong>{category.name}</strong>.
                </p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default NewsCategories;
