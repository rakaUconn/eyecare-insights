import React, { useState } from 'react';
import { ExternalLink, Calendar, RefreshCw, Loader2, Search } from 'lucide-react';
import { ResearchItem } from '../../types';
import Container from '../common/Container';
import Card from '../common/Card';
import { useSonarContent } from '../../hooks/useSonarContent';
import { useCustomSonarContent } from '../../hooks/useCustomSonarContent';

interface ResearchSectionProps {
  researchItems: ResearchItem[];
  title?: string;
  description?: string;
  compact?: boolean;
}

const ResearchSection: React.FC<ResearchSectionProps> = ({
  researchItems: initialItems,
  title = "Latest Eye Health Research",
  description = "Simplified findings from recent ophthalmology research",
  compact = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomResults, setShowCustomResults] = useState(false);
  const { research: aiResearch, isLoading: generalLoading, error: generalError, refreshContent } = useSonarContent();
  const { content: customResearch, isLoading: customLoading, error: customError, fetchContent, resetContent } = useCustomSonarContent('research');
  
  // Combine initial items with AI-generated ones
  const allItems = [...initialItems, ...aiResearch];
  
  // If showing custom results, use those instead
  const itemsToShow = showCustomResults 
    ? customResearch as ResearchItem[] 
    : (compact ? allItems.slice(0, 1) : allItems);
    
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchContent(searchQuery);
      setShowCustomResults(true);
    }
  };
  
  const handleReset = () => {
    setSearchQuery('');
    setShowCustomResults(false);
    resetContent();
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            <button
              onClick={refreshContent}
              disabled={generalLoading || customLoading}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
              title="Refresh research"
            >
              {generalLoading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <RefreshCw size={24} />
              )}
            </button>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
          {(generalError || customError) && (
            <p className="mt-4 text-red-600">{generalError || customError}</p>
          )}
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for specific eye health research..."
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              
              <button
                type="submit"
                disabled={customLoading || !searchQuery.trim()}
                className={`
                  absolute right-2 top-1/2 transform -translate-y-1/2
                  px-4 py-1.5 bg-blue-600 text-white rounded-md
                  ${(customLoading || !searchQuery.trim()) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}
                  transition-colors
                `}
              >
                {customLoading ? (
                  <div className="flex items-center">
                    <Loader2 size={16} className="animate-spin mr-2" />
                    <span>Searching...</span>
                  </div>
                ) : 'Search'}
              </button>
            </div>
          </form>
        </div>
        
        {showCustomResults && (
          <div className="mb-8 flex justify-between items-center">
            <h3 className="text-xl font-semibold">Research results for: "{searchQuery}"</h3>
            <button
              onClick={handleReset}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Back to latest research
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {itemsToShow.map((item) => (
            <Card 
              key={item.id} 
              className="overflow-hidden h-full flex flex-col"
              hoverable
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center text-gray-500 mb-3">
                  <Calendar size={16} className="mr-1" />
                  <span className="text-sm">{item.date}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{item.title}</h3>
                
                <p className="text-gray-600 mb-4 flex-grow">{item.summary}</p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-500">Source: {item.source}</span>
                  
                  <a 
                    href="#" 
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Read More
                    <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ResearchSection;