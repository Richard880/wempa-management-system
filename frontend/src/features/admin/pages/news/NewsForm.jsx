// src/features/admin/components/NewsForm.jsx
import { useState, useEffect } from "react";
import { newsStorageService } from "../../../news/services/newsStorageService";
import EventPosterUpload from "../../../events/components/EventPosterUpload/EventPosterUpload"; 

export default function NewsForm({ initialId = null, onSaveSuccess = null }) {
  const [newsId] = useState(() => initialId || `news_${Date.now()}`);
  const isEditMode = Boolean(initialId);
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);

  // 1. Expanded form schema state to match all template data keys exactly
  const [formData, setFormData] = useState({ 
    title: "", 
    content: "", 
    category: "Announcements", // Default matches public category tags
    author: "WEMPA Secretariat", // Added default author parameter
    isFeatured: false // Added switch state for homepage billboard hero highlights
  });
  const [posterData, setPosterData] = useState(null);

  // 2. Fetch historical record details if in edit mode to prevent data clearing
  useEffect(() => {
    if (!isEditMode) return;

    async function loadNewsData() {
      try {
        setLoading(true);
        const allNews = await newsStorageService.getAllNews();
        const activeRecord = allNews.find((n) => n.id === initialId);

        if (activeRecord) {
          setFormData({
            title: activeRecord.title || "",
            content: activeRecord.content || "",
            category: activeRecord.category || "Announcements",
            author: activeRecord.author || "WEMPA Secretariat",
            isFeatured: activeRecord.isFeatured || false,
          });
          setPosterData(activeRecord.poster || null);
        }
      } catch (err) {
        console.error("Error loading historical news data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadNewsData();
  }, [initialId, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!posterData || posterData.status !== "uploaded") {
      return alert("Please ensure the cover poster has completed uploading successfully.");
    }
    
    try {
      setSubmitting(true);
      await newsStorageService.saveNews(newsId, { 
        ...formData, 
        poster: posterData 
      });
      
      alert(isEditMode ? "News article record updated!" : "News published successfully!");
      if (onSaveSuccess) onSaveSuccess();
    } catch (err) {
      console.error("News publication tracking failure transaction:", err);
      alert("Failed to save article. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-4 text-center text-white-50">Fetching historical article context...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-dark text-white rounded border border-secondary d-flex flex-column gap-3 text-start">
      <div className="form-group">
        <label className="form-label text-white-50 small fw-bold">News Title</label>
        <input 
          type="text" 
          name="title"
          placeholder="Enter news heading" 
          className="form-control bg-transparent text-white border-secondary" 
          value={formData.title}
          onChange={handleInputChange}
          required
          disabled={submitting}
        />
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label text-white-50 small fw-bold">Category</label>
          <select 
            name="category"
            className="form-select bg-transparent text-white border-secondary"
            value={formData.category}
            onChange={handleInputChange}
            disabled={submitting}
          >
            {/* 3. Fully matches public Browse by Category list options */}
            <option value="Announcements" className="bg-dark">Announcements</option>
            <option value="Training" className="bg-dark">Training</option>
            <option value="Partnerships" className="bg-dark">Partnerships</option>
            <option value="Safety" className="bg-dark">Safety</option>
            <option value="Blue Economy" className="bg-dark">Blue Economy</option>
            <option value="Industry News" className="bg-dark">Industry News</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label text-white-50 small fw-bold">Author / Publisher</label>
          <input 
            type="text" 
            name="author"
            className="form-control bg-transparent text-white border-secondary" 
            value={formData.author}
            onChange={handleInputChange}
            required
            disabled={submitting}
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label text-white-50 small fw-bold">News Body Content</label>
        <textarea 
          name="content"
          placeholder="Write complete article details here..." 
          className="form-control bg-transparent text-white border-secondary" 
          rows="10"
          value={formData.content}
          onChange={handleInputChange}
          required
          disabled={submitting}
        />
      </div>
      
      {/* 4. Added switch to toggle public visibility on the hero marquee section */}
      <div className="form-check form-switch my-2">
        <input
          type="checkbox"
          name="isFeatured"
          id="isFeaturedNewsSwitch"
          checked={formData.isFeatured}
          onChange={handleInputChange}
          className="form-check-input cursor-pointer"
          disabled={submitting}
        />
        <label className="form-check-label text-white fw-bold small ms-2" htmlFor="isFeaturedNewsSwitch">
          ⭐ Feature this article inside the main public banner layout billboard
        </label>
      </div>

      <div className="border border-secondary rounded p-3 bg-opacity-25 bg-black">
        <label className="form-label text-white-50 small fw-bold mb-2 d-block">Cover Image Banner</label>
        <EventPosterUpload eventId={newsId} value={posterData} onChange={setPosterData} disabled={submitting} />
      </div>
      
      {/* Action Button Row Grouping */}
<div className="d-flex align-items-center gap-2 mt-3">
  <button 
    type="submit" 
    className="btn btn-primary py-2 px-4 fw-bold" 
    disabled={submitting}
  >
    {submitting ? (
      <>
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Processing Content...
      </>
    ) : isEditMode ? (
      "Update Article"
    ) : (
      "Publish News"
    )}
  </button>

  <button
    type="button"
    className="btn btn-outline-secondary py-2 px-4 text-white fw-bold"
    disabled={submitting}
    onClick={() => {
      if (onSaveSuccess) {
        onSaveSuccess(); // Dynamically falls back to your main admin table via navigate
      } else {
        window.history.back(); // Native safe fallback if no callback is supplied
      }
    }}
  >
    Cancel
  </button>
</div>

    </form>
  );
}
