'use client';

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';

const COLORS = {
  indigo: '#6366f1',
  emerald: '#10b981',
  amber: '#f59e0b',
  pink: '#ec4899',
  cyan: '#06b6d4',
  purple: '#a855f7'
};

const PIE_COLORS = [COLORS.indigo, COLORS.emerald, COLORS.amber, COLORS.pink, COLORS.cyan, COLORS.purple];

interface AreaChartProps {
  data: any[];
  xKey: string;
  yKey: string;
  color?: keyof typeof COLORS;
  title?: string;
}

export const RechartsArea: React.FC<AreaChartProps> = ({ data, xKey, yKey, color = 'indigo', title }) => (
  <div className="w-full h-full min-h-[300px] p-4 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col">
    {title && <h3 className="text-sm font-bold text-gray-300 font-mono uppercase mb-4">{title}</h3>}
    <div className="flex-1 w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`color${yKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS[color]} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={COLORS[color]} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
          <XAxis dataKey={xKey} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}`} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
            itemStyle={{ color: '#e2e8f0' }}
          />
          <Area type="monotone" dataKey={yKey} stroke={COLORS[color]} fillOpacity={1} fill={`url(#color${yKey})`} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

interface BarChartProps {
  data: any[];
  xKey: string;
  yKeys: string[];
  colors?: (keyof typeof COLORS)[];
  title?: string;
}

export const RechartsBar: React.FC<BarChartProps> = ({ data, xKey, yKeys, colors = ['emerald', 'indigo'], title }) => (
  <div className="w-full h-full min-h-[300px] p-4 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col">
    {title && <h3 className="text-sm font-bold text-gray-300 font-mono uppercase mb-4">{title}</h3>}
    <div className="flex-1 w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
          <XAxis dataKey={xKey} stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
            itemStyle={{ color: '#e2e8f0' }}
            cursor={{ fill: '#ffffff10' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          {yKeys.map((key, idx) => (
            <Bar key={key} dataKey={key} fill={COLORS[colors[idx % colors.length]]} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

interface PieChartProps {
  data: any[];
  nameKey: string;
  dataKey: string;
  title?: string;
}

export const RechartsPie: React.FC<PieChartProps> = ({ data, nameKey, dataKey, title }) => (
  <div className="w-full h-full min-h-[300px] p-4 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col items-center justify-center">
    {title && <h3 className="text-sm font-bold text-gray-300 font-mono uppercase mb-4 w-full text-left">{title}</h3>}
    <div className="flex-1 w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey={dataKey}
            nameKey={nameKey}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
            itemStyle={{ color: '#e2e8f0' }}
          />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);
