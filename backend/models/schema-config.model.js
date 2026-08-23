import mongoose from 'mongoose';

const schemaConfigSchema = new mongoose.Schema({
  organizationName: { type: String, required: true, default: 'Saiful Islam' },
  organizationLogo: { type: String, default: 'https://saifulislam.vercel.app/logo.png' },
  contactEmail: { type: String, default: 'contact@saifulislam.vercel.app' },
  websiteUrl: { type: String, default: 'https://saifulislam.vercel.app' },
  socialProfiles: { type: [String], default: [] },
  foundingDate: { type: String, default: '2020-01-01' },
  address: {
    streetAddress: { type: String, default: '' },
    addressLocality: { type: String, default: '' },
    addressRegion: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    addressCountry: { type: String, default: '' }
  },
  businessType: { type: String, default: 'Organization' },
  defaultImage: { type: String, default: 'https://saifulislam.vercel.app/og-default.png' },
  sameAsLinks: { type: [String], default: [] },
  knowledgeGraph: {
    description: { type: String, default: '' },
    keywords: { type: [String], default: [] }
  }
}, { timestamps: true });

const SchemaConfig = mongoose.models.SchemaConfig || mongoose.model('SchemaConfig', schemaConfigSchema);
export default SchemaConfig;
