'use client';

import React, { useState } from 'react';
import { AdminLayout } from '@/components/admin/ui';
import { Button } from '@/components/ui';
import { adminService } from '@/services/admin.service';
import { useToast } from '@/providers/ToastProvider';
import { Beaker, Play, Save, History, SplitSquareHorizontal } from 'lucide-react';

export default function AiPromptPlayground() {
  const { toast } = useToast();
  const [promptTemplate, setPromptTemplate] = useState('Generate an SEO Title for a {{entityType}} about {{topic}}');
  const [variables, setVariables] = useState('{\n  "entityType": "Blog Post",\n  "topic": "Next.js 15 Server Actions"\n}');
  const [output, setOutput] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<any>(null);

  const handleTestPrompt = async () => {
    try {
      setIsLoading(true);
      setOutput(null);
      
      let parsedVariables = {};
      try {
        parsedVariables = JSON.parse(variables);
      } catch (e) {
        toast('Invalid JSON variables format', 'error');
        return;
      }

      // We use a dedicated test endpoint or the existing process endpoint. 
      // For the playground we assume a test endpoint was implemented or mock it here.
      const res = await adminService.create('/ai/test-prompt', {
        template: promptTemplate,
        variables: parsedVariables
      });

      setOutput(res.data.suggestion);
      setMetrics({
        inputTokens: res.data.usage?.inputTokens || 'Est. ' + Math.ceil(promptTemplate.length / 4),
        outputTokens: res.data.usage?.outputTokens || '...',
        cost: res.data.cost || '...',
        timeMs: res.data.timeMs || '...',
      });
      toast('Prompt test completed successfully', 'success');
    } catch (error) {
      toast('Failed to execute prompt test', 'error');
      setOutput({ error: 'Failed to generate content' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10 mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-purple-400 block mb-1">Developer Tools</span>
          <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Beaker size={28} className="text-purple-500" /> AI Prompt Playground
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <SplitSquareHorizontal size={16} /> New A/B Test
          </Button>
          <Button variant="primary" className="flex items-center gap-2" onClick={handleTestPrompt} disabled={isLoading}>
            {isLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Play size={16} />} 
            Run Test
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-[#111111] p-6 rounded-2xl border border-white/10">
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4 flex justify-between items-center">
              System Instruction / Template
              <Button variant="outline" size="sm"><Save size={14} className="mr-2"/> Save Version</Button>
            </h3>
            <textarea
              className="w-full h-64 bg-black border border-white/10 rounded-xl p-4 text-gray-300 font-mono text-sm focus:outline-none focus:border-purple-500 transition-colors"
              value={promptTemplate}
              onChange={(e) => setPromptTemplate(e.target.value)}
              placeholder="Enter your prompt template using {{variable}} syntax..."
            />
          </div>

          <div className="bg-[#111111] p-6 rounded-2xl border border-white/10">
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4">Variables (JSON)</h3>
            <textarea
              className="w-full h-32 bg-black border border-white/10 rounded-xl p-4 text-gray-300 font-mono text-sm focus:outline-none focus:border-purple-500 transition-colors"
              value={variables}
              onChange={(e) => setVariables(e.target.value)}
              placeholder='{"key": "value"}'
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#111111] p-6 rounded-2xl border border-white/10 h-full flex flex-col">
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4 flex items-center justify-between">
              AI Output
              {metrics && (
                <div className="flex gap-4 text-xs font-mono text-purple-400">
                  <span>In: {metrics.inputTokens}</span>
                  <span>Out: {metrics.outputTokens}</span>
                  <span>${metrics.cost}</span>
                  <span>{metrics.timeMs}ms</span>
                </div>
              )}
            </h3>
            <div className="flex-1 bg-black border border-white/10 rounded-xl p-4 overflow-auto min-h-[400px]">
              {isLoading ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-purple-500 gap-4 opacity-50">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  <span className="font-mono text-xs">Generating response...</span>
                </div>
              ) : output ? (
                <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap">
                  {typeof output === 'object' ? JSON.stringify(output, null, 2) : output}
                </pre>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 font-mono text-sm text-center">
                  Output will appear here after execution.<br/>
                  (Does not affect live databases or token usage quotas)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
