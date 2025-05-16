import { useState, useEffect } from 'react';
import { EyeMyth, ResearchItem } from '../types';
import { fetchDailyMyths, fetchLatestResearch } from '../utils/api';

export const useSonarContent = () => {
  const [myths, setMyths] = useState<EyeMyth[]>([]);
  const [research, setResearch] = useState<ResearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch myths and research sequentially to avoid overwhelming the API
      const mythsData = await fetchDailyMyths();
      setMyths(mythsData);

      const researchData = await fetchLatestResearch();
      setResearch(researchData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch content. Please try again later.';
      setError(errorMessage);
      console.error('Error fetching content:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
    
    // Refresh content every 24 hours
    const interval = setInterval(fetchContent, 24 * 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    myths,
    research,
    isLoading,
    error,
    refreshContent: fetchContent,
  };
};