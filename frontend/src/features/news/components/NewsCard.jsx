import { Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUserAlt, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

function NewsCard({ article }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-100"
    >
      <Card className="news-card h-100">
        <div className="news-card-image">
          <Card.Img variant="top" src={article.image} alt={article.title} />

          <Badge className="news-card-category">{article.category}</Badge>
        </div>

        <Card.Body>
          <div className="news-card-meta">
            <span>
              <FaCalendarAlt />
              {article.date}
            </span>

            <span>
              <FaUserAlt />
              {article.author}
            </span>
          </div>

          <Card.Title>{article.title}</Card.Title>

          {article.excerpt && <Card.Text>{article.excerpt}</Card.Text>}

          <Button
            as={Link}
            to={`/news/${article.id}`}
            variant="outline-primary"
          >
            Read More
            <FaArrowRight className="ms-2" />
          </Button>
        </Card.Body>
      </Card>
    </motion.div>
  );
}

export default NewsCard;
