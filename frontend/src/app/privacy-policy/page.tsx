import React from 'react';
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/helpers';
import { SectionTitle } from '@/components/ui';

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description: 'Privacy Policy and data collection practices for Saiful Islam portfolio and services.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#070B14] pt-32 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="Legal & Compliance" title="Privacy Policy" />
        
        <div className="prose prose-invert prose-emerald max-w-none mt-12 space-y-8 font-light text-gray-300">
          <section>
            <p className="text-sm text-gray-500 font-mono mb-4">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>
              This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from saifulislam.vercel.app (the &quot;Site&quot;). 
              We are committed to protecting your privacy and ensuring you have a positive experience on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-2">1. Information You Provide</h3>
            <p>
              When you interact with our Site, such as filling out a contact form or subscribing to a newsletter, we collect the personal information you give us, such as your name, email address, and message content.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-2">2. Automatically Collected Information & Analytics</h3>
            <p>
              When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. We use internal analytics tools to monitor site health and performance.
            </p>

            <h3 className="text-xl font-semibold text-gray-200 mt-6 mb-2">3. Cookies</h3>
            <p>
              We use &quot;cookies&quot; and similar tracking technologies to track the activity on our Site and hold certain information. 
              Cookies are files with a small amount of data which may include an anonymous unique identifier.
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Future Advertising Disclosures</h2>
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <p className="mb-0">
                <strong>Notice regarding future advertising:</strong> As this website grows, we may introduce third-party advertising networks (such as Google AdSense) on specific content-heavy pages (like our Blog). 
                If and when these services are activated, third-party vendors, including Google, will use cookies to serve ads based on your prior visits to this website or other websites.
                <br /><br />
                Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our sites and/or other sites on the Internet. 
                Users will be presented with a clear consent mechanism to opt-out of personalized advertising when these features are enabled.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To communicate with you and respond to your inquiries.</li>
              <li>To screen our orders for potential risk or fraud.</li>
              <li>To monitor and analyze trends, usage, and activities in connection with our Site.</li>
              <li>To provide, operate, and maintain our Site.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. 
              While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p>
              For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at the contact address provided on our <a href="/contact" className="text-primary hover:underline">Contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
