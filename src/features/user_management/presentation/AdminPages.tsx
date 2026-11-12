import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { PageHeader } from '../../../shared/widgets/PageHeader';
import { RoleGuard, StatusBadge, StatCard } from '../../../shared/widgets/UIComponents';
import { bvaRepository } from '../../../data/repositories/bvaRepository';
import { AppUser, Dataset, DatasetAccessRequest, ModelInfo, StorageItem, SystemServiceStatus, AuditLog, UserRole } from '../../../types';
import {
  Users,
  KeyRound,
  Boxes,
  Activity,
  Check,
  X,
  ShieldCheck,
  Cpu,
  HardDrive,
  AlertTriangle,
  FileText,
  Search,
  Filter,
  PlusCircle,
  Archive,
  RotateCcw,
  Download,
  Settings,
  Sliders,
  CheckCircle2,
  Trash2,
  Lock,
} from 'lucide-react';

// ==========================================
// 1. USER MANAGEMENT
// ==========================================
export const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // New User Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('researcher');
  const [affiliation, setAffiliation] = useState('Stanford Bio-X');
  const [department, setDepartment] = useState('Neural Signal Lab');

  useEffect(() => {
    bvaRepository.getUsers().then(setUsers);
  }, []);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      const updated = await bvaRepository.updateUserRole(userId, newRole);
      setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)));
      setAlertMessage({ text: `Updated role for ${updated.email} to ${newRole}`, type: 'success' });
    } catch (err: any) {
      setAlertMessage({ text: err.message || 'Role update failed', type: 'error' });
    }
  };

  const handleToggleStatus = async (userId: string) => {
    try {
      const updated = await bvaRepository.toggleUserStatus(userId);
      setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)));
      setAlertMessage({ text: `Set status for ${updated.email} to ${updated.status}`, type: 'success' });
    } catch (err: any) {
      setAlertMessage({ text: err.message || 'Status update failed', type: 'error' });
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    try {
      const newUser = await bvaRepository.createUser({
        name,
        email,
        role,
        affiliation,
        department,
        status: 'active',
      });
      setUsers((prev) => [newUser, ...prev]);
      setShowCreateModal(false);
      setName('');
      setEmail('');
      setAlertMessage({ text: `Created account for ${newUser.name} (${newUser.role})`, type: 'success' });
    } catch (err: any) {
      setAlertMessage({ text: err.message || 'User creation failed', type: 'error' });
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <RoleGuard requiredRoles={['admin']}>
      <div className="space-y-6">
        <PageHeader
          title="User Management & Role Privileges"
          subtitle="Manage platform researchers, assign roles, activate/deactivate accounts, and inspect authentication status."
          breadcrumbs={[{ label: 'BVA Decoder' }, { label: 'Admin' }, { label: 'User Management' }]}
          action={
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <PlusCircle className="w-4 h-4" /> Create New User Account
            </button>
          }
        />

        {alertMessage && (
          <div
            className={`p-3 rounded-xl border text-xs font-mono font-semibold flex items-center justify-between ${
              alertMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}
          >
            <span>{alertMessage.text}</span>
            <button onClick={() => setAlertMessage(null)} className="p-1 hover:opacity-75">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Filter Controls */}
        <div className="bg-white rounded-xl border border-[#E5EAF1] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search user name or email..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-mono text-slate-700"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin Only</option>
              <option value="researcher">Researcher Only</option>
              <option value="student">Student Only</option>
              <option value="viewer">Viewer Only</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-mono text-slate-700"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Accounts</option>
              <option value="inactive">Deactivated</option>
            </select>
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-700">
              <thead className="bg-slate-100 text-slate-600 font-mono uppercase text-[11px]">
                <tr>
                  <th className="p-3">User Name & Email</th>
                  <th className="p-3">Affiliation / Department</th>
                  <th className="p-3">Assigned Role</th>
                  <th className="p-3">Joined Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <div className="font-bold text-[#172B4D]">{u.name}</div>
                      <div className="text-slate-400 font-mono text-[11px]">{u.email}</div>
                    </td>
                    <td className="p-3 font-mono">
                      <div>{u.affiliation}</div>
                      <div className="text-slate-400 text-[10px]">{u.department}</div>
                    </td>
                    <td className="p-3">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                        className="px-2 py-1 text-xs font-mono font-bold capitalize border border-slate-300 rounded bg-white focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="admin">Admin</option>
                        <option value="researcher">Researcher</option>
                        <option value="student">Student</option>
                        <option value="viewer">Viewer</option>
                      </select>
                    </td>
                    <td className="p-3 font-mono text-slate-500">{u.createdAt}</td>
                    <td className="p-3">
                      <StatusBadge status={u.status} />
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleToggleStatus(u.id)}
                        className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                          u.status === 'active'
                            ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {u.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create User Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-[#172B4D]">Create New Research User Account</h3>
              <form onSubmit={handleCreateUser} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Maya Lin"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Institutional Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="maya.lin@stanford.edu"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Role Assignment *</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                  >
                    <option value="researcher">Researcher (Full Suite)</option>
                    <option value="student">Student (Academic Access)</option>
                    <option value="viewer">Viewer (Read-Only)</option>
                    <option value="admin">Admin (System Controls)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Affiliation</label>
                    <input
                      type="text"
                      value={affiliation}
                      onChange={(e) => setAffiliation(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
};

// ==========================================
// 2. ROLES AND PERMISSIONS MODULE
// ==========================================
export const RolesAndPermissionsPage: React.FC = () => {
  return (
    <RoleGuard requiredRoles={['admin']}>
      <div className="space-y-6">
        <PageHeader
          title="Role Permissions Matrix & Policy Audit"
          subtitle="Inspect authorization capabilities across Admin, Researcher, Student, and Viewer roles."
          breadcrumbs={[{ label: 'BVA Decoder' }, { label: 'Admin' }, { label: 'Roles & Permissions' }]}
        />

        <div className="bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-2xs">
          <h3 className="text-sm font-bold text-[#172B4D] font-mono uppercase mb-4">
            Platform Security Permission Matrix
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-slate-700 border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-600 uppercase text-[10px]">
                <tr>
                  <th className="p-3 text-left">Module Action / Feature</th>
                  <th className="p-3 text-center bg-purple-50 text-purple-900">Admin</th>
                  <th className="p-3 text-center bg-blue-50 text-blue-900">Researcher</th>
                  <th className="p-3 text-center bg-emerald-50 text-emerald-900">Student</th>
                  <th className="p-3 text-center bg-slate-100 text-slate-900">Viewer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { action: 'Create & Run Experiments', admin: true, researcher: true, student: true, viewer: false },
                  { action: 'Upload EEG / Visual / Audio Files', admin: true, researcher: true, student: true, viewer: false },
                  { action: 'Run Multimodal Fusion Pipeline', admin: true, researcher: true, student: true, viewer: false },
                  { action: 'Export Reports (PDF / CSV / JSON)', admin: true, researcher: true, student: true, viewer: true },
                  { action: 'Manage User Roles & Accounts', admin: true, researcher: false, student: false, viewer: false },
                  { action: 'Approve Dataset Access Requests', admin: true, researcher: false, student: false, viewer: false },
                  { action: 'Deploy & Validate AI Models', admin: true, researcher: false, student: false, viewer: false },
                  { action: 'Inspect Security Audit Logs', admin: true, researcher: false, student: false, viewer: false },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{row.action}</td>
                    <td className="p-3 text-center">{row.admin ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}</td>
                    <td className="p-3 text-center">{row.researcher ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}</td>
                    <td className="p-3 text-center">{row.student ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}</td>
                    <td className="p-3 text-center">{row.viewer ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-slate-300 mx-auto" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
};

// ==========================================
// 3. MODEL REGISTRY & MODEL VERSIONS
// ==========================================
export const ModelRegistryPage: React.FC = () => {
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // New Model Form
  const [name, setName] = useState('');
  const [version, setVersion] = useState('1.0.0');
  const [architecture, setArchitecture] = useState('Conformer Cross-Attention');
  const [framework, setFramework] = useState('PyTorch 2.3');

  useEffect(() => {
    bvaRepository.getModels().then(setModels);
  }, []);

  const handleRegisterModel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newMdl = await bvaRepository.registerModel({
      name,
      version,
      architecture,
      framework,
      parametersCount: '34.5 M',
      description: 'Custom registered neural model architecture.',
      status: 'validated',
      defaultModality: 'multimodal',
      accuracy: 88.5,
      f1Score: 87.2,
    });
    setModels((prev) => [newMdl, ...prev]);
    setShowRegisterModal(false);
    setName('');
  };

  return (
    <RoleGuard requiredRoles={['admin']}>
      <div className="space-y-6">
        <PageHeader
          title="Model Registry & Model Versions"
          subtitle="Track registered neural network models, parameter counts, PyTorch checkpoint references, and deployment status."
          breadcrumbs={[{ label: 'BVA Decoder' }, { label: 'Admin' }, { label: 'Model Registry' }]}
          action={
            <button
              onClick={() => setShowRegisterModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <PlusCircle className="w-4 h-4" /> Register New Neural Model
            </button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {models.map((m) => (
            <div key={m.id} className="bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-2xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider">{m.version}</span>
                  <h3 className="text-base font-bold text-[#172B4D] mt-0.5">{m.name}</h3>
                </div>
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[11px] font-mono font-bold uppercase">
                  {m.status}
                </span>
              </div>

              <p className="text-xs text-slate-500">{m.description}</p>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <span className="text-slate-400 text-[10px] block">Parameters</span>
                  <span className="font-bold text-slate-800">{m.parametersCount}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Framework</span>
                  <span className="font-bold text-slate-800">{m.framework}</span>
                </div>
              </div>

              {m.checkpointRef && (
                <div className="text-[11px] font-mono text-purple-700 bg-purple-50 p-2 rounded border border-purple-200 truncate">
                  Ref: {m.checkpointRef}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal */}
        {showRegisterModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
              <h3 className="text-base font-bold text-[#172B4D]">Register AI Model Checkpoint</h3>
              <form onSubmit={handleRegisterModel} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Model Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. BVA-Conformer-v3"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Version</label>
                    <input
                      type="text"
                      value={version}
                      onChange={(e) => setVersion(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Framework</label>
                    <input
                      type="text"
                      value={framework}
                      onChange={(e) => setFramework(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowRegisterModal(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Register Model
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
};

// ==========================================
// 4. DATASET ACCESS REQUESTS (ADMIN)
// ==========================================
export const AccessRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<DatasetAccessRequest[]>([]);

  useEffect(() => {
    bvaRepository.getAccessRequests().then(setRequests);
  }, []);

  const handleAction = async (id: string, status: 'approved' | 'rejected') => {
    const updated = await bvaRepository.updateAccessRequest(id, status, status === 'rejected' ? 'Did not satisfy IRB protocol criteria.' : 'Approved by Admin.');
    setRequests((prev) => prev.map((r) => (r.id === id ? updated : r)));
  };

  return (
    <RoleGuard requiredRoles={['admin']}>
      <div className="space-y-6">
        <PageHeader
          title="Dataset Access Requests"
          subtitle="Review and approve institutional research access requests for restricted datasets."
          breadcrumbs={[{ label: 'BVA Decoder' }, { label: 'Admin' }, { label: 'Access Requests' }]}
        />

        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req.id} className="bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-2xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-[#172B4D]">{req.userName} ({req.userEmail})</span>
                  <div className="text-xs text-blue-700 font-mono font-semibold mt-0.5">
                    Requested Access to: {req.datasetName}
                  </div>
                </div>
                <StatusBadge status={req.status} />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg text-xs font-mono text-slate-700">
                Rationale: "{req.rationale}"
              </div>

              {req.status === 'pending' && (
                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleAction(req.id, 'rejected')}
                    className="px-3 py-1.5 bg-rose-50 text-rose-700 rounded-lg text-xs font-semibold hover:bg-rose-100 transition-colors flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Reject Request
                  </button>
                  <button
                    onClick={() => handleAction(req.id, 'approved')}
                    className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve Access
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </RoleGuard>
  );
};

// ==========================================
// 5. SYSTEM HEALTH, FAILED JOBS, AUDIT LOGS, STORAGE & SETTINGS
// ==========================================
export const SystemHealthPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [storageItems, setStorageItems] = useState<StorageItem[]>([]);
  const [systemServices, setSystemServices] = useState<SystemServiceStatus[]>([]);

  useEffect(() => {
    bvaRepository.getAuditLogs().then(setLogs);
    bvaRepository.getStorageItems().then(setStorageItems);
    bvaRepository.getSystemServices().then(setSystemServices);
  }, []);

  return (
    <RoleGuard requiredRoles={['admin']}>
      <div className="space-y-6">
        <PageHeader
          title="System Health, Storage & Audit Logs"
          subtitle="Real-time GPU cluster utilization, service health, storage allocation, and immutable audit logs."
          breadcrumbs={[{ label: 'BVA Decoder' }, { label: 'Admin' }, { label: 'System Telemetry' }]}
        />

        {/* System Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {systemServices.map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">{s.name.split(' ')[0]}</span>
                <span className={`w-2 h-2 rounded-full ${s.status === 'healthy' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              </div>
              <div className="text-sm font-bold text-slate-900 truncate">{s.name}</div>
              <div className="text-[11px] font-mono text-slate-500 mt-1">{s.latencyMs} ms latency</div>
            </div>
          ))}
        </div>

        {/* Audit Logs Table */}
        <div className="bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#172B4D] font-mono uppercase flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" /> Immutable Security Audit Trail
            </h3>
            <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-mono font-semibold flex items-center gap-1">
              <Download className="w-3.5 h-3.5" /> Export Audit CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono text-left text-slate-700">
              <thead className="bg-slate-100 text-slate-600 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">User & Role</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Resource Target</th>
                  <th className="p-3">IP Address</th>
                  <th className="p-3">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="p-3 text-slate-500">{log.timestamp}</td>
                    <td className="p-3 font-bold text-slate-900">{log.userName} ({log.userRole})</td>
                    <td className="p-3 text-blue-700 font-bold">{log.action}</td>
                    <td className="p-3 font-bold">{log.resource}</td>
                    <td className="p-3 text-slate-400">{log.ipAddress}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        log.outcome === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {log.outcome}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
};
