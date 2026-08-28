// src/features/admin/pages/news/ManageNewsPage.jsx

import { Link } from "react-router-dom";
import { useNews } from "../../../news/hooks/useNews";
import ROUTES from "../../../../constants/routes";

export default function ManageNewsPage() {
  const { news, loading } = useNews();

  if (loading) {
    return (
      <div className="p-5 text-center text-white">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3 text-white-50">Loading news records...</p>
      </div>
    );
  }

  // Safe formatting fallbacks engine processing routine for table rows
  const renderDate = (timestamp) => {
    if (!timestamp) return "Date unavailable";
    const dateObj = new Date(timestamp);
    return isNaN(dateObj.getTime())
      ? "Invalid date"
      : dateObj.toLocaleDateString();
  };

  return (
    <div className="container-fluid p-4 text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="text-primary fw-bold mb-1">Manage News & Media</h2>
          <p className="text-white-50 small mb-0">
            Publish, edit, or configure front-page featured status parameters
            for media briefings.
          </p>
        </div>
        <Link
          to={ROUTES.ADMIN_NEWS_NEW}
          className="btn btn-primary fw-bold py-2"
        >
          <i className="bi bi-plus-lg me-2" /> Publish New Article
        </Link>
      </div>

      {news?.length === 0 ? (
        <div className="card bg-dark border-secondary p-5 text-center text-white-50">
          <i className="bi bi-newspaper display-4 mb-3 d-block" />
          <h5>No news records found</h5>
          <p className="small">
            Get started by creating your first global media publication.
          </p>
        </div>
      ) : (
        <div className="table-responsive card bg-dark border-secondary">
          <table className="table table-dark table-hover mb-0 align-middle">
            <thead>
              <tr className="border-bottom border-secondary text-white-50">
                <th scope="col" style={{ width: "80px" }}>
                  Poster
                </th>
                <th scope="col">Title</th>
                <th scope="col" style={{ width: "160px" }}>
                  Category
                </th>
                <th scope="col" style={{ width: "140px" }}>
                  Featured
                </th>
                <th scope="col" style={{ width: "140px" }}>
                  Published Date
                </th>
                <th
                  scope="col"
                  className="text-end pe-3"
                  style={{ width: "120px" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {news?.map((item) => (
                <tr key={item.id} className="border-bottom border-secondary">
                  <td>
                    {item.poster?.posterUrl ? (
                      <img
                        src={item.poster.posterUrl}
                        alt="Mini post preview"
                        style={{
                          width: "45px",
                          height: "45px",
                          objectFit: "cover",
                        }}
                        className="rounded border border-secondary"
                        onError={(e) => {
                          e.target.src = "/news/default-news-placeholder.jpg";
                        }}
                      />
                    ) : (
                      <div
                        className="bg-secondary rounded d-flex align-items-center justify-content-center"
                        style={{ width: "45px", height: "45px" }}
                      >
                        <i className="bi bi-image text-white-50" />
                      </div>
                    )}
                  </td>
                  <td>
                    <div
                      className="fw-semibold text-white mb-0 text-truncate"
                      style={{ maxWidth: "420px" }}
                      title={item.title}
                    >
                      {item.title}
                    </div>
                    {item.author && (
                      <span
                        className="text-muted small d-block"
                        style={{ fontSize: "0.75rem" }}
                      >
                        By {item.author}
                      </span>
                    )}
                  </td>
                  <td>
                    <span
                      className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary border-opacity-25 text-uppercase"
                      style={{ fontSize: "0.7rem", letterSpacing: "0.3px" }}
                    >
                      {item.category || "General"}
                    </span>
                  </td>
                  <td>
                    {item.isFeatured ? (
                      <span className="badge bg-warning text-dark d-inline-flex align-items-center gap-1 fw-bold">
                        <i className="bi bi-star-fill" /> Featured
                      </span>
                    ) : (
                      <span className="text-white-50 small opacity-50">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="text-white-50 small">
                    {renderDate(item.createdAt || item.updatedAt)}
                  </td>
                  <td className="text-end pe-3">
                    <td className="text-end pe-3">
                      <Link
                        to={ROUTES.ADMIN_NEWS_EDIT.replace(":newsId", item.id)}
                        className="btn btn-outline-primary btn-sm py-1 px-3"
                      >
                        <i className="bi bi-pencil me-1" /> Edit
                      </Link>
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
