import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2 text-xs text-amber-800 flex items-center gap-2">
        <Info className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          <strong className="font-semibold">Research Platform:</strong> All visual/audio reconstructions and predictions are sample AI outputs. Not for medical diagnosis.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-900/5 via-indigo-900/5 to-purple-900/5 border border-blue-200/80 rounded-xl p-4 text-xs text-[#172B4D] mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
      <div className="flex items-start sm:items-center gap-3">
        <div className="p-2 bg-blue-600 text-white rounded-lg shrink-0">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <div className="font-semibold text-sm text-[#172B4D] flex items-center gap-2">
            Scientific Research Protocol Disclaimer
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-blue-100 text-blue-700 rounded font-semibold tracking-wider">
              Academic Tool
            </span>
          </div>
          <p className="text-slate-600 mt-0.5">
            BVA Decoder processes multimodal EEG, visual, and audio data for computational neuroscience research. This platform does not perform mind-reading or medical diagnosis. All benchmarks utilize sample dataset predictions.
          </p>
        </div>
      </div>
      <div className="text-right shrink-0">
        <span className="text-[11px] font-mono text-slate-500">
          FastAPI Backend Compliance: <span className="text-emerald-700 font-semibold">Ready</span>
        </span>
      </div>
    </div>
  );
};
