import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import FeatureSection from '../components/home/FeatureSection';
import AgeGroupSection from '../components/education/AgeGroupSection';
import MythBustingSection from '../components/education/MythBustingSection';
import ResearchSection from '../components/education/ResearchSection';
import { AGE_GROUPS, EYE_MYTHS, RESEARCH_ITEMS } from '../utils/constants';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <FeatureSection />
      <AgeGroupSection 
        ageGroups={AGE_GROUPS} 
        showAll={true}
      />
      <MythBustingSection 
        myths={EYE_MYTHS} 
        compact={true}
      />
      <ResearchSection 
        researchItems={RESEARCH_ITEMS} 
        compact={true} 
      />
    </Layout>
  );
};

export default HomePage;