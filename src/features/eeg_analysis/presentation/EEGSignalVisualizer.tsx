import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RefreshCw, Sliders, Activity, Zap, Eye, Download } from 'lucide-react';

export const EEGSignalVisualizer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [filterEnabled, setFilterEnabled] = useState(true);
  const [gain, setGain] = useState<number>(1.0);
  const [selectedChannel, setSelectedChannel] = useState<string>('O1 (Occipital)');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);

  const channelNames = [
    'Fp1', 'Fp2', 'F3', 'F4', 'C3', 'C4', 'P3', 'P4',
    'O1', 'O2', 'Fz', 'Cz', 'Pz', 'T7', 'T8', 'Oz'
  ];

  // Draw EEG multi-channel canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let offset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.strokeStyle = '#E5EAF1';
      ctx.lineWidth = 1;
      const stepX = 40;
      const stepY = 30;

      for (let x = 0; x < canvas.width; x += stepX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += stepY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Channel heights
      const channelHeight = canvas.height / channelNames.length;

      channelNames.forEach((ch, idx) => {
        const centerY = idx * channelHeight + channelHeight / 2;

        // Label
        ctx.fillStyle = '#64748B';
        ctx.font = '10px JetBrains Mono';
        ctx.fillText(ch, 8, centerY + 3);

        // Baseline
        ctx.strokeStyle = '#F1F5F9';
        ctx.beginPath();
        ctx.moveTo(40, centerY);
        ctx.lineTo(canvas.width, centerY);
        ctx.stroke();

        // Waveform calculation
        ctx.beginPath();
        ctx.strokeStyle = idx % 2 === 0 ? '#2563EB' : '#4F46E5';
        ctx.lineWidth = 1.5;

        const freqBase = 8 + (idx % 5) * 2.5; // 8 to 18 Hz (Alpha/Beta band)

        for (let x = 40; x < canvas.width; x += 2) {
          const t = (x + offset) * 0.05;
          // Synthetic EEG signal: Alpha (10Hz) + Beta noise + Blink artifacts if filter disabled
          let signal = Math.sin(t * freqBase * 0.1) * 12 * gain;
          signal += Math.cos(t * (freqBase * 2) * 0.08) * 5 * gain;

          if (!filterEnabled && (x + offset) % 300 < 20) {
            // EOG artifact spike
            signal += 35 * Math.sin((x % 20) * 0.3);
          }

          const y = centerY + signal;
          if (x === 40) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      if (isPlaying) {
        offset += 3;
      }
      animRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, filterEnabled, gain]);

  return (
    <div className="bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-2xs">
      {/* Visualizer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-[#172B4D] flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            16-Channel High-Density EEG Signal Stream
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            Sampling Rate: 1000 Hz | Montage: International 10-20 | Impedance: &lt; 5 kΩ
          </p>
        </div>

        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isPlaying
                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? 'Pause Sweep' : 'Resume Live'}
          </button>

          <button
            onClick={() => setFilterEnabled(!filterEnabled)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              filterEnabled
                ? 'bg-blue-50 text-blue-700 border-blue-200 font-semibold'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            {filterEnabled ? 'Bandpass 1-40Hz (On)' : 'Raw Unfiltered'}
          </button>

          <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg text-xs">
            <span className="text-slate-500 font-mono text-[11px]">Gain:</span>
            <button
              onClick={() => setGain((g) => Math.max(0.5, g - 0.25))}
              className="px-1.5 py-0.5 bg-white rounded border border-slate-200 text-slate-700 font-bold hover:bg-slate-50"
            >
              -
            </button>
            <span className="font-mono w-8 text-center text-slate-800 font-semibold">{gain.toFixed(2)}x</span>
            <button
              onClick={() => setGain((g) => Math.min(3.0, g + 0.25))}
              className="px-1.5 py-0.5 bg-white rounded border border-slate-200 text-slate-700 font-bold hover:bg-slate-50"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="relative bg-slate-950 rounded-lg p-2 overflow-hidden shadow-inner">
        <canvas
          ref={canvasRef}
          width={800}
          height={420}
          className="w-full h-[380px] block cursor-crosshair"
        />
        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2.5 py-1 rounded border border-slate-800">
          SNR: <span className="text-emerald-400 font-semibold">18.5 dB</span> | Notch: 50Hz
        </div>
      </div>

      {/* Power Spectral Density Breakdown */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-5 gap-3 pt-4 border-t border-slate-100">
        {[
          { band: 'Delta (0.5-4 Hz)', power: '12.4 %', color: 'bg-purple-500', note: 'Deep Slow Wave' },
          { band: 'Theta (4-8 Hz)', power: '18.1 %', color: 'bg-indigo-500', note: 'Drowsiness/Memory' },
          { band: 'Alpha (8-13 Hz)', power: '42.6 %', color: 'bg-blue-500', note: 'Occipital Visual Rest' },
          { band: 'Beta (13-30 Hz)', power: '21.5 %', color: 'bg-cyan-500', note: 'Active Processing' },
          { band: 'Gamma (30-80 Hz)', power: '5.4 %', color: 'bg-emerald-500', note: 'Cross-Modal Binding' },
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 mb-1">
              <span>{item.band.split(' ')[0]}</span>
              <span className="font-bold text-slate-900">{item.power}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-1">
              <div
                className={`h-full ${item.color} rounded-full`}
                style={{ width: item.power }}
              />
            </div>
            <p className="text-[10px] text-slate-500 font-mono truncate">{item.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
