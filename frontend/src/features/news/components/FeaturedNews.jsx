// src/components/news/FeaturedNews.jsx
import { Container, Row, Col, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUserAlt, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

import SectionHeading from "../../../components/common/SectionHeading";

// 1. Import your dynamic live data stream engine hook
import { useNews } from "../../../features/news/hooks/useNews";

function FeaturedNews() {
  // 2. Fetch live data records stream directly from Firestore
  const { news, loading } = useNews();

  // 3. Isolate the active entry explicitly flagged with "isFeatured: true" by an admin
  const liveFeaturedNews = !loading ? news.find((item) => item.isFeatured === true) : null;

  // 4. Return null or placeholder while fetching data
  if (loading) {
    return (
      <section className="featured-news-section">
        <Container>
          <div className="text-center py-5 text-muted">
            <div className="spinner-border spinner-border-sm text-primary me-2" role="status" />
            <span>Syncing live community headline highlights...</span>
          </div>
        </Container>
      </section>
    );
  }

  // 5. Hide section gracefully if no news article is currently marked as featured
  if (!liveFeaturedNews) return null;

  return (
    <section className="featured-news-section">
      <Container>
        <SectionHeading
          badge="FEATURED ARTICLE"
          title="Latest Maritime Insights"
          description="Stay informed with the latest updates, industry developments, and WEMPA initiatives."
        />

        <motion.div
          className="featured-news-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Row className="g-0">
            <Col lg={6}>
              <div className="featured-news-image" style={{ height: "100%", minHeight: "350px", overflow: "hidden", position: "relative" }}>
                {/* 6. Use real live cloud storage optimization URL or local default fallback */}
                <img
                  src={liveFeaturedNews.poster?.posterUrl || "/news/default-news-placeholder.jpg"}
                  alt={liveFeaturedNews.title}
                  className="w-100 h-100 object-fit-cover"
                  onError={(e) => { e.target.src = "/news/default-news-placeholder.jpg"; }}
                />

                <Badge className="news-category position-absolute top-0 end-0 m-3 text-uppercase">
                  {liveFeaturedNews.category || "General"}
                </Badge>
              </div>
            </Col>

            <Col lg={6}>
              <div className="featured-news-content">
                <div className="news-meta">
                  <span>
                    <FaCalendarAlt />
                    {/* 7. Output dynamic formatted date string values */}
                    {liveFeaturedNews.date}
                  </span>

                  <span>
                    <FaUserAlt />
                    {/* 8. Output real live database text author string values */}
                    {liveFeaturedNews.author || "WEMPA Secretariat"}
                  </span>
                </div>

                <h2>{liveFeaturedNews.title}</h2>

                {/* 9. Maps to content property field from Firestore collection payload */}
                <p className="line-clamp-3">{liveFeaturedNews.content || "Click below to review comprehensive details regarding this media brief."}</p>

                <Button
                  as={Link}
                  to={`/news/${liveFeaturedNews.id}`}
                >
                  Read Full Story
                  <FaArrowRight className="ms-2" />
                </Button>
              </div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
}

export default FeaturedNews;
