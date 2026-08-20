import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Seo from '../models/seo.model.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

const seedData = [
  {
    path: '/',
    metaTitle: 'Saiful Islam | Principal MERN Stack Developer & Software Engineer',
    metaDescription: 'Expert Full Stack Developer specializing in React, Next.js, Node.js, and MongoDB. Building enterprise scalable architectures and stunning user experiences.',
    focusKeyword: 'MERN Stack Developer',
    secondaryKeywords: ['Full Stack Developer', 'React Developer', 'Software Engineer', 'Next.js Developer'],
    searchIntent: 'informational',
    seoPriority: 'high',
    schemaType: 'ProfilePage',
  },
  {
    path: '/about',
    metaTitle: 'About Saiful | Senior Full Stack Software Engineer',
    metaDescription: 'Learn about my journey as a Software Engineer and my expertise in JavaScript, TypeScript, Node.js, and the complete MERN ecosystem.',
    focusKeyword: 'Software Engineer',
    secondaryKeywords: ['JavaScript Developer', 'TypeScript Developer', 'Backend Developer'],
    searchIntent: 'informational',
    seoPriority: 'high',
    schemaType: 'ProfilePage',
  },
  {
    path: '/projects',
    metaTitle: 'Projects & Portfolio | React & Node.js Developer',
    metaDescription: 'Explore my portfolio of enterprise web applications, SaaS platforms, and tools built with Next.js, React, Express.js, and MongoDB.',
    focusKeyword: 'React Developer',
    secondaryKeywords: ['Next.js Developer', 'Portfolio', 'MERN Stack Projects'],
    searchIntent: 'navigational',
    seoPriority: 'high',
    schemaType: 'ItemList',
  }
];

async function seedSeo() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected.');

    for (const data of seedData) {
      const existing = await Seo.findOne({ path: data.path });
      if (existing) {
        existing.focusKeyword = data.focusKeyword;
        existing.secondaryKeywords = data.secondaryKeywords;
        existing.searchIntent = data.searchIntent;
        existing.seoPriority = data.seoPriority;
        existing.schemaType = data.schemaType;
        if (!existing.metaTitle) existing.metaTitle = data.metaTitle;
        if (!existing.metaDescription) existing.metaDescription = data.metaDescription;
        await existing.save();
        console.log(`Updated SEO for path: ${data.path}`);
      } else {
        await Seo.create(data);
        console.log(`Created SEO for path: ${data.path}`);
      }
    }

    console.log('SEO Seed Complete.');
    process.exit(0);
  } catch (error) {
    console.error('Seed Error:', error);
    process.exit(1);
  }
}

seedSeo();
