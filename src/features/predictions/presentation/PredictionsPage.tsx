import React from 'react';
import { PageHeader } from '../../../shared/widgets/PageHeader';
import { DisclaimerBanner } from '../../../shared/widgets/DisclaimerBanner';
import { MOCK_PREDICTION } from '../../../data/mock/mockData';
import { Sparkles, ArrowRight, Activity, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export const PredictionsPage: React.FC = () => {
  const pred = MOCK_PREDICTION;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Multimodal Brain Decoding Predictions"
        subtitle="Visualizing AI model reconstruction outputs decoded directly from occipital and temporal EEG signals."
        breadcrumbs={[{ label: 'BVA Decoder' }, { label: 'Predictions' }]}
      />

      <DisclaimerBanner />

      {/* Target vs Decoded Visual Comparison */}
      <div className="bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-2xs">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <h2 className="text-sm font-bold text-[#172B4D] font-mono uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            Visual Stimulus Reconstruction (Ground Truth vs Brain Decoded)
          </h2>
          <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Confidence Score: {(pred.confidenceScore * 100).toFixed(1)}%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Ground Truth Image */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-slate-800">Ground Truth Stimulus</span>
              <span className="text-slate-400">Target Label: {pred.targetLabel}</span>
            </div>
            <div className="relative rounded-xl overflow-hidden aspect-video border border-slate-200 shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80"
                alt="Ground Truth Visual"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                Original Image
              </div>
            </div>
          </div>

          {/* AI Decoded Reconstruction */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-blue-700">AI Decoded Reconstruction</span>
              <span className="text-slate-400">Model: BVA-Conformer-v2</span>
            </div>
            <div className="relative rounded-xl overflow-hidden aspect-video border border-blue-300 shadow-md">
              <img
                src={pred.reconstructedImageUrl}
                alt="Brain Decoded Visual"
                className="w-full h-full object-cover brightness-95 contrast-110 blur-[0.5px]"
              />
              <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                EEG Decoded Output
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Probabilities Bar Chart */}
      <div className="bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-2xs">
        <h3 className="text-sm font-bold text-[#172B4D] font-mono uppercase mb-4">
          Top-5 Category Classification Probabilities
        </h3>

        <div className="space-y-3 font-mono text-xs">
          {pred.topProbabilities.map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-slate-700 mb-1">
                <span className={idx === 0 ? 'font-bold text-blue-700' : ''}>{item.class}</span>
                <span className="font-bold">{item.score}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${idx === 0 ? 'bg-blue-600' : 'bg-slate-300'}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
