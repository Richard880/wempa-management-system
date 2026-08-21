// src/features/admin/pages/news/ManageNewsPage.jsx

import { Link } from "react-router-dom";
import { useNews } from "../../../news/hooks/useNews";
import ROUTES from "../../../../constants/routes";

export default function ManageNewsPage() {
  const { news, loading } = useNews();

  if (loading) return <div className="p-5 text-white">Loading news records...</div>;

  return (
    <div className="container-fluid p-4 text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">Manage News & Media</h2>
        <Link to={ROUTES.ADMIN_NEWS_NEW} className="btn btn-primary">
          <i className="bi bi-plus-lg me-2" /> Publish New Article
        </Link>
      </div>

      <div className="table-responsive card bg-dark border-secondary">
        <table className="table table-dark table-hover mb-0">
          <thead>
            <tr className="border-bottom border-secondary text-white-50">
              <th>Poster</th>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {news?.map((item) => (
              <tr key={item.id} className="border-bottom border-secondary align-middle">
                <td>
                  <img 
                    src={item.poster?.posterUrl} 
                    alt="" 
                    style={{ width: "50px", height: "50px", objectFit: "cover" }} 
                    className="rounded"
                  />
                </td>
                <td>{item.title}</td>
                <td><span className="badge bg-secondary">{item.category}</span></td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="text-end">
                  <Link to={`/admin/news/edit/${item.id}`} className="btn btn-outline-primary btn-sm">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
