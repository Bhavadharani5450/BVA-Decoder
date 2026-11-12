import React, { useState } from 'react';
import { Eye, Layers, Grid, Sliders, Sparkles, ZoomIn } from 'lucide-react';

export const VisualStimulusVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stimulus' | 'heatmap' | 'spatial_features'>('heatmap');
  const [showGridOverlay, setShowGridOverlay] = useState(true);

  // Sample natural visual stimuli image
  const stimulusUrl = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80';

  return (
    <div className="bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-[#172B4D] flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            Visual Stimulus & Feature Map Activation
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            Trial ID: #TR_10492 | Resolution: 512x512 px | Onset Duration: 500 ms
          </p>
        </div>

        {/* View Mode Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveTab('stimulus')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'stimulus' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Original Stimulus
          </button>
          <button
            onClick={() => setActiveTab('heatmap')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'heatmap' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Occipital Heatmap
          </button>
          <button
            onClick={() => setActiveTab('spatial_features')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'spatial_features' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ViT Patch Tokens
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Interactive Image Canvas */}
        <div className="md:col-span-7 relative bg-slate-900 rounded-xl overflow-hidden aspect-square border border-slate-800 shadow-inner group">
          <img
            src={stimulusUrl}
            alt="Visual Stimulus Scene"
            className={`w-full h-full object-cover transition-filter duration-300 ${
              activeTab === 'heatmap' ? 'brightness-75 contrast-125' : ''
            }`}
          />

          {/* Heatmap Overlay Simulation */}
          {activeTab === 'heatmap' && (
            <div className="absolute inset-0 bg-gradient-radial from-rose-500/50 via-amber-400/30 to-blue-600/10 mix-blend-overlay pointer-events-none" />
          )}

          {/* Grid Overlay */}
          {showGridOverlay && (
            <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-40" />
          )}

          {/* Controls Badge */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-slate-950/80 backdrop-blur-xs text-white text-[11px] font-mono px-3 py-1.5 rounded-lg border border-slate-800">
            <span>ViT-B/16 Patch Alignment</span>
            <button
              onClick={() => setShowGridOverlay(!showGridOverlay)}
              className="hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <Grid className="w-3.5 h-3.5" /> {showGridOverlay ? 'Grid On' : 'Grid Off'}
            </button>
          </div>
        </div>

        {/* Right: Feature Maps Breakdown */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200/80">
            <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider font-mono mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Primary Occipital Activation
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              Broad activation in V1 (Striate Cortex) & V4 visual pathways corresponding to high spatial frequency edge detection and mountain contour gradients.
            </p>
            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex justify-between text-slate-600">
                <span>Spatial Edge Density:</span>
                <span className="font-bold text-slate-900">0.842 rad</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Luminance Contrast:</span>
                <span className="font-bold text-slate-900">76.4 %</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Category Class Score:</span>
                <span className="font-bold text-blue-700">89.4% Alpine Landscape</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="text-xs font-semibold text-slate-800 mb-2">Extracted Deep Features</h4>
            <div className="grid grid-cols-4 gap-2 text-center font-mono text-[10px]">
              {['Layer 1 (64x64)', 'Layer 6 (32x32)', 'Layer 12 (16x16)', 'Penultimate (768d)'].map((l, i) => (
                <div key={i} className="p-2 bg-white rounded border border-slate-200">
                  <div className="font-bold text-slate-800">{l.split(' ')[0]}</div>
                  <div className="text-slate-400 text-[9px] mt-0.5">{l.split(' ')[1]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
