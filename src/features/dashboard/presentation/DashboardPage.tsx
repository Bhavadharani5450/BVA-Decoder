import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '../../../context/NavigationContext';
import { PageHeader } from '../../../shared/widgets/PageHeader';
import { StatCard, StatusBadge } from '../../../shared/widgets/UIComponents';
import { DisclaimerBanner } from '../../../shared/widgets/DisclaimerBanner';
import { MOCK_EXPERIMENTS, MOCK_DATASETS } from '../../../data/mock/mockData';
import {
  FlaskConical,
  Database,
  Boxes,
  Activity,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  Sparkles,
  GitMerge,
  BarChart3,
  ShieldCheck,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { currentRole, currentUser } = useAuth();
  const { setActiveTab } = useNavigation();

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${currentRole.toUpperCase()} Research Dashboard`}
        subtitle={`Welcome back, ${currentUser.name}. ${currentUser.affiliation}`}
        action={
          currentRole !== 'viewer' ? (
            <button
              onClick={() => setActiveTab('new_experiment')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <PlusCircle className="w-4 h-4" /> New Multimodal Experiment
            </button>
          ) : undefined
        }
      />

      <DisclaimerBanner />

      {/* Role-Specific Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Experiments"
          value={MOCK_EXPERIMENTS.length}
          icon={FlaskConical}
          trend="+2 this week"
          trendDirection="up"
          description="Active & completed trials"
        />
        <StatCard
          title="Permitted Datasets"
          value={MOCK_DATASETS.length}
          icon={Database}
          trend="4 Total benchmark repositories"
          trendDirection="neutral"
          description="10,000+ EEG/AV trials"
        />
        <StatCard
          title="AI Models Available"
          value={4}
          icon={Boxes}
          trend="PyTorch 2.3 Ready"
          trendDirection="up"
          description="Conformer & Cross-Attention"
        />
        <StatCard
          title="Mean Decoding Accuracy"
          value="89.4"
          unit="%"
          icon={Activity}
          trend="+3.2% vs baseline"
          trendDirection="up"
          description="Sample Benchmark Model"
        />
      </div>

      {/* Main Grid: Modality Distribution & Recent Experiments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Modality Distribution */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-2xs">
          <h2 className="text-sm font-bold text-[#172B4D] mb-4 font-mono uppercase">
            Modality Signal Distribution
          </h2>
          <div className="space-y-3 font-mono text-xs">
            {[
              { modality: 'Multimodal (EEG + AV)', pct: '48 %', color: 'bg-blue-600' },
              { modality: '64-Ch EEG Signals', pct: '28 %', color: 'bg-indigo-500' },
              { modality: 'Visual Stimulus (ViT)', pct: '14 %', color: 'bg-cyan-500' },
              { modality: 'Audio Spectrograms', pct: '10 %', color: 'bg-purple-500' },
            ].map((m, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-slate-700 mb-1">
                  <span>{m.modality}</span>
                  <span className="font-bold">{m.pct}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${m.color} rounded-full`} style={{ width: m.pct }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <span className="font-bold text-slate-900 block mb-1">FastAPI Backend Target</span>
            <p className="text-slate-500 text-[11px] font-mono">
              PyTorch 2.3 + Torchaudio + MNE-Python pipeline container hosted on Cloud Run.
            </p>
          </div>
        </div>

        {/* Recent Experiments Feed */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-[#172B4D] font-mono uppercase">
              Recent Experiments & Trial Activity
            </h2>
            <button
              onClick={() => setActiveTab('experiments')}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {MOCK_EXPERIMENTS.map((exp) => (
              <div
                key={exp.id}
                onClick={() => setActiveTab('predictions')}
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-slate-50/50 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#172B4D]">{exp.title}</span>
                    <StatusBadge status={exp.status} />
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">{exp.description}</p>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 mt-2">
                    <span>{exp.datasetName}</span>
                    <span>·</span>
                    <span>{exp.modelName}</span>
                    <span>·</span>
                    <span>{exp.createdAt}</span>
                  </div>
                </div>

                <div className="shrink-0 text-right font-mono text-xs">
                  {exp.metrics && (
                    <div className="font-bold text-blue-700">
                      {exp.metrics.accuracy}% Acc
                    </div>
                  )}
                  {exp.progressPercent && (
                    <div className="text-amber-600 font-bold">
                      {exp.progressPercent}% Running
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
