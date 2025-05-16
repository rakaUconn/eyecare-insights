import React, { useState } from 'react';
import { EyeMyth } from '../../types';
import Container from '../common/Container';
import Card from '../common/Card';
import { X, RefreshCw, Loader2, Search, AlertCircle } from 'lucide-react';
import { useSonarContent } from '../../hooks/useSonarContent';
import { useCustomSonarContent } from '../../hooks/useCustomSonarContent';

interface MythBustingSectionProps {
  myths: EyeMyth[];
  title?: string;
  description?: string;
  compact?: boolean;
}

const MythBustingSection: React.FC<MythBustingSectionProps> = ({
  myths: initialMyths,
  title = "Common Eye Health Myths",
  description = "Let's separate fact from fiction with evidence-based explanations",
  compact = false
}) => {
  const [selectedMyth, setSelectedMyth] = useState<EyeMyth | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomResults, setShowCustomResults] = useState(false);
  const { myths: aiMyths, isLoading: generalLoading, error: generalError, refreshContent } = useSonarContent();
  const { content: customMyths, isLoading: customLoading, error: customError, fetchContent, resetContent } = useCustomSonarContent('myths');
  
  // Combine initial myths with AI-generated ones for general display
  const allMyths = [...initialMyths, ...aiMyths];
  
  // If compact, only show first 2 myths
  const mythsToShow = showCustomResults 
    ? customMyths as EyeMyth[] 
    : (compact ? allMyths.slice(0, 2) : allMyths);
    
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
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={refreshContent}
              disabled={generalLoading || customLoading}
              className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
              title="Refresh myths"
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
                placeholder="Search for specific eye health myths..."
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
            <h3 className="text-xl font-semibold">Results for: "{searchQuery}"</h3>
            <button
              onClick={handleReset}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Back to common myths
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mythsToShow.map((myth) => (
            <Card 
              key={myth.id}
              onClick={() => setSelectedMyth(myth)}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200"
              hoverable
            >
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={myth.imageUrl} 
                  alt={myth.myth} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block bg-red-500 text-white text-sm font-medium px-2 py-1 rounded mb-2">
                    Myth
                  </span>
                  <h3 className="text-xl font-semibold text-white">{myth.myth}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                    Reality
                  </span>
                  <p className="mt-2 text-gray-800 font-medium">{myth.reality}</p>
                </div>
                
                <p className="text-gray-600 line-clamp-2">{myth.explanation}</p>
                
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-4">
                  Learn more
                </button>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Myth Detail Modal */}
        {selectedMyth && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="inline-block bg-red-500 text-white text-sm font-medium px-2 py-1 rounded mb-2">
                      Myth
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedMyth.myth}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedMyth(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="h-48 relative rounded-lg overflow-hidden mb-6">
                  <img 
                    src={selectedMyth.imageUrl} 
                    alt={selectedMyth.myth} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="mb-6">
                  <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded mb-2">
                    Reality
                  </span>
                  <p className="mt-2 text-gray-800 font-semibold text-lg">{selectedMyth.reality}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Explanation</h4>
                  <p className="text-gray-700">{selectedMyth.explanation}</p>
                </div>
                
                <div className="text-right">
                  <button 
                    onClick={() => setSelectedMyth(null)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default MythBustingSection;