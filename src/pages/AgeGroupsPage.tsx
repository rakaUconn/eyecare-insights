import React from 'react';
import Layout from '../components/layout/Layout';
import Container from '../components/common/Container';
import Card from '../components/common/Card';
import { AGE_GROUPS } from '../utils/constants';
import { ChevronRight } from 'lucide-react';

const AgeGroupsPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-blue-50 py-20">
        <Container>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Age-Specific Eye Care
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Eye care needs evolve throughout life. Discover tailored recommendations 
              for each age group to protect and preserve your vision.
            </p>
          </div>
        </Container>
      </div>
      
      <Container className="py-16">
        {AGE_GROUPS.map((group, index) => (
          <div 
            key={group.id} 
            className={`mb-16 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {group.title}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Eye Care for {group.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {group.description}
                </p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Recommendations</h3>
                  <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
                    <ul className="space-y-4">
                      {group.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start">
                          <ChevronRight size={20} className="text-blue-500 shrink-0 mt-1" />
                          <span className="ml-2 text-gray-700">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Resources</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="p-4 hover:border-blue-300">
                      <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                        Vision Development Milestones
                      </a>
                    </Card>
                    <Card className="p-4 hover:border-blue-300">
                      <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                        Warning Signs to Watch For
                      </a>
                    </Card>
                  </div>
                </div>
              </div>
              
              <div className="lg:order-2 order-1">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={group.imageUrl} 
                    alt={group.title} 
                    className="w-full h-auto object-cover aspect-video"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </Layout>
  );
};

export default AgeGroupsPage;