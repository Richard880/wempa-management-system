import { useNavigate } from "react-router-dom";
import NewsForm from "./NewsForm"; 
import ROUTES from "../../../../constants/routes";

export default function CreateNewsPage() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-4 text-white">
      <div className="mb-4">
        <h2 className="text-primary fw-bold mb-1">Publish New Article</h2>
        <p className="text-white-50 small">Fill in the fields below to push a new story to the front page.</p>
      </div>
      <NewsForm onSaveSuccess={() => navigate(ROUTES.ADMIN_NEWS)} />
    </div>
  );
}
