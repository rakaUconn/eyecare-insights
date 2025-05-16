import React from 'react';
import { Brain, Shield, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../common/Container';
import Card from '../common/Card';
import Button from '../common/Button';

const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <Brain size={36} className="text-blue-600" />,
      title: "Myth Busting",
      description: "Separate fact from fiction with evidence-based explanations that address common misconceptions about eye health.",
      link: "/myths",
      color: "blue"
    },
    {
      icon: <BarChart3 size={36} className="text-purple-600" />,
      title: "Latest Research",
      description: "Access simplified explanations of recent ophthalmology research findings and their practical implications.",
      link: "/research",
      color: "purple"
    },
    {
      icon: <Shield size={36} className="text-teal-600" />,
      title: "Age-Specific Guidance",
      description: "Find tailored eye care recommendations for children, adults, and seniors based on age-specific needs.",
      link: "/age-groups",
      color: "teal"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Comprehensive Eye Health Resources
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of evidence-based resources designed to help you understand and care for your vision at every stage of life.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const colorClasses = {
              blue: "bg-blue-50 border-blue-100 hover:bg-blue-100",
              purple: "bg-purple-50 border-purple-100 hover:bg-purple-100",
              teal: "bg-teal-50 border-teal-100 hover:bg-teal-100"
            };
            
            return (
              <Card 
                key={index} 
                className={`p-8 border transition-all ${colorClasses[feature.color as keyof typeof colorClasses]}`}
                hoverable
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <Link to={feature.link} className="mt-auto">
                    <Button variant="text">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default FeatureSection;