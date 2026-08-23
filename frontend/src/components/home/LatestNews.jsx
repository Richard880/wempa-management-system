import { Row, Col } from "react-bootstrap";

import Section from "../common/Section";
import SectionHeading from "../common/SectionHeading";
import NewsCard from "../../features/news/components/NewsCard"; // Updated import path to target the correct local component folder

// Import the verified dynamic hook
import { useNews } from "../../features/news/hooks/useNews";

import "../../styles/pages/news.css";

function LatestNews() {
  const { news, loading } = useNews();

  if (loading) {
    return (
      <Section background="light">
        <div className="text-center py-5 text-muted">
          <div className="spinner-border spinner-border-sm text-primary me-2" role="status" />
          <span>Loading latest news...</span>
        </div>
      </Section>
    );
  }

  // Uses the clean fallback array approach from your grid component
  const standardFeedItems = news || [];

  if (standardFeedItems.length === 0) {
    return (
      <Section background="light">
        <SectionHeading
          badge="LATEST NEWS"
          title="Stay Informed"
          description="Read the latest updates, announcements, and developments from WEMPA."
        />
        <div className="text-center py-4 text-muted border border-dashed rounded bg-white">
          <p className="mb-0 small fw-medium">No additional news articles are currently published.</p>
        </div>
      </Section>
    );
  }

  return (
    <Section background="light">
      <SectionHeading
        badge="LATEST NEWS"
        title="Stay Informed"
        description="Read the latest updates, announcements, and developments from WEMPA."
      />

      <Row className="g-4">
        {/* Slices the dynamic feed to show only the top 3 items for the home landing area cleanup */}
        {standardFeedItems.slice(0, 3).map((article) => (
          <Col lg={4} md={6} key={article.id}>
            <NewsCard article={article} />
          </Col>
        ))}
      </Row>
    </Section>
  );
}

export default LatestNews;
