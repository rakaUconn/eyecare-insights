import { useState } from 'react';
import { EyeMyth, ResearchItem } from '../types';
import { fetchDailyMyths, fetchLatestResearch } from '../utils/api';

type ContentType = 'myths' | 'research';

export const useCustomSonarContent = (type: ContentType) => {
  const [content, setContent] = useState<EyeMyth[] | ResearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async (query: string) => {
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      if (type === 'myths') {
        const mythsData = await fetchDailyMyths(query);
        setContent(mythsData);
      } else {
        const researchData = await fetchLatestResearch(query);
        setContent(researchData);
      }
    } catch (err) {
      setError('Failed to get content. Please try again.');
      console.error(`Error fetching ${type}:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    content,
    isLoading,
    error,
    fetchContent,
    resetContent: () => setContent([])
  };
};