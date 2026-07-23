import { MOCK_PRODUCTS } from '@/constants/store';
import ProductGallery from '@/components/Store/ProductGallery';
import ProductPricing from '@/components/Store/ProductPricing';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = MOCK_PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/store" className="hover:text-primary transition-colors">Store</Link>
          <span>/</span>
          <span className="capitalize">{product.category.replace('-', ' ')}</span>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.title}</h1>
              <p className="text-xl text-muted-foreground">{product.description}</p>
            </div>

            <ProductGallery images={product.images} thumbnail={product.thumbnail} />

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 bg-secondary/5 p-4 rounded-xl">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {product.technologies.map((tech, idx) => (
                    <span key={idx} className="px-4 py-2 bg-secondary/10 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <ProductPricing product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
