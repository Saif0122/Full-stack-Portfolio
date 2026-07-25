import React from 'react';
import { fetchAllProducts } from '@/services/store.service';
import StoreView from './StoreView';
import { Metadata } from 'next';

export const revalidate = 60; // Revalidate at most every 60 seconds

export const metadata: Metadata = {
  title: 'Developer Store | Premium Tools & Boilerplates',
  description: 'Enterprise-grade Next.js templates, SaaS boilerplates, and React UI components.',
};

export default async function StorePage() {
  const products = await fetchAllProducts();

  return <StoreView products={products} />;
}
