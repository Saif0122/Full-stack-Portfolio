import Portfolio from '../models/portfolio.model.js';

export const seedPortfolio = async () => {
  try {
    const heroContent = {
      badgeText: 'Hire MERN Stack Developer',
      titleLine1: 'MERN STACK',
      titleLine2: 'Architect',
      subtitle: 'Senior MERN Stack Engineer specializing in SaaS application development and scalable web applications. I engineer high-performance digital products using the modern MERN ecosystem.',
      stats: [
        { label: 'Years Experience', value: '3+' },
        { label: 'Client', value: '500+' },
        { label: 'MERN Expertise', value: 'Expert' }
      ]
    };

    await Portfolio.findOneAndUpdate(
      { section: 'hero' },
      { section: 'hero', content: heroContent, isActive: true },
      { upsert: true, new: true }
    );

    console.log('✅ Portfolio content seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding portfolio content:', error);
  }
};
