// src/features/events/hooks/useEvents.js
import { useState, useEffect, useCallback } from "react";
import { eventStorageService } from "../services/eventStorageService";

/**
 * ==========================================
 * Use Events Hook
 * ==========================================
 * 
 * Provides a shared data pipeline for reading
 * and refreshing events from Firestore.
 */
export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await eventStorageService.getAllEvents();
      setEvents(data);
    } catch (err) {
      console.error("Failed to fetch events from database:", err);
      setError(err.message || "Could not load events.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch automatically on mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    refresh: fetchEvents, // Allows manual refresh after updates
  };
}
