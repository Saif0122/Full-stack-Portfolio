import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/helpers';
import { SectionTitle } from '@/components/ui';

export const metadata: Metadata = generatePageMetadata({
  title: 'Terms of Service',
  description: 'Terms of Service, intellectual property, and usage conditions for Saiful Islam portfolio and store.',
  path: '/terms-of-service',
});

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#070B14] pt-32 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="Legal & Compliance" title="Terms of Service" />
        
        <div className="prose prose-invert prose-indigo max-w-none mt-12 space-y-8 font-light text-gray-300">
          <section>
            <p className="text-sm text-gray-500 font-mono mb-4">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>
              By accessing and using this website (saifulislam.vercel.app), including purchasing products from our developer store, you accept and agree to be bound by the terms and provisions of this agreement. 
              In addition, when using this website&apos;s particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Intellectual Property</h2>
            <p>
              The Site and all of its original content, features, and functionality are owned by Saiful Islam and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <p>
              The digital products, templates, and boilerplates sold in the Developer Store are provided under a specific licensing agreement attached to each product. Unless explicitly stated otherwise, purchasing a template grants you a non-exclusive license to use the code for your projects, but you may not resell or redistribute the original source code as your own product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Website Use & Portfolio Information</h2>
            <p>
              The portfolio items, case studies, and code snippets displayed on this website are for demonstration purposes. While every effort is made to ensure the accuracy of the information presented, we make no guarantees regarding the completeness, reliability, or accuracy of this information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. E-commerce and Store Terms</h2>
            <p>
              We reserve the right to refuse or cancel any order placed for products listed in our Developer Store. 
              All digital product sales are generally considered final due to the nature of downloadable software. Refunds are evaluated on a case-by-case basis depending on the specific product license.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. External Links</h2>
            <p>
              Our Site may contain links to third-party web sites or services that are not owned or controlled by us. 
              We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
            <p>
              In no event shall Saiful Islam, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
            <p>
              If you have any questions about these Terms, please reach out via our <a href="/contact" className="text-indigo-400 hover:underline">Contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
