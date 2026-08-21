import  { useState } from "react";
import { newsStorageService } from "../../../news/services/newsStorageService";
import EventPosterUpload from "../../../events/components/EventPosterUpload/EventPosterUpload"; // Reuse your existing upload UI

export default function NewsForm({ initialId = null }) {
  const [newsId] = useState(() => initialId || `news_${Date.now()}`);
  const [formData, setFormData] = useState({ title: "", content: "", category: "Company Update" });
  const [posterData, setPosterData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!posterData || posterData.status !== "uploaded") return alert("Upload poster first");
    
    await newsStorageService.saveNews(newsId, { ...formData, poster: posterData });
    alert("News Published!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-dark text-white rounded">
      <input type="text" placeholder="News Title" className="form-control mb-3" 
             onChange={e => setFormData({...formData, title: e.target.value})} />
      <select className="form-control mb-3" onChange={e => setFormData({...formData, category: e.target.value})}>
        <option>Company Update</option>
        <option>Industry News</option>
        <option>Media Release</option>
      </select>
      <textarea placeholder="News Content" className="form-control mb-3" rows="10"
                onChange={e => setFormData({...formData, content: e.target.value})} />
      
      <EventPosterUpload eventId={newsId} value={posterData} onChange={setPosterData} />
      
      <button type="submit" className="btn btn-primary mt-3">Publish News</button>
    </form>
  );
}
