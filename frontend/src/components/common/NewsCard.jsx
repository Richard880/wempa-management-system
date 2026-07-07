import { Card, Badge } from "react-bootstrap";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";

function NewsCard({ article }) {
  const formattedDate = new Date(article.date).toLocaleDateString(
    "en-KE",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <Card className="news-card border-0 shadow-sm h-100">
      <div className="news-image">
        <img
          src={article.image}
          alt={article.title}
          className="img-fluid"
        />

        <Badge bg="primary" className="news-badge">
          {article.category}
        </Badge>
      </div>

      <Card.Body>
        <h5>{article.title}</h5>

        <p>{article.summary}</p>

        <div className="news-footer">
          <small>
            <FaCalendarAlt /> {formattedDate}
          </small>

          <span className="read-more">
            Read More <FaArrowRight />
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default NewsCard;