import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { PageHeader } from '../../../shared/widgets/PageHeader';
import { User, Key, Shield, Building, Mail, Check, Copy } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, currentRole } = useAuth();
  const [copiedKey, setCopiedKey] = useState(false);
  const mockApiKey = 'bva_live_sk_904820194812039481029348102938';

  const copyKey = () => {
    navigator.clipboard.writeText(mockApiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="User Profile & API Credentials"
        subtitle="Manage academic affiliation, API tokens for Python FastAPI integration, and research notifications."
        breadcrumbs={[{ label: 'BVA Decoder' }, { label: 'Profile' }]}
      />

      <div className="bg-white rounded-xl border border-[#E5EAF1] p-6 shadow-2xs space-y-6">
        {/* Profile Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-16 h-16 rounded-xl object-cover ring-2 ring-blue-500/20"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#172B4D]">{currentUser.name}</h2>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-mono text-[10px] font-bold uppercase">
                {currentRole}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{currentUser.email}</p>
            <p className="text-xs text-slate-600 mt-1">{currentUser.affiliation} · {currentUser.department}</p>
          </div>
        </div>

        {/* API Token Key Section */}
        <div>
          <h3 className="text-xs font-mono uppercase font-bold text-slate-400 mb-2 flex items-center gap-1.5">
            <Key className="w-4 h-4 text-blue-600" />
            FastAPI Personal Access Token (Bearer Header)
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Use this JWT token to authenticate Python scripts or PyTorch training jobs submitting signals to the BVA backend API.
          </p>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={mockApiKey}
              className="flex-1 px-3 py-2 text-xs font-mono bg-slate-900 text-emerald-400 rounded-lg border border-slate-800 select-all"
            />
            <button
              onClick={copyKey}
              className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copiedKey ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {copiedKey ? 'Copied' : 'Copy Token'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
