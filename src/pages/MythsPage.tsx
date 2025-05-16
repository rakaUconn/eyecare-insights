import React from 'react';
import Layout from '../components/layout/Layout';
import MythBustingSection from '../components/education/MythBustingSection';
import Container from '../components/common/Container';
import { EYE_MYTHS } from '../utils/constants';

const MythsPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-red-50 to-blue-50 py-20">
        <Container>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Eye Health Myths Debunked
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Separating fact from fiction with evidence-based explanations
              to help you make informed decisions about your eye health.
            </p>
          </div>
        </Container>
      </div>
      
      <MythBustingSection 
        myths={EYE_MYTHS} 
        title="Common Eye Health Misconceptions"
        description="Let's examine some persistent myths about eye health and vision care"
      />
      
      <div className="bg-blue-50 py-16">
        <Container size="md">
          <div className="bg-white rounded-lg shadow-md p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Do Eye Myths Persist?
            </h2>
            <p className="text-gray-700 mb-4">
              Eye health myths often persist due to a combination of cultural traditions, 
              outdated information, and misunderstandings about how our eyes work. Many were 
              formed before modern ophthalmology and optometry developed, while others stem 
              from correlations being mistaken for causation.
            </p>
            <p className="text-gray-700 mb-4">
              Additionally, vision and eye health can be complex topics, making it difficult 
              for the general public to distinguish between scientific facts and misconceptions. 
              The internet and social media can further spread these myths, often without proper 
              verification from eye care professionals.
            </p>
            <p className="text-gray-700">
              By understanding the science behind our vision and consulting with qualified eye 
              care professionals, we can make better decisions about our eye health and care.
            </p>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default MythsPage;