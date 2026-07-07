import { Container, Row, Col, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUserAlt, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

import SectionHeading from "../ui/SectionHeading";
import { featuredNews } from "../../data/newsData";

function FeaturedNews() {
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

              <div className="featured-news-image">

                <img
                  src={featuredNews.image}
                  alt={featuredNews.title}
                />

                <Badge className="news-category">
                  {featuredNews.category}
                </Badge>

              </div>

            </Col>

            <Col lg={6}>

              <div className="featured-news-content">

                <div className="news-meta">

                  <span>

                    <FaCalendarAlt />

                    {featuredNews.date}

                  </span>

                  <span>

                    <FaUserAlt />

                    {featuredNews.author}

                  </span>

                </div>

                <h2>{featuredNews.title}</h2>

                <p>{featuredNews.description}</p>

                <Button
                  as={Link}
                  to={`/news/${featuredNews.id}`}
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