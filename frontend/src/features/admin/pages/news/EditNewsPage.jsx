import { useParams, useNavigate } from "react-router-dom";
import NewsForm from "./NewsForm"; 
import ROUTES from "../../../../constants/routes";

export default function EditNewsPage() {
  const { newsId } = useParams(); 
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-4 text-white">
      <div className="mb-4">
        <h2 className="text-primary fw-bold mb-1">Modify News Record</h2>
        <p className="text-white-50 small">Updating historical data parameters for record ID: <span className="text-warning">{newsId}</span></p>
      </div>
      <NewsForm initialId={newsId} onSaveSuccess={() => navigate(ROUTES.ADMIN_NEWS)} />
    </div>
  );
}
