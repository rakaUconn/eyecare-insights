# Perplexity Sonar API in EyeCare Insights

## Overview

This document provides a comprehensive explanation of how Perplexity's Sonar API is integrated and utilized within the EyeCare Insights application. EyeCare Insights is a comprehensive eye health education platform that leverages Perplexity's powerful AI capabilities to deliver accurate, evidence-based information about eye care and vision health.

## Table of Contents

1. [API Integration Architecture](#api-integration-architecture)
2. [Core API Functions](#core-api-functions)
3. [React Hooks for API Consumption](#react-hooks-for-api-consumption)
4. [Key Features Powered by Sonar API](#key-features-powered-by-sonar-api)
5. [Response Validation and Error Handling](#response-validation-and-error-handling)
6. [Implementation Best Practices](#implementation-best-practices)
7. [Setup and Configuration](#setup-and-configuration)

## API Integration Architecture

The EyeCare Insights application follows a clean architecture for integrating with Perplexity's Sonar API:

```
src/
  ├── utils/
  │   └── api.ts         # Core API functions for Perplexity Sonar
  ├── hooks/
  │   ├── useSonarApi.ts           # Hook for Q&A functionality
  │   ├── useSonarContent.ts       # Hook for auto-refreshing content
  │   └── useCustomSonarContent.ts  # Hook for query-based content
  ├── types/
  │   └── index.ts       # TypeScript interfaces for API responses
  └── components/
      └── qa/
          └── QASection.tsx  # UI component for Q&A functionality
```

This architecture separates concerns between:
- Direct API communication (`api.ts`)
- React state management and API consumption (custom hooks)
- Type definitions for API responses
- UI components that present API data

## Core API Functions

The application defines three primary API functions in `src/utils/api.ts`:

### 1. Question Answering

```typescript
export const askSonarApi = async (question: string): Promise<SonarApiResponse> => {
  // API configuration with authentication
  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
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
  
  // Process and return response
  // ...
};
```

### 2. Eye Health Myths Generation

```typescript
export const fetchDailyMyths = async (query?: string): Promise<EyeMyth[]> => {
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
  
  // Process JSON response and validate with Zod
  // ...
};
```

### 3. Research Findings Generation

```typescript
export const fetchLatestResearch = async (query?: string): Promise<ResearchItem[]> => {
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
  
  // Process JSON response and validate with Zod
  // ...
};
```

## React Hooks for API Consumption

The application provides three custom React hooks to manage API state and interactions:

### 1. `useSonarApi` - For Q&A Functionality

```typescript
export const useSonarApi = () => {
  const [answer, setAnswer] = useState<SonarApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const askQuestion = async (question: string) => {
    // Input validation
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
```

### 2. `useSonarContent` - For Auto-Refreshing Content

This hook fetches both myths and research content on component mount and refreshes it every 24 hours:

```typescript
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
      // Error handling
      // ...
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
```

### 3. `useCustomSonarContent` - For Query-Based Content

This hook allows users to search for specific myths or research:

```typescript
export const useCustomSonarContent = (type: ContentType) => {
  const [content, setContent] = useState<EyeMyth[] | ResearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async (query: string) => {
    // Input validation
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
      // Error handling
      // ...
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
```

## Key Features Powered by Sonar API

The EyeCare Insights application leverages Perplexity's Sonar API for three main features:

### 1. AI-Powered Q&A System

The application provides an interactive Q&A system where users can ask questions about eye health and receive evidence-based answers. This feature:

- Uses the standard `sonar` model
- Includes a specialized system prompt for ophthalmology expertise
- Displays citations from reliable sources when available
- Includes a disclaimer about AI-generated medical information

### 2. Eye Health Myths and Facts

The application generates and displays common eye health myths along with factual corrections. This feature:

- Uses the `llama-3.1-sonar-small-128k-online` model for enhanced capabilities
- Requests structured JSON output for consistent formatting
- Supports both daily-refreshed content and user-initiated searches
- Includes explanations and relevant imagery

### 3. Latest Research Findings

The application provides summaries of recent eye health research. This feature:

- Uses the same advanced model as the myths feature
- Formats research as structured JSON with titles, summaries, sources, and dates
- Supports both auto-refreshed content and user searches
- Includes relevant imagery for visual engagement

## Response Validation and Error Handling

The application implements robust validation and error handling for API responses:

### Zod Schema Validation

```typescript
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
```

### JSON Extraction and Parsing

The application handles various response formats, including extracting JSON from markdown code blocks:

```typescript
// Try to extract JSON if content is wrapped in markdown code blocks or has extra text
let jsonContent = content;
const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || 
                 content.match(/\[\s*\{[\s\S]*\}\s*\]/);

if (jsonMatch) {
  jsonContent = jsonMatch[0];
  // Clean up any markdown code block syntax
  jsonContent = jsonContent.replace(/```(?:json)?\s*/g, '').replace(/\s*```/g, '');
}

const parsedData = JSON.parse(jsonContent);
return z.array(dataSchema).parse(parsedData);
```

### Comprehensive Error Handling

The application implements multi-level error handling:

1. API request errors (network issues, authentication problems)
2. API response validation (missing expected fields)
3. JSON parsing errors (malformed JSON)
4. Schema validation errors (missing or invalid fields)

Each error is logged with appropriate context and presented to users with clear, actionable messages.

## Implementation Best Practices

The EyeCare Insights application follows several best practices for Perplexity Sonar API integration:

### 1. System Prompts for Domain Expertise

Each API function uses a specialized system prompt to ensure the AI provides accurate, domain-specific information:

```typescript
{
  role: 'system',
  content: 'You are an expert in ophthalmology and eye health, providing accurate, evidence-based information.',
}
```

### 2. Structured Output Requests

For content generation features, the application requests structured JSON output with clear formatting instructions:

```typescript
'Generate 2 common eye health myths in the following JSON format: [{"id": "string", "myth": "string", "reality": "string", "explanation": "string", "imageUrl": "string"}]'
```

### 3. Model Selection

The application uses different models based on feature requirements:
- `sonar` for basic Q&A functionality
- `llama-3.1-sonar-small-128k-online` for structured content generation

### 4. Rate Limiting Consideration

The application implements sequential API calls and appropriate refresh intervals to avoid overwhelming the API:

```typescript
// Fetch myths and research sequentially to avoid overwhelming the API
const mythsData = await fetchDailyMyths();
setMyths(mythsData);

const researchData = await fetchLatestResearch();
setResearch(researchData);
```

### 5. User Experience

The application provides appropriate loading states, error messages, and fallbacks:

```typescript
return (
  <div>
    {isLoading && <LoadingSpinner />}
    {error && <ErrorMessage message={error} />}
    {content && <ContentDisplay items={content} />}
  </div>
);
```

## Setup and Configuration

To integrate Perplexity's Sonar API in your own project:

1. **API Key Configuration**

   Create a `.env` file in your project root:

   ```
   VITE_PERPLEXITY_API_KEY=your_api_key_here
   ```

2. **Environment Variable Access**

   ```typescript
   const API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY;

   // Validate API key presence
   if (!API_KEY) {
     throw new Error('VITE_PERPLEXITY_API_KEY environment variable is not set');
   }
   ```

3. **API Headers Setup**

   ```typescript
   const headers = {
     'Authorization': `Bearer ${API_KEY}`,
     'Content-Type': 'application/json',
   };
   ```

4. **Model Selection**

   Choose the appropriate model for your use case:
   - `sonar` - Standard model for general question answering
   - `llama-3.1-sonar-small-128k-online` - Enhanced model for structured output

## Conclusion

The EyeCare Insights application demonstrates effective integration of Perplexity's Sonar API for creating an educational health platform. By following the patterns and practices outlined in this document, you can implement similar functionality in your own applications, leveraging AI to provide valuable, accurate information to your users.

For more detailed implementation guidance, refer to the source code in the EyeCare Insights repository and the official Perplexity API documentation.