import React, { useState } from 'react';
import { GitMerge, Layers, Cpu, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

export const MultimodalFusionVisualizer: React.FC = () => {
  const [fusionType, setFusionType] = useState<'early' | 'late' | 'cross_attention'>('cross_attention');

  return (
    <div className="bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-[#172B4D] flex items-center gap-2">
            <GitMerge className="w-5 h-5 text-blue-600" />
            Multimodal Feature Alignment & Cross-Attention Fusion
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            Modality Alignment: [EEG 64-Ch] ↔ [ViT Patch Tokens] ↔ [Audio Mel Spectrogram]
          </p>
        </div>

        {/* Fusion Architecture Configurator Buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-mono">
          <button
            onClick={() => setFusionType('early')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              fusionType === 'early' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600'
            }`}
          >
            Early Concatenation
          </button>
          <button
            onClick={() => setFusionType('late')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              fusionType === 'late' ? 'bg-white text-slate-900 font-bold shadow-2xs' : 'text-slate-600'
            }`}
          >
            Late Ensemble
          </button>
          <button
            onClick={() => setFusionType('cross_attention')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              fusionType === 'cross_attention' ? 'bg-blue-600 text-white font-bold shadow-2xs' : 'text-slate-600'
            }`}
          >
            Gated Cross-Attention
          </button>
        </div>
      </div>

      {/* Cross-Modality Architecture Diagram */}
      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 mb-6">
        <h3 className="text-xs font-mono uppercase text-slate-400 font-bold mb-4">
          Pipeline Flow: {fusionType === 'cross_attention' ? 'Cross-Attention Transformer (Recommended)' : fusionType}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-center">
          {/* Stream 1: EEG */}
          <div className="p-3 bg-white rounded-lg border border-blue-200 shadow-2xs">
            <div className="text-[10px] font-mono text-blue-600 font-bold uppercase">Modality 1</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">64-Ch EEG Signals</div>
            <div className="text-[10px] font-mono text-slate-500 mt-1">Conformer Spatial Conv (256d)</div>
          </div>

          {/* Stream 2: Visual */}
          <div className="p-3 bg-white rounded-lg border border-indigo-200 shadow-2xs">
            <div className="text-[10px] font-mono text-indigo-600 font-bold uppercase">Modality 2</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">Visual Stimulus</div>
            <div className="text-[10px] font-mono text-slate-500 mt-1">ViT-B/16 Patch Embed (768d)</div>
          </div>

          {/* Stream 3: Audio */}
          <div className="p-3 bg-white rounded-lg border border-purple-200 shadow-2xs">
            <div className="text-[10px] font-mono text-purple-600 font-bold uppercase">Modality 3</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">Audio Spectrogram</div>
            <div className="text-[10px] font-mono text-slate-500 mt-1">1D ResNeXt Mel-Filter (128d)</div>
          </div>

          {/* Fusion Block */}
          <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-lg shadow-md">
            <div className="text-[10px] font-mono text-blue-200 font-bold uppercase">Joint Embedding</div>
            <div className="text-sm font-bold mt-0.5">Joint Latent Space</div>
            <div className="text-[10px] font-mono text-blue-100 mt-1">1024-Dim Unified Tensor</div>
          </div>
        </div>
      </div>

      {/* Cross-Attention Matrix Heatmap Simulation */}
      <div>
        <h4 className="text-xs font-bold text-slate-800 mb-2 font-mono flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-500" />
          Modality Attention Score Matrix (EEG ↔ Visual ↔ Audio)
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono text-slate-700 border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="p-2 text-left">Feature Query \ Key</th>
                <th className="p-2 text-center">EEG Occipital (O1/O2)</th>
                <th className="p-2 text-center">EEG Temporal (T7/T8)</th>
                <th className="p-2 text-center">Visual Contour (ViT)</th>
                <th className="p-2 text-center">Audio Envelope (F0)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-2 font-bold bg-slate-50">EEG Occipital (O1/O2)</td>
                <td className="p-2 text-center bg-blue-100 font-bold text-blue-900">0.924</td>
                <td className="p-2 text-center bg-blue-50">0.310</td>
                <td className="p-2 text-center bg-blue-200 font-bold text-blue-950">0.865</td>
                <td className="p-2 text-center bg-slate-50">0.142</td>
              </tr>
              <tr>
                <td className="p-2 font-bold bg-slate-50">EEG Temporal (T7/T8)</td>
                <td className="p-2 text-center bg-blue-50">0.280</td>
                <td className="p-2 text-center bg-blue-100 font-bold text-blue-900">0.890</td>
                <td className="p-2 text-center bg-slate-50">0.190</td>
                <td className="p-2 text-center bg-purple-200 font-bold text-purple-950">0.812</td>
              </tr>
              <tr>
                <td className="p-2 font-bold bg-slate-50">Visual Contour (ViT)</td>
                <td className="p-2 text-center bg-blue-200 font-bold text-blue-950">0.871</td>
                <td className="p-2 text-center bg-slate-50">0.165</td>
                <td className="p-2 text-center bg-blue-100 font-bold text-blue-900">0.950</td>
                <td className="p-2 text-center bg-slate-50">0.205</td>
              </tr>
              <tr>
                <td className="p-2 font-bold bg-slate-50">Audio Envelope (F0)</td>
                <td className="p-2 text-center bg-slate-50">0.125</td>
                <td className="p-2 text-center bg-purple-200 font-bold text-purple-950">0.798</td>
                <td className="p-2 text-center bg-slate-50">0.210</td>
                <td className="p-2 text-center bg-purple-100 font-bold text-purple-900">0.915</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
