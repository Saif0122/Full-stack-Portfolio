import SchemaRegistry from './schema-registry.service.js';
import SchemaConfig from '../models/schema-config.model.js';

class SchemaGeneratorService {
  async getGlobalConfig() {
    let config = await SchemaConfig.findOne();
    if (!config) {
      config = {
        organizationName: 'Saiful Islam',
        organizationLogo: 'https://saifulislam.vercel.app/logo.png',
        contactEmail: 'contact@saifulislam.vercel.app',
        websiteUrl: 'https://saifulislam.vercel.app',
        socialProfiles: [],
        foundingDate: '2020-01-01',
        defaultImage: 'https://saifulislam.vercel.app/og-default.png'
      };
    }
    return config;
  }

  async generateOrganizationSchema() {
    const config = await this.getGlobalConfig();
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: config.organizationName,
      url: config.websiteUrl,
      logo: {
        '@type': 'ImageObject',
        url: config.organizationLogo
      },
      sameAs: config.socialProfiles || config.sameAsLinks || [],
      contactPoint: config.contactEmail ? {
        '@type': 'ContactPoint',
        email: config.contactEmail,
        contactType: 'customer support'
      } : undefined
    };
  }

  async generateWebsiteSchema() {
    const config = await this.getGlobalConfig();
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: config.organizationName,
      url: config.websiteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${config.websiteUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };
  }

  async generatePersonSchema() {
    const config = await this.getGlobalConfig();
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: config.organizationName,
      url: config.websiteUrl,
      image: config.organizationLogo,
      sameAs: config.socialProfiles || config.sameAsLinks || []
    };
  }

  async generateArticleSchema(entity) {
    const config = await this.getGlobalConfig();
    const url = `${config.websiteUrl}/blog/${entity.slug}`;
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url
      },
      headline: entity.seo?.metaTitle || entity.title,
      description: entity.seo?.metaDescription || entity.excerpt,
      image: entity.seo?.openGraphImage || config.defaultImage,
      author: {
        '@type': 'Person',
        name: entity.author?.name || config.organizationName,
        url: `${config.websiteUrl}/about`
      },
      publisher: {
        '@type': 'Organization',
        name: config.organizationName,
        logo: {
          '@type': 'ImageObject',
          url: config.organizationLogo
        }
      },
      datePublished: entity.publishedAt ? new Date(entity.publishedAt).toISOString() : new Date().toISOString(),
      dateModified: entity.updatedAt ? new Date(entity.updatedAt).toISOString() : new Date().toISOString(),
      keywords: entity.seo?.focusKeyword 
        ? [entity.seo.focusKeyword, ...(entity.seo.secondaryKeywords || [])].join(', ') 
        : undefined
    };
  }

  async generateProductSchema(entity) {
    const config = await this.getGlobalConfig();
    const url = `${config.websiteUrl}/store/${entity.slug}`;
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: entity.seo?.metaTitle || entity.title,
      image: entity.seo?.openGraphImage || entity.thumbnail || config.defaultImage,
      description: entity.seo?.metaDescription || entity.description,
      sku: entity.sku || entity._id.toString(),
      brand: {
        '@type': 'Brand',
        name: config.organizationName
      },
      offers: {
        '@type': 'Offer',
        url: url,
        priceCurrency: 'USD',
        price: entity.price || 0,
        availability: 'https://schema.org/InStock'
      }
    };
  }

  async generateProjectSchema(entity) {
    const config = await this.getGlobalConfig();
    const url = `${config.websiteUrl}/projects/${entity.slug}`;
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: entity.seo?.metaTitle || entity.title,
      description: entity.seo?.metaDescription || entity.description,
      url: url,
      image: entity.seo?.openGraphImage || entity.thumbnail || config.defaultImage,
      creator: {
        '@type': 'Person',
        name: config.organizationName
      }
    };
  }

  async generateFaqSchema(faqs) {
    if (!faqs || faqs.length === 0) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  }

  async generateBreadcrumbSchema(items) {
    if (!items || items.length === 0) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  }

  async generateLocalBusinessSchema(locationData) {
    const config = await this.getGlobalConfig();
    
    // We expect locationData to include the LocalBusinessProfile as well
    const profile = locationData?.profile || {};
    const businessName = profile.businessName || config.organizationName;
    const url = profile.website || config.websiteUrl;
    const email = profile.email || config.contactEmail;
    
    const schema = {
      '@context': 'https://schema.org',
      '@type': profile.businessCategory === 'ProfessionalService' ? 'ProfessionalService' : 'LocalBusiness',
      name: locationData?.locationName || businessName,
      url: url,
      logo: profile.logo || config.organizationLogo,
      image: profile.logo || config.organizationLogo,
      description: profile.description || undefined,
      telephone: profile.phone || undefined,
      email: email || undefined,
      address: {
        '@type': 'PostalAddress',
        streetAddress: locationData?.streetAddress || undefined,
        addressLocality: locationData?.city || undefined,
        addressRegion: locationData?.stateProvince || undefined,
        postalCode: locationData?.postalCode || undefined,
        addressCountry: locationData?.country || undefined
      }
    };

    if (locationData?.geoCoordinates?.latitude && locationData?.geoCoordinates?.longitude) {
      schema.geo = {
        '@type': 'GeoCoordinates',
        latitude: locationData.geoCoordinates.latitude,
        longitude: locationData.geoCoordinates.longitude
      };
    }
    
    if (locationData?.openingHours && locationData.openingHours.length > 0) {
      schema.openingHoursSpecification = locationData.openingHours.map(hours => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: hours.day,
        opens: hours.isClosed ? '00:00' : hours.open,
        closes: hours.isClosed ? '00:00' : hours.close
      }));
    }

    if (locationData?.primaryServiceArea) {
      schema.areaServed = {
        '@type': 'Place',
        name: locationData.primaryServiceArea
      };
    }

    return schema;
  }
  async generateImageSchema(mediaData) {
    if (!mediaData) return null;
    const config = await this.getGlobalConfig();
    
    return {
      '@context': 'https://schema.org',
      '@type': 'ImageObject',
      url: mediaData.url || config.defaultImage,
      contentUrl: mediaData.url || config.defaultImage,
      name: mediaData.title || mediaData.originalName,
      caption: mediaData.caption || undefined,
      description: mediaData.description || mediaData.altText || undefined,
      author: mediaData.author ? {
        '@type': 'Person',
        name: mediaData.author
      } : undefined,
      copyrightNotice: mediaData.copyright || undefined,
      license: mediaData.license || undefined,
      width: mediaData.width ? `${mediaData.width} px` : undefined,
      height: mediaData.height ? `${mediaData.height} px` : undefined,
      datePublished: mediaData.createdAt ? new Date(mediaData.createdAt).toISOString() : undefined
    };
  }

  async generateVideoSchema(mediaData) {
    if (!mediaData) return null;
    const config = await this.getGlobalConfig();
    
    return {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: mediaData.title || mediaData.originalName,
      description: mediaData.description || undefined,
      thumbnailUrl: mediaData.versions?.thumbnail || config.defaultImage,
      uploadDate: mediaData.createdAt ? new Date(mediaData.createdAt).toISOString() : new Date().toISOString(),
      contentUrl: mediaData.streamingUrl || mediaData.url,
      duration: mediaData.duration ? `PT${mediaData.duration}S` : undefined,
      transcript: mediaData.transcript || undefined,
      videoQuality: mediaData.resolution || undefined,
      publisher: {
        '@type': 'Organization',
        name: config.organizationName,
        logo: {
          '@type': 'ImageObject',
          url: config.organizationLogo
        }
      }
    };
  }

  async generateMediaSchema(mediaData) {
    if (mediaData?.isVideo) return this.generateVideoSchema(mediaData);
    return this.generateImageSchema(mediaData);
  }
}

const generatorService = new SchemaGeneratorService();

// Register generators with Registry
SchemaRegistry.register('Organization', (data) => generatorService.generateOrganizationSchema(data));
SchemaRegistry.register('WebSite', (data) => generatorService.generateWebsiteSchema(data));
SchemaRegistry.register('Person', (data) => generatorService.generatePersonSchema(data));
SchemaRegistry.register('Article', (data) => generatorService.generateArticleSchema(data));
SchemaRegistry.register('BlogPosting', (data) => generatorService.generateArticleSchema(data));
SchemaRegistry.register('Product', (data) => generatorService.generateProductSchema(data));
SchemaRegistry.register('Project', (data) => generatorService.generateProjectSchema(data));
SchemaRegistry.register('FAQPage', (data) => generatorService.generateFaqSchema(data));
SchemaRegistry.register('BreadcrumbList', (data) => generatorService.generateBreadcrumbSchema(data));
SchemaRegistry.register('LocalBusiness', (data) => generatorService.generateLocalBusinessSchema(data));
SchemaRegistry.register('ProfessionalService', (data) => generatorService.generateLocalBusinessSchema(data));
SchemaRegistry.register('ImageObject', (data) => generatorService.generateImageSchema(data));
SchemaRegistry.register('VideoObject', (data) => generatorService.generateVideoSchema(data));
SchemaRegistry.register('MediaObject', (data) => generatorService.generateMediaSchema(data));
SchemaRegistry.register('CreativeWork', (data) => generatorService.generateProjectSchema(data)); // Reusing project schema for generic creative works

export default generatorService;
