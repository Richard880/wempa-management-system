import  { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNews } from "../../news/hooks/useNews";
import { newsStorageService } from "../../news/services/newsStorageService";
import NewsCard from "../../news/components/NewsCard"; // Your existing card component

export default function NewsDetail() {
  const { newsId } = useParams();
  const { getSingleNews } = useNews();
  const [article, setArticle] = useState(null);
  const [recommendations, setRecommendations] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll to top whenever the newsId changes
    window.scrollTo(0, 0);

    async function loadData() {
      setLoading(true);
      const data = await getSingleNews(newsId);
      if (data) {
        setArticle(data);
        // Fetch articles in the same category, excluding the current one
        const recs = await newsStorageService.getRecommendations(data.category, newsId);
        setRecommendations(recs);
      }
      setLoading(false);
    }
    loadData();
  }, [newsId, getSingleNews]);

  if (loading) return <div className="text-center p-5">Loading article...</div>;
  if (!article) return <div className="text-center p-5">Article not found.</div>;

  return (
    <div className="container py-5">
      <article className="mb-5">
        <header className="mb-4">
          <span className="badge bg-primary mb-2">{article.category}</span>
          <h1 className="display-4 fw-bold">{article.title}</h1>
          <p className="text-muted">Published: {new Date(article.createdAt).toLocaleDateString()}</p>
        </header>

        {article.poster?.posterUrl && (
          <img 
            src={article.poster.posterUrl} 
            alt={article.title} 
            className="img-fluid rounded mb-4 w-100" 
            style={{ maxHeight: '500px', objectFit: 'cover' }}
          />
        )}

        <div className="news-content fs-5" style={{ whiteSpace: 'pre-wrap' }}>
          {article.content}
        </div>
      </article>

      {/* Recommended News Section */}
      {recommendations.length > 0 && (
        <section className="mt-5 pt-5 border-top">
          <h3 className="fw-bold mb-4">Recommended for You</h3>
          <div className="row g-4">
            {recommendations.map(rec => (
              <div className="col-md-4" key={rec.id}>
                <NewsCard news={rec} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
