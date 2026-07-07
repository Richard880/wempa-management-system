import { Row, Col } from "react-bootstrap";

import Section from "../common/Section";
import SectionHeading from "../ui/SectionHeading";
import NewsCard from "../common/NewsCard";

import news from "../../data/news";

import "../../styles/pages/news.css";

function LatestNews() {
  return (
    <Section background="light">
      <SectionHeading
        badge="LATEST NEWS"
        title="Stay Informed"
        description="Read the latest updates, announcements, and developments from WEMPA."
      />

      <Row className="g-4">
        {news.map((article) => (
          <Col lg={4} md={6} key={article.id}>
            <NewsCard article={article} />
          </Col>
        ))}
      </Row>
    </Section>
  );
}

export default LatestNews;
