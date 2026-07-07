import { useEffect, useState } from "react";

import { getStatistics } from "../services/statisticsService";

export default function useStatistics() {
  const [stats, setStats] = useState({
    users: 0,
    activeMembers: 0,
    applications: 0,
    events: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getStatistics();

      setStats(data);

      setLoading(false);
    }

    load();
  }, []);

  return {
    stats,
    loading,
  };
}
