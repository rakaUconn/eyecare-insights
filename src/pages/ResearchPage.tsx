import React from 'react';
import Layout from '../components/layout/Layout';
import ResearchSection from '../components/education/ResearchSection';
import Container from '../components/common/Container';
import { RESEARCH_ITEMS } from '../utils/constants';

const ResearchPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <Container>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Latest Eye Health Research
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simplified explanations of recent ophthalmology findings and their 
              practical implications for everyday eye care.
            </p>
          </div>
        </Container>
      </div>
      
      <ResearchSection 
        researchItems={RESEARCH_ITEMS} 
        title="Recent Research Findings"
        description="Cutting-edge research translated into practical knowledge"
      />
      
      <div className="bg-white py-16">
        <Container size="md">
          <div className="bg-purple-50 rounded-lg shadow-md p-8 border border-purple-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How We Translate Research
            </h2>
            <p className="text-gray-700 mb-4">
              Our team collaborates with ophthalmologists, optometrists, and vision scientists to 
              carefully review peer-reviewed research and translate complex findings into practical, 
              accessible information.
            </p>
            <p className="text-gray-700 mb-4">
              We focus on studies published in reputable journals with sound methodology and 
              significant implications for eye health. Our goal is to bridge the gap between 
              academic research and practical applications for everyday eye care.
            </p>
            <p className="text-gray-700">
              While we strive to provide accurate information, this content should not replace 
              professional medical advice. Always consult with qualified eye care professionals 
              for personalized recommendations based on your specific conditions.
            </p>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default ResearchPage;