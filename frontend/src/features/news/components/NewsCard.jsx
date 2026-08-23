// src/components/news/NewsCard.jsx
import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUserAlt, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

// 1. Move 'export default' inline to prevent Vite module-resolution cache errors
export default function NewsCard({ article }) {
  if (!article) return null;

  // 2. Generate a clean fallback summary if the admin didn't input a custom excerpt text block
  const summaryText = article.excerpt || 
    (article.content ? `${article.content.substring(0, 120)}...` : "Read full details regarding this WEMPA news briefing.");

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-100"
    >
      <Card className="news-card h-100 shadow-sm border-0">
        {/* 3. Set explicit dimensions to prevent framework asset crushing layout shifts */}
        <div className="news-card-image" style={{ height: "220px", width: "100%", overflow: "hidden", position: "relative" }}>
          <Card.Img 
            variant="top" 
            src={article.poster?.posterUrl || article.image || "/news/default-news-placeholder.jpg"} 
            alt={article.title} 
            className="w-100 h-100 object-fit-cover"
            onError={(e) => { e.target.src = "/news/default-news-placeholder.jpg"; }}
          />

          <Badge className="news-card-category position-absolute top-0 end-0 m-3 text-uppercase">
            {article.category || "General"}
          </Badge>
        </div>

        <Card.Body className="d-flex flex-column justify-content-between p-4">
          <div>
            <div className="news-card-meta mb-2 text-muted small d-flex gap-3">
              <span className="d-inline-flex align-items-center gap-1.5">
                <FaCalendarAlt className="text-secondary" />
                {article.date}
              </span>

              <span className="d-inline-flex align-items-center gap-1.5">
                <FaUserAlt className="text-primary opacity-70" />
                {article.author || "WEMPA Secretariat"}
              </span>
            </div>

            <Card.Title className="fw-bold text-dark h5 mb-3 line-clamp-2" style={{ lineHeight: "1.4" }}>
              {article.title}
            </Card.Title>

            <Card.Text className="text-secondary small line-clamp-3 mb-4">
              {summaryText}
            </Card.Text>
          </div>

          {/* 4. Action Button anchored cleanly at the footer box base node */}
          <Button
            as={Link}
            to={`/news/${article.id}`}
            variant="outline-primary"
            className="w-100 d-flex align-items-center justify-content-center gap-2 mt-auto py-2"
          >
            Read More
            <FaArrowRight size={12} />
          </Button>
        </Card.Body>
      </Card>
    </motion.div>
  );
}
