import React, { useState, useEffect } from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-blue-600 opacity-5 pattern-dots pattern-size-2 pattern-opacity-50"></div>
      </div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className={`
              transition-all duration-1000 transform 
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
          >
            <div className="flex justify-center items-center mb-6">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
                <Eye size={36} />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Comprehensive Eye Health <span className="text-blue-600">Education</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover evidence-based information for all age groups, bust common myths, 
              and access the latest research on eye health and care.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/age-groups">
                <Button 
                  variant="primary" 
                  size="lg" 
                  icon={<ArrowRight size={20} />}
                  iconPosition="right"
                >
                  Explore By Age Group
                </Button>
              </Link>
              
              <Link to="/ask">
                <Button 
                  variant="outline" 
                  size="lg" 
                >
                  Ask An Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default HeroSection;