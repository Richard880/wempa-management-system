// src/components/news/LatestNewsGrid.jsx
import { Container, Row, Col } from "react-bootstrap";
import SectionHeading from "../../../components/common/SectionHeading";
import NewsCard from "./NewsCard";
import { useNews } from "../../../features/news/hooks/useNews";

function LatestNewsGrid() {
  const { news, loading } = useNews();

  if (loading) {
    return (
      <section className="latest-news-section">
        <Container>
          <div className="text-center py-5 text-muted">
            <div className="spinner-border spinner-border-sm text-primary me-2" role="status" />
            <span>Loading latest news grid...</span>
          </div>
        </Container>
      </section>
    );
  }

  // 🟢 FIXED: Show ALL news items directly, or slice them to show a specific limit (e.g., latest 6)
  const standardFeedItems = news || [];

  if (standardFeedItems.length === 0) {
    return (
      <section className="latest-news-section">
        <Container>
          <SectionHeading
            badge="LATEST NEWS"
            title="Recent Articles"
            description="Read the latest stories, announcements and updates from WEMPA."
          />
          <div className="text-center py-4 text-muted border border-dashed rounded bg-light">
            <p className="mb-0 small fw-medium">No additional news articles are currently published.</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="latest-news-section">
      <Container>
        <SectionHeading
          badge="LATEST NEWS"
          title="Recent Articles"
          description="Read the latest stories, announcements and updates from WEMPA."
        />

        <Row className="g-4">
          {standardFeedItems.map((article) => (
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
