import React from 'react';
import Layout from '../components/layout/Layout';
import QASection from '../components/qa/QASection';
import Container from '../components/common/Container';
import { COMMON_QUESTIONS } from '../utils/constants';

const AskPage: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 py-20">
        <Container>
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Ask An Expert
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to your eye health questions powered by Perplexity's Sonar API,
              delivering accurate information from reliable sources.
            </p>
          </div>
        </Container>
      </div>
      
      <QASection 
        commonQuestions={COMMON_QUESTIONS}
        title="Your Eye Health Questions Answered"
        description="Search for answers or browse our collection of common questions"
      />
      
      <div className="bg-gray-50 py-16">
        <Container size="md">
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About Our AI-Powered Answers
            </h2>
            <p className="text-gray-700 mb-4">
              Our question-answering system is powered by Perplexity's Sonar API, which leverages 
              advanced AI to provide accurate, evidence-based responses to your eye health questions.
            </p>
            <p className="text-gray-700 mb-4">
              The system draws information from reputable medical sources, research publications, 
              and eye care professional resources to ensure you receive reliable information.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-yellow-800">
                <strong>Important:</strong> While our AI provides accurate information, it is not a 
                substitute for professional medical advice, diagnosis, or treatment. Always consult 
                with a qualified eye care professional for personal medical concerns.
              </p>
            </div>
            <p className="text-gray-700">
              If you have an eye emergency or are experiencing concerning symptoms, please contact 
              your eye doctor or seek immediate medical attention.
            </p>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default AskPage;