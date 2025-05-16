import { z } from 'zod';
import { SonarApiResponse, EyeMyth, ResearchItem } from '../types';

const API_URL = 'https://api.perplexity.ai/chat/completions';
const API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY;

// Validate API key presence
if (!API_KEY) {
  throw new Error('VITE_PERPLEXITY_API_KEY environment variable is not set');
}

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
};

const mythSchema = z.object({
  id: z.string(),
  myth: z.string(),
  reality: z.string(),
  explanation: z.string(),
  imageUrl: z.string().url(),
});

const researchSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  source: z.string(),
  date: z.string(),
  imageUrl: z.string().url(),
});

export const askSonarApi = async (question: string): Promise<SonarApiResponse> => {
  if (!question.trim()) {
    throw new Error('Question cannot be empty');
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in ophthalmology and eye health, providing accurate, evidence-based information.',
          },
          {
            role: 'user',
            content: question,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      console.error('API response missing expected content structure:', data);
      throw new Error('Invalid response format from API: Missing content');
    }

    // Extract the answer content
    const answerContent = data.choices[0].message.content;
    
    // Extract citations if available, with fallback to empty array
    const citations = data.citations || [];
    
    return {
      answer: answerContent,
      citations: citations,
    };
  } catch (error) {
    console.error('Error in askSonarApi:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to get answer from Sonar API');
  }
};

export const fetchDailyMyths = async (query?: string): Promise<EyeMyth[]> => {
  try {
    const userContent = query 
      ? `Generate eye health myths about "${query}" in JSON format.` 
      : 'Generate daily eye health myths in JSON format.';
      
    const response = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in ophthalmology. Generate 2 common eye health myths in the following JSON format: [{"id": "string", "myth": "string", "reality": "string", "explanation": "string", "imageUrl": "string"}]. Use real image URLs from Pexels that are related to eye care.',
          },
          {
            role: 'user',
            content: userContent,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      console.error('API response missing expected content structure:', data);
      throw new Error('Invalid response format from API: Missing content');
    }

    const content = data.choices[0].message.content;
    
    try {
      // Try to extract JSON if content is wrapped in markdown code blocks or has extra text
      let jsonContent = content;
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || 
                       content.match(/\[\s*\{[\s\S]*\}\s*\]/);
      
      if (jsonMatch) {
        jsonContent = jsonMatch[0];
        // Clean up any markdown code block syntax
        jsonContent = jsonContent.replace(/```(?:json)?\s*/g, '').replace(/\s*```/g, '');
      }
      
      const myths = JSON.parse(jsonContent);
      return z.array(mythSchema).parse(myths);
    } catch (parseError) {
      console.error('Error parsing myths:', parseError);
      console.error('Raw content received:', content);
      throw new Error(`Invalid response format from API: ${parseError.message}`);
    }
  } catch (error) {
    console.error('Error in fetchDailyMyths:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch daily myths');
  }
};

export const fetchLatestResearch = async (query?: string): Promise<ResearchItem[]> => {
  try {
    const userContent = query 
      ? `Generate eye health research findings about "${query}" in JSON format.` 
      : 'Generate latest eye health research findings in JSON format.';
      
    const response = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in ophthalmology. Generate 2 recent eye health research findings in the following JSON format: [{"id": "string", "title": "string", "summary": "string", "source": "string", "date": "string", "imageUrl": "string"}]. Use real image URLs from Pexels that are related to eye care and research.',
          },
          {
            role: 'user',
            content: userContent,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      console.error('API response missing expected content structure:', data);
      throw new Error('Invalid response format from API: Missing content');
    }

    const content = data.choices[0].message.content;
    
    try {
      // Try to extract JSON if content is wrapped in markdown code blocks or has extra text
      let jsonContent = content;
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || 
                       content.match(/\[\s*\{[\s\S]*\}\s*\]/);
      
      if (jsonMatch) {
        jsonContent = jsonMatch[0];
        // Clean up any markdown code block syntax
        jsonContent = jsonContent.replace(/```(?:json)?\s*/g, '').replace(/\s*```/g, '');
      }
      
      const research = JSON.parse(jsonContent);
      return z.array(researchSchema).parse(research);
    } catch (parseError) {
      console.error('Error parsing research:', parseError);
      console.error('Raw content received:', content);
      throw new Error(`Invalid response format from API: ${parseError.message}`);
    }
  } catch (error) {
    console.error('Error in fetchLatestResearch:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch latest research');
  }
};