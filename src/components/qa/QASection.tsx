import React, { useState } from 'react';
import { Search, AlertCircle, Loader2 } from 'lucide-react';
import Container from '../common/Container';
import { useSonarApi } from '../../hooks/useSonarApi';
import { QuestionAnswer } from '../../types';

interface QASectionProps {
  commonQuestions: QuestionAnswer[];
  title?: string;
  description?: string;
}

const QASection: React.FC<QASectionProps> = ({
  commonQuestions,
  title = "Ask An Expert",
  description = "Get answers to your eye health questions powered by Perplexity's Sonar API"
}) => {
  const [question, setQuestion] = useState('');
  const { answer, isLoading, error, askQuestion, resetAnswer } = useSonarApi();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    askQuestion(question);
  };
  
  return (
    <section className="py-16 bg-white">
      <Container size="md">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-8 mb-12">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question about eye health..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              
              <button
                type="submit"
                disabled={isLoading || !question.trim()}
                className={`
                  absolute right-2 top-1/2 transform -translate-y-1/2
                  px-4 py-1.5 bg-blue-600 text-white rounded-md
                  ${(isLoading || !question.trim()) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}
                  transition-colors
                `}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 size={16} className="animate-spin mr-2" />
                    <span>Searching...</span>
                  </div>
                ) : 'Search'}
              </button>
            </div>
          </form>
          
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
              <AlertCircle size={20} className="text-red-500 shrink-0 mt-1 mr-3" />
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {answer && (
            <div className="mt-6 bg-white border border-gray-200 rounded-md p-6">
              <div className="mb-4">
                <h3 className="font-medium text-gray-900">Question:</h3>
                <p className="text-gray-700">{question}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="font-medium text-gray-900">Answer:</h3>
                <p className="text-gray-700">{answer.answer}</p>
              </div>
              
              {answer.citations && answer.citations.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900">Sources:</h3>
                  <ul className="mt-2 space-y-1">
                    {answer.citations.map((citation, index) => (
                      <li key={index}>
                        <a 
                          href={citation.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {citation.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetAnswer}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Ask another question
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Common Questions
          </h3>
          
          <div className="space-y-4">
            {commonQuestions.map((q) => (
              <div 
                key={q.id} 
                className="border border-gray-200 rounded-lg p-6 transition-colors hover:border-blue-200 hover:bg-blue-50"
              >
                <h4 className="font-medium text-gray-900 mb-2">{q.question}</h4>
                <p className="text-gray-600">{q.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default QASection;