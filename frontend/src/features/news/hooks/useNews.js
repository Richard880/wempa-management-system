// src/features/news/hooks/useNews.js
import { useState, useEffect, useCallback } from "react";
import { newsStorageService } from "../services/newsStorageService";

export function useNews() {
  // 1. Initialize as an empty array [] to prevent '.map is not a function' errors
  const [news, setNews] = useState([]); 
  const [loading, setLoading] = useState(true);

  // 2. Added the missing [] dependency array to prevent infinite re-render loops
  const fetchAllNews = useCallback(async () => {
    try {
      setLoading(true);
      const data = await newsStorageService.getAllNews();
      // Corrected: Matches the state setter name
      setNews(data || []); 
    } catch (err) {
      console.error("Failed to fetch news:", err);
    } finally {
      setLoading(false);
    }
  }, []); 

  // 3. Added [] to ensure this function is stable
  const getSingleNews = useCallback(async (newsId) => {
    try {
      const allNews = await newsStorageService.getAllNews();
      return allNews.find(n => n.id === newsId);
    } catch (err) {
      console.error("Error finding news item:", err);
      return null;
    }
  }, []);

  useEffect(() => {
    fetchAllNews();
  }, [fetchAllNews]);

  return { 
    news, 
    loading, 
    getSingleNews, 
    refresh: fetchAllNews 
  };
}
