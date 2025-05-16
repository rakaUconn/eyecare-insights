import { useState } from 'react';
import { askSonarApi } from '../utils/api';
import { SonarApiResponse } from '../types';

export const useSonarApi = () => {
  const [answer, setAnswer] = useState<SonarApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const askQuestion = async (question: string) => {
    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await askSonarApi(question);
      setAnswer(response);
    } catch (err) {
      setError('Failed to get an answer. Please try again.');
      console.error('Error fetching from Sonar API:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    answer,
    isLoading,
    error,
    askQuestion,
    resetAnswer: () => setAnswer(null)
  };
};