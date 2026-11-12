import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Play, Pause, BarChart2, Mic, Activity } from 'lucide-react';

export const AudioSpectrogramVisualizer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render synthetic Mel-Spectrogram Heatmap
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cols = 80;
    const rows = 40;
    const cellW = canvas.width / cols;
    const cellH = canvas.height / rows;

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        // Mel frequency intensity
        const freq = (rows - r) / rows;
        const time = c / cols;
        const val = Math.sin(time * 12 + freq * 8) * Math.cos(freq * 15) * 0.5 + 0.5;

        // Color map (Viridis cyan-yellow RAMP)
        const hue = 210 + val * 120; // 210 (blue) to 330 (pink/yellow)
        const lightness = 15 + val * 65;

        ctx.fillStyle = `hsl(${hue}, 85%, ${lightness}%)`;
        ctx.fillRect(c * cellW, r * cellH, cellW - 0.5, cellH - 0.5);
      }
    }
  }, []);

  return (
    <div className="bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-[#172B4D] flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-blue-600" />
            Audio Waveform & Mel-Spectrogram Analysis
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            Sample Rate: 44.1 kHz | FFT Window: 2048 pts | Mel Bins: 80 | Duration: 3.2 sec
          </p>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
            isPlaying ? 'bg-amber-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isPlaying ? 'Pause Audio' : 'Play Acoustic Stimulus'}
        </button>
      </div>

      {/* Spectrogram Heatmap Canvas */}
      <div className="relative bg-slate-950 rounded-lg p-2 overflow-hidden shadow-inner mb-4">
        <canvas
          ref={canvasRef}
          width={800}
          height={240}
          className="w-full h-[220px] block rounded"
        />
        <div className="absolute top-3 left-3 text-[10px] font-mono text-cyan-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
          20 kHz High Frequency Limit
        </div>
        <div className="absolute bottom-3 left-3 text-[10px] font-mono text-cyan-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
          0 Hz Baseline
        </div>
      </div>

      {/* Acoustic Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Fundamental F0</div>
          <div className="text-base font-bold font-mono text-slate-900 mt-0.5">142.8 Hz</div>
          <p className="text-[10px] text-slate-500 font-mono">Pitch Contour Stability</p>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">RMS Energy</div>
          <div className="text-base font-bold font-mono text-slate-900 mt-0.5">-14.2 dB</div>
          <p className="text-[10px] text-slate-500 font-mono">Acoustic Loudness</p>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">Spectral Centroid</div>
          <div className="text-base font-bold font-mono text-slate-900 mt-0.5">2,410 Hz</div>
          <p className="text-[10px] text-slate-500 font-mono">Brightness Index</p>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">MFCC Coefficients</div>
          <div className="text-base font-bold font-mono text-blue-700 mt-0.5">13 Bands</div>
          <p className="text-[10px] text-slate-500 font-mono">Timbre Signature</p>
        </div>
      </div>
    </div>
  );
};
