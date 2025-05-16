import React from 'react';
import { ChevronRight } from 'lucide-react';
import { AgeGroup } from '../../types';
import Card from '../common/Card';
import Container from '../common/Container';

interface AgeGroupSectionProps {
  ageGroups: AgeGroup[];
  title?: string;
  description?: string;
  showAll?: boolean;
}

const AgeGroupSection: React.FC<AgeGroupSectionProps> = ({ 
  ageGroups, 
  title = "Age-Specific Eye Care",
  description = "Discover tailored eye care recommendations for every stage of life",
  showAll = true
}) => {
  // If not showing all, just display the first item
  const groupsToShow = showAll ? ageGroups : [ageGroups[0]];

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groupsToShow.map((group) => (
            <Card 
              key={group.id}
              className="overflow-hidden transition-all duration-300 h-full flex flex-col"
              hoverable
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={group.imageUrl} 
                  alt={group.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{group.title}</h3>
                <p className="text-gray-600 mb-4">{group.description}</p>
                
                <div className="mt-4">
                  <h4 className="font-medium text-gray-800 mb-2">Key Recommendations:</h4>
                  <ul className="space-y-2">
                    {group.recommendations.slice(0, 3).map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <ChevronRight size={18} className="text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-gray-600 ml-2">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AgeGroupSection;