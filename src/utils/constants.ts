import { AgeGroup, EyeMyth, ResearchItem, QuestionAnswer } from '../types';

export const AGE_GROUPS: AgeGroup[] = [
  {
    id: 'children',
    title: 'Children (0-18)',
    description: 'Early eye care is crucial for development. Learn how to spot issues and promote healthy vision habits.',
    imageUrl: 'https://images.pexels.com/photos/5088188/pexels-photo-5088188.jpeg',
    recommendations: [
      'Regular eye exams starting at 6 months',
      'Limit screen time to prevent digital eye strain',
      'Ensure proper lighting for reading and homework',
      'Encourage outdoor activities (at least 2 hours daily)',
      'Provide UV-protective sunglasses for outdoor activities'
    ]
  },
  {
    id: 'adults',
    title: 'Adults (19-64)',
    description: 'Protect your vision during your working years with proper eye care practices and regular check-ups.',
    imageUrl: 'https://images.pexels.com/photos/5699514/pexels-photo-5699514.jpeg',
    recommendations: [
      'Comprehensive eye exam every 1-2 years',
      'Use the 20-20-20 rule when working on screens',
      'Wear protective eyewear for hazardous activities',
      'Maintain a balanced diet rich in eye-healthy nutrients',
      'Manage conditions like diabetes that affect eye health'
    ]
  },
  {
    id: 'seniors',
    title: 'Seniors (65+)',
    description: 'Age-related eye conditions require special attention. Learn about prevention and management.',
    imageUrl: 'https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg',
    recommendations: [
      'Annual comprehensive eye exams',
      'Monitor for age-related conditions (cataracts, glaucoma, AMD)',
      'Ensure proper lighting in living spaces',
      'Stay physically active to maintain eye health',
      'Consider supplements (after consulting healthcare provider)'
    ]
  }
];

export const EYE_MYTHS: EyeMyth[] = [
  {
    id: 'myth1',
    myth: 'Reading in dim light damages your eyes',
    reality: 'Reading in dim light doesn\'t damage your eyes',
    explanation: 'While reading in dim light can cause eye strain and temporary discomfort, it doesn\'t cause any permanent damage to your vision or eye structures.',
    imageUrl: 'https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg'
  },
  {
    id: 'myth2',
    myth: 'Sitting too close to screens ruins your eyesight',
    reality: 'Screen proximity doesn\'t permanently harm vision',
    explanation: 'Modern screens emit very little radiation. While sitting close may cause temporary strain, it doesn\'t cause permanent damage to healthy eyes.',
    imageUrl: 'https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg'
  },
  {
    id: 'myth3',
    myth: 'Eye exercises can improve vision and reduce prescription',
    reality: 'Eye exercises cannot correct refractive errors',
    explanation: 'While eye exercises can help with certain conditions like convergence insufficiency, they cannot change the shape of the eye or correct refractive errors like nearsightedness or astigmatism.',
    imageUrl: 'https://images.pexels.com/photos/5853689/pexels-photo-5853689.jpeg'
  },
  {
    id: 'myth4',
    myth: 'Carrots dramatically improve eyesight',
    reality: 'Carrots help maintain eye health but don\'t improve vision',
    explanation: 'Carrots contain vitamin A which is essential for eye health, but eating carrots won\'t improve vision beyond your natural capabilities or reduce refractive errors.',
    imageUrl: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg'
  }
];

export const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: 'research1',
    title: 'Blue Light Exposure and Sleep Quality',
    summary: 'Recent studies show blue light from screens before bedtime can disrupt circadian rhythms and reduce sleep quality.',
    source: 'Journal of Ophthalmology',
    date: '2024',
    imageUrl: 'https://images.pexels.com/photos/4004374/pexels-photo-4004374.jpeg'
  },
  {
    id: 'research2',
    title: 'Myopia Progression in Children',
    summary: 'Research suggests outdoor time can slow myopia progression in children, with at least 2 hours daily outdoor activity recommended.',
    source: 'American Academy of Ophthalmology',
    date: '2023',
    imageUrl: 'https://images.pexels.com/photos/346796/pexels-photo-346796.jpeg'
  },
  {
    id: 'research3',
    title: 'Nutrition and Age-Related Macular Degeneration',
    summary: 'Studies confirm certain nutrients, including lutein, zeaxanthin, and omega-3 fatty acids, can reduce AMD progression risk by up to 25%.',
    source: 'JAMA Ophthalmology',
    date: '2024',
    imageUrl: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg'
  }
];

export const COMMON_QUESTIONS: QuestionAnswer[] = [
  {
    id: 'q1',
    question: 'How often should I have my eyes examined?',
    answer: 'Adults should have comprehensive eye exams every 1-2 years. Children should start at 6 months, then at 3 years, before starting school, and annually thereafter. Seniors (65+) should have annual exams.'
  },
  {
    id: 'q2',
    question: 'Can eye strain from screens cause permanent damage?',
    answer: 'Digital eye strain doesn\'t cause permanent damage but can lead to uncomfortable symptoms. Follow the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.'
  },
  {
    id: 'q3',
    question: 'What foods are best for eye health?',
    answer: 'Foods rich in antioxidants, vitamins C and E, zinc, lutein, zeaxanthin, and omega-3 fatty acids support eye health. These include leafy greens, fish, nuts, citrus fruits, and colorful vegetables.'
  }
];