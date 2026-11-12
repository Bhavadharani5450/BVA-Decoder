import React, { useState } from 'react';
import { PageHeader } from '../../../shared/widgets/PageHeader';
import { DisclaimerBanner } from '../../../shared/widgets/DisclaimerBanner';
import { FileText, Download, Share2, Printer, Check, Sparkles } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const [downloadedFormat, setDownloadedFormat] = useState<string | null>(null);

  const triggerDownload = (format: string) => {
    setDownloadedFormat(format);
    setTimeout(() => setDownloadedFormat(null), 2500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Research Reports & Benchmark Exports"
        subtitle="Generate formatted scientific reports, export raw metrics JSON, or download publication figures."
        breadcrumbs={[{ label: 'BVA Decoder' }, { label: 'Reports' }]}
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerDownload('PDF Summary')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Download className="w-4 h-4" /> Download PDF Report
            </button>
            <button
              onClick={() => triggerDownload('JSON Data')}
              className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors flex items-center gap-1"
            >
              Export JSON
            </button>
          </div>
        }
      />

      <DisclaimerBanner />

      {downloadedFormat && (
        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-mono font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          Report exported successfully as {downloadedFormat}!
        </div>
      )}

      {/* Report Preview Document */}
      <div className="bg-white rounded-xl border border-[#E5EAF1] p-8 shadow-xs max-w-4xl mx-auto space-y-6">
        <div className="border-b border-slate-200 pb-4 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold text-blue-600 tracking-wider">
              BVA DECODER · OFFICIAL RESEARCH REPORT
            </span>
            <h1 className="text-xl font-bold text-[#172B4D] mt-1">
              Cross-Modal Conformer Decoding Benchmark Report
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Report ID: #REP_2026_901 | Date: 2026-11-12 | Principal Investigator: Prof. Marcus Thorne
            </p>
          </div>
          <div className="text-right">
            <span className="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded text-[11px] font-mono font-semibold">
              Peer-Review Ready
            </span>
          </div>
        </div>

        {/* Abstract */}
        <div>
          <h2 className="text-xs font-mono uppercase font-bold text-slate-400 mb-2">1. Executive Abstract</h2>
          <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200">
            This study evaluated spatial visual reconstruction accuracy from 64-channel occipital EEG signals using the BVA-CrossAttention-Conformer-v2 model architecture across 10,000 trials. The gated cross-attention mechanism achieved a macro classification accuracy of 89.4% and an F1-score of 87.9%.
          </p>
        </div>

        {/* Quantitative Performance Summary */}
        <div>
          <h2 className="text-xs font-mono uppercase font-bold text-slate-400 mb-2">2. Benchmark Metrics Summary</h2>
          <div className="grid grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
              <span className="text-slate-500 block text-[10px]">Accuracy</span>
              <span className="text-base font-bold text-blue-700">89.4 %</span>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
              <span className="text-slate-500 block text-[10px]">Precision</span>
              <span className="text-base font-bold text-blue-700">87.2 %</span>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
              <span className="text-slate-500 block text-[10px]">Recall</span>
              <span className="text-base font-bold text-blue-700">88.6 %</span>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
              <span className="text-slate-500 block text-[10px]">F1-Score</span>
              <span className="text-base font-bold text-blue-700">87.9 %</span>
            </div>
          </div>
        </div>

        {/* Institutional Signature & Disclaimer */}
        <div className="pt-6 border-t border-slate-200 flex justify-between items-center text-[11px] font-mono text-slate-400">
          <span>BVA Computational Neuroscience Platform</span>
          <span>FastAPI Backend Verified Claim Signature</span>
        </div>
      </div>
    </div>
  );
};
