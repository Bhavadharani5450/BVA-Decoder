import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { PageHeader } from '../../../shared/widgets/PageHeader';
import { StatusBadge } from '../../../shared/widgets/UIComponents';
import { MOCK_DATASETS } from '../../../data/mock/mockData';
import { Dataset } from '../../../types';
import { Database, Search, Filter, Lock, Unlock, KeyRound, ExternalLink } from 'lucide-react';

export const DatasetLibraryPage: React.FC = () => {
  const { currentRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModality, setSelectedModality] = useState<string>('all');
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [requestRationale, setRequestRationale] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const filteredDatasets = MOCK_DATASETS.filter((ds) => {
    const matchesSearch =
      ds.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ds.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ds.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesModality =
      selectedModality === 'all' || ds.modalities.includes(selectedModality as any);

    return matchesSearch && matchesModality;
  });

  const handleRequestAccess = () => {
    setRequestSubmitted(true);
    setTimeout(() => {
      setShowAccessModal(false);
      setRequestSubmitted(false);
      setRequestRationale('');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dataset Library & Benchmark Repositories"
        subtitle="Explore high-density 64-128 channel EEG recordings paired with synchronized visual and audio stimuli."
        breadcrumbs={[{ label: 'BVA Decoder' }, { label: 'Dataset Library' }]}
      />

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl border border-[#E5EAF1] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search dataset name, author, DOI..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedModality}
            onChange={(e) => setSelectedModality(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-mono text-slate-700"
          >
            <option value="all">All Modalities</option>
            <option value="eeg">EEG Only</option>
            <option value="visual">Visual Stimuli</option>
            <option value="audio">Audio Stimuli</option>
            <option value="multimodal">Tri-Modal Synchronized</option>
          </select>
        </div>
      </div>

      {/* Dataset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDatasets.map((ds) => (
          <div
            key={ds.id}
            className="bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-mono text-blue-600 uppercase font-bold tracking-wider">
                    {ds.name}
                  </span>
                  <h3 className="text-sm font-bold text-[#172B4D] mt-0.5">{ds.title}</h3>
                </div>
                <StatusBadge status={ds.accessStatus} />
              </div>

              <p className="text-xs text-slate-500 mb-4 line-clamp-2">{ds.description}</p>

              <div className="grid grid-cols-3 gap-2 font-mono text-[11px] p-3 bg-slate-50 rounded-lg border border-slate-100 mb-4">
                <div>
                  <span className="text-slate-400 block text-[10px]">Channels</span>
                  <span className="font-bold text-slate-800">{ds.channelCount} Ch</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Sampling Rate</span>
                  <span className="font-bold text-slate-800">{ds.samplingRateHz} Hz</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Subjects</span>
                  <span className="font-bold text-slate-800">{ds.subjectCount} Persons</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="font-mono text-slate-400 text-[10px]">DOI: {ds.doi}</span>
              {ds.accessStatus === 'restricted' ? (
                <button
                  onClick={() => {
                    setSelectedDataset(ds);
                    setShowAccessModal(true);
                  }}
                  className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-semibold hover:bg-amber-600 transition-colors flex items-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5" /> Request Access
                </button>
              ) : (
                <button
                  onClick={() => setSelectedDataset(ds)}
                  className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  Inspect Dataset <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Request Access Modal */}
      {showAccessModal && selectedDataset && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-base font-bold text-[#172B4D] mb-1">
              Request Dataset Access: {selectedDataset.name}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Restricted datasets require research rationale verification under institutional IRB protocols.
            </p>

            {requestSubmitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-mono font-semibold text-center">
                Access Request Submitted to Platform Admin!
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Research Rationale & Intended Analysis *
                  </label>
                  <textarea
                    rows={4}
                    value={requestRationale}
                    onChange={(e) => setRequestRationale(e.target.value)}
                    placeholder="Describe your research project, funding grant, or academic course requirement..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setShowAccessModal(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRequestAccess}
                    disabled={!requestRationale}
                    className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-40"
                  >
                    Submit Access Request
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
