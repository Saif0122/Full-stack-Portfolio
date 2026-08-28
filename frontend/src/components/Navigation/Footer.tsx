import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-gray-800/50 bg-[#070B14]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 text-sm font-light">
          &copy; {new Date().getFullYear()} SAIFUL ISLAM. BUILT WITH PRECISION & PASSION.
        </p>
        <div className="flex gap-8">
          {[
            { label: 'Github', url: 'https://github.com/saifulislam' },
            { label: 'LinkedIn', url: 'https://linkedin.com/in/saifulislam' },
            { label: 'Twitter', url: 'https://twitter.com/saifulislam' },
            { label: 'Medium', url: 'https://medium.com/@saifulislam' }
          ].map(platform => (
            <a 
              key={platform.label} 
              href={platform.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs uppercase tracking-widest text-gray-500 hover:text-primary transition-colors"
            >
              {platform.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
