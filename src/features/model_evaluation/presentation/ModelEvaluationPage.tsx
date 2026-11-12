import React, { useState } from 'react';
import { PageHeader } from '../../../shared/widgets/PageHeader';
import { StatCard } from '../../../shared/widgets/UIComponents';
import { DisclaimerBanner } from '../../../shared/widgets/DisclaimerBanner';
import { MOCK_EVALUATION_METRICS, MOCK_MODELS } from '../../../data/mock/mockData';
import { BarChart3, Target, Award, Percent, Layers, Download, CheckCircle2 } from 'lucide-react';

export const ModelEvaluationPage: React.FC = () => {
  const [selectedModelId, setSelectedModelId] = useState('mdl_bva_conformer');
  const metrics = MOCK_EVALUATION_METRICS;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Model Performance & Evaluation Metrics"
        subtitle="Empirical performance evaluation, confusion matrix heatmaps, ROC curves, and cross-model benchmarks."
        breadcrumbs={[{ label: 'BVA Decoder' }, { label: 'Model Evaluation' }]}
        action={
          <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-2xs">
            <Download className="w-4 h-4" /> Export Evaluation Metrics CSV
          </button>
        }
      />

      <DisclaimerBanner />

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Classification Accuracy"
          value={metrics.accuracy}
          unit="%"
          icon={Target}
          trend="+3.2% vs Baseline"
          trendDirection="up"
          isDemo={true}
        />
        <StatCard
          title="Macro Precision Score"
          value={metrics.precision}
          unit="%"
          icon={Award}
          trend="+2.8%"
          trendDirection="up"
          isDemo={true}
        />
        <StatCard
          title="Macro Recall Rate"
          value={metrics.recall}
          unit="%"
          icon={Percent}
          trend="+1.9%"
          trendDirection="up"
          isDemo={true}
        />
        <StatCard
          title="Weighted F1-Score"
          value={metrics.f1Score}
          unit="%"
          icon={BarChart3}
          trend="+2.5%"
          trendDirection="up"
          isDemo={true}
        />
      </div>

      {/* Confusion Matrix & ROC Curves */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 5x5 Confusion Matrix Heatmap */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-[#172B4D] font-mono uppercase">
                5x5 Multi-Class Confusion Matrix (Sample Data)
              </h3>
              <p className="text-xs text-slate-500 font-mono">True Target Labels (Rows) vs AI Model Predicted Labels (Columns)</p>
            </div>
            <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold">
              N = 2,240 Trials
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-slate-400 text-left">True \ Pred</th>
                  {metrics.matrixLabels.map((lbl, idx) => (
                    <th key={idx} className="p-2 text-center text-slate-600 font-bold max-w-[90px] truncate">
                      {lbl.split(' ')[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {metrics.confusionMatrix.map((row, rIdx) => (
                  <tr key={rIdx}>
                    <td className="p-2 font-bold text-slate-700 bg-slate-50 truncate max-w-[120px]">
                      {metrics.matrixLabels[rIdx]}
                    </td>
                    {row.map((val, cIdx) => {
                      const isDiagonal = rIdx === cIdx;
                      const intensity = Math.min(100, Math.round((val / 450) * 100));
                      return (
                        <td
                          key={cIdx}
                          className={`p-3 text-center border border-slate-100 font-bold transition-transform hover:scale-105 cursor-pointer ${
                            isDiagonal
                              ? 'bg-blue-600 text-white shadow-2xs'
                              : val > 20
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-slate-50 text-slate-400'
                          }`}
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ROC & PR Curve Visualization */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-2xs">
          <h3 className="text-sm font-bold text-[#172B4D] font-mono uppercase mb-2">
            Receiver Operating Characteristic (ROC) Curve
          </h3>
          <p className="text-xs text-slate-500 font-mono mb-4">AUC = 0.942 | True Positive Rate vs False Positive Rate</p>

          <div className="relative h-64 bg-slate-950 rounded-lg p-4 flex items-end justify-between border border-slate-800">
            <svg className="w-full h-full overflow-visible">
              {/* Grid lines */}
              <line x1="0" y1="100%" x2="100%" y2="0" stroke="#334155" strokeDasharray="4 4" strokeWidth="1" />
              {/* ROC Curve SVG path */}
              <path
                d="M 0 200 Q 40 40, 100 20 T 300 0"
                fill="none"
                stroke="#2563EB"
                strokeWidth="3"
              />
            </svg>
            <div className="absolute top-3 right-3 text-[10px] font-mono bg-slate-900 text-emerald-400 px-2 py-1 rounded border border-slate-800">
              Optimal Threshold: τ = 0.42
            </div>
          </div>
        </div>
      </div>

      {/* Model Benchmark Comparison Table */}
      <div className="bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-2xs">
        <h3 className="text-sm font-bold text-[#172B4D] mb-4 font-mono uppercase">
          Model Registry Benchmark Comparison
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-700">
            <thead className="bg-slate-100 text-slate-600 font-mono uppercase text-[11px]">
              <tr>
                <th className="p-3">Model Name</th>
                <th className="p-3">Architecture</th>
                <th className="p-3">Parameters</th>
                <th className="p-3 text-center">Accuracy</th>
                <th className="p-3 text-center">F1-Score</th>
                <th className="p-3">Framework</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_MODELS.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-[#172B4D]">{m.name}</td>
                  <td className="p-3 font-mono text-slate-600">{m.architecture}</td>
                  <td className="p-3 font-mono">{m.parametersCount}</td>
                  <td className="p-3 text-center font-mono font-bold text-blue-700">{m.accuracy}%</td>
                  <td className="p-3 text-center font-mono font-bold text-slate-900">{m.f1Score}%</td>
                  <td className="p-3 font-mono text-slate-500">{m.framework}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-mono text-[10px] font-semibold">
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
