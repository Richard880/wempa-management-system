import { Container, Row, Col } from "react-bootstrap";

import SectionHeading from "../ui/SectionHeading";
import NewsCard from "./NewsCard";

import { latestNews } from "../../data/newsData";

function LatestNewsGrid() {
  return (
    <section className="latest-news-section">
      <Container>
        <SectionHeading
          badge="LATEST NEWS"
          title="Recent Articles"
          description="Read the latest stories, announcements and updates from WEMPA."
        />

        <Row className="g-4">
          {latestNews.map((article) => (
            <Col lg={4} md={6} key={article.id}>
              <NewsCard article={article} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default LatestNewsGrid;
