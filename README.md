# EyeCare Insights

A comprehensive eye health education platform powered by Perplexity's Sonar API, providing accurate, evidence-based information about eye care and vision health.

## Features

- **AI-Powered Q&A System**: Get expert answers to eye health questions using Perplexity's Sonar API
- **Eye Health Myths**: Daily-updated myths and facts about eye care
- **Research Findings**: Latest eye health research summaries
- **Age-Specific Information**: Tailored eye care advice for different age groups

## Perplexity API Integration

This application leverages Perplexity's Sonar API for several key features:

### 1. Q&A System (`src/utils/api.ts`)

```typescript
export const askSonarApi = async (question: string): Promise<SonarApiResponse> => {
  // API configuration
  const API_URL = 'https://api.perplexity.ai/chat/completions';
  const API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY;

  // API request with expert system prompt
  const response = await fetch(API_URL, {
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
}
```

### 2. Eye Health Myths Generation

The application uses the `llama-3.1-sonar-small-128k-online` model to generate evidence-based eye health myths and facts:

```typescript
export const fetchDailyMyths = async (query?: string): Promise<EyeMyth[]> => {
  // Custom prompt for myth generation
  const systemPrompt = 'You are an expert in ophthalmology. Generate common eye health myths...'
  
  // API integration for myth generation
  // See src/utils/api.ts for full implementation
}
```

### 3. Research Findings

Latest research findings are generated using the same model with specialized prompts:

```typescript
export const fetchLatestResearch = async (query?: string): Promise<ResearchItem[]> => {
  // Research-focused system prompt
  const systemPrompt = 'Generate recent eye health research findings...'
  
  // API integration for research summaries
  // See src/utils/api.ts for full implementation
}
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Perplexity API key:
   ```env
   VITE_PERPLEXITY_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `VITE_PERPLEXITY_API_KEY`: Your Perplexity API key (required)

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Perplexity Sonar API
- Zod for API response validation

## GitHub Pages Deployment

This project is configured for deployment to GitHub Pages. Here's how to deploy it:

1. Fork or clone this repository to your GitHub account
2. Update the `homepage` field in `package.json` with your GitHub username
3. Push your changes to the `main` branch
4. GitHub Actions will automatically build and deploy the site
5. Your site will be available at `https://[your-username].github.io/eyecare-insights/`

The deployment is handled by the GitHub Actions workflow in `.github/workflows/deploy.yml`. The site uses HashRouter for proper routing on GitHub Pages.

## API Response Validation

The application uses Zod schemas to validate API responses:

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

## Important Notes

- The application includes appropriate disclaimers about AI-generated medical information
- All API responses are validated and error-handled
- The system is designed to provide educational information, not medical advice

## License

MIT