
import React from 'react';
import { motion } from 'framer-motion';

const metrics = [
  { label: 'Avg Lighthouse', value: 98, suffix: '%' },
  { label: 'API Response', value: 45, suffix: 'ms' },
  { label: 'First Contentful Paint', value: 0.8, suffix: 's' },
  { label: 'Uptime Reliability', value: 99.9, suffix: '%' },
];

export const PerformanceMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="p-8 rounded-3xl bg-white/5 border border-white/10 group hover:border-primary/30 transition-all text-center"
        >
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4 font-black">{m.label}</p>
          <div className="text-4xl font-black text-white flex justify-center items-baseline group-hover:text-primary transition-colors">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              {m.value}
            </motion.span>
            <span className="text-sm ml-1 text-gray-500 font-normal">{m.suffix}</span>
          </div>
          <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-blue-500"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
