// src/components/news/NewsCategories.jsx
import { useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

import SectionHeading from "../../../components/common/SectionHeading";

// 1. Import your dynamic live data stream engine hook
import { useNews } from "../../../features/news/hooks/useNews";

function NewsCategories() {
  // 2. Fetch live data records stream directly from Firestore
  const { news, loading } = useNews();

  // 3. Define your structural style properties array map matrix
  const baseCategories = [
    { name: "Announcements", color: "#003B73" },
    { name: "Training", color: "#0077B6" },
    { name: "Partnerships", color: "#16A34A" },
    { name: "Safety", color: "#F59E0B" },
    { name: "Blue Economy", color: "#0EA5E9" },
    { name: "Industry News", color: "#7C3AED" },
  ];

  // 4. Dynamically compute the active article volume per category node
  const dynamicCategories = useMemo(() => {
    return baseCategories.map((cat, idx) => {
      // Look through the real-time database state and calculate the length
      const matchCount = news.filter((article) => article.category === cat.name).length;
      return {
        id: idx + 1,
        name: cat.name,
        color: cat.color,
        count: matchCount, // Binds the real dynamic count here
      };
    });
  }, [news]);

  // Return a minimal loading check component framework layer while sync finishes
  if (loading) return null;

  return (
    <section className="news-categories-section">
      <Container>
        <SectionHeading
          badge="EXPLORE"
          title="Browse by Category"
          description="Discover maritime news, announcements and professional updates by category."
        />

        <Row className="g-4">
          {/* 5. Map directly over the calculated live-count category data */}
          {dynamicCategories.map((category) => (
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
                    fontWeight: "bold",
                    color: "#fff"
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
