export interface AgeGroup {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  recommendations: string[];
}

export interface EyeMyth {
  id: string;
  myth: string;
  reality: string;
  explanation: string;
  imageUrl: string;
}

export interface ResearchItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  imageUrl: string;
}

export interface QuestionAnswer {
  id: string;
  question: string;
  answer: string;
}

export interface SonarApiResponse {
  answer: string;
  citations?: Array<{
    title: string;
    url: string;
  }>;
}