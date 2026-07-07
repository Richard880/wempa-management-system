import { Row, Col } from "react-bootstrap";

import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import NewsCard from "../common/NewsCard";

// import news from "../../data/news";

import "../../styles/news.css";

function LatestNews() {
  return (
    <Section background="light">
      <SectionHeading
        badge="LATEST NEWS"
        title="News & Announcements"
        description="Stay informed with the latest updates, announcements and activities from WEMPA."
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
