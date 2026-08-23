// src/features/news/hooks/useNews.js
import { useState, useEffect, useCallback } from "react";
import { newsStorageService } from "../services/newsStorageService";

export function useNews() {
  const [news, setNews] = useState([]); 
  const [loading, setLoading] = useState(true);

  const fetchAllNews = useCallback(async () => {
    try {
      setLoading(true);
      const data = await newsStorageService.getAllNews();
      
      // 🟢 Enhancement: Parse and inject a formatted display date for each news item cleanly
      const parsedData = (data || []).map(item => {
        const rawDate = item.updatedAt || item.date || new Date().toISOString();
        return {
          ...item,
          // Formats automatically to "15 July 2026" layout styles safely
          date: new Date(rawDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })
        };
      });

      setNews(parsedData); 
    } catch (err) {
      console.error("Failed to fetch news:", err);
    } finally {
      setLoading(false);
    }
  }, []); 

  const getSingleNews = useCallback(async (newsId) => {
    try {
      const allNews = await newsStorageService.getAllNews();
      const match = allNews.find(n => n.id === newsId);
      
      if (match) {
        const rawDate = match.updatedAt || match.date || new Date().toISOString();
        return {
          ...match,
          date: new Date(rawDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })
        };
      }
      return null;
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
