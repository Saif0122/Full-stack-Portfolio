import React from 'react';
import { Metadata } from 'next';
import { fetchAllProducts } from '@/services/store.service';
import StoreView from './StoreView';
import LiveDataRefresher from '@/components/LiveDataRefresher';
import { generatePageMetadata } from '@/lib/seo/helpers';
import { resolveStoreSeo } from '@/lib/seo/service';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seoOpts = await resolveStoreSeo();
  return generatePageMetadata(seoOpts);
}

export default async function StorePage() {
  const products = await fetchAllProducts();
  const isMockData = products.some(p => p._isMock);

  return (
    <>
      <LiveDataRefresher isMockData={isMockData} />
      <StoreView products={products} />
    </>
  );
}

