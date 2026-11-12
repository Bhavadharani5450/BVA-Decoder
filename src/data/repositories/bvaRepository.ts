import {
  Dataset,
  DatasetAccessRequest,
  Experiment,
  ModelInfo,
  Prediction,
  AuditLog,
  NotificationItem,
  UserRole,
  AppUser,
  StorageItem,
  SystemServiceStatus,
} from '../../types';
import {
  MOCK_DATASETS,
  MOCK_EXPERIMENTS,
  MOCK_MODELS,
  MOCK_PREDICTION,
  MOCK_ACCESS_REQUESTS,
  MOCK_AUDIT_LOGS,
  MOCK_NOTIFICATIONS,
  MOCK_USERS,
  MOCK_STORAGE_ITEMS,
  MOCK_SYSTEM_SERVICES,
} from '../mock/mockData';

export class MockBVARepository {
  private users: AppUser[] = Object.values(MOCK_USERS);
  private datasets: Dataset[] = [...MOCK_DATASETS];
  private experiments: Experiment[] = [...MOCK_EXPERIMENTS];
  private models: ModelInfo[] = [...MOCK_MODELS];
  private accessRequests: DatasetAccessRequest[] = [...MOCK_ACCESS_REQUESTS];
  private notifications: NotificationItem[] = [...MOCK_NOTIFICATIONS];
  private auditLogs: AuditLog[] = [...MOCK_AUDIT_LOGS];
  private storageItems: StorageItem[] = [...MOCK_STORAGE_ITEMS];
  private systemServices: SystemServiceStatus[] = [...MOCK_SYSTEM_SERVICES];

  // User Management
  async getUsers(): Promise<AppUser[]> {
    return [...this.users];
  }

  async createUser(userData: Omit<AppUser, 'id' | 'createdAt'>): Promise<AppUser> {
    const newUser: AppUser = {
      ...userData,
      id: `user_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.users.unshift(newUser);
    this.logAuditAction(userData.name, userData.role, 'CREATE_USER', `Created user account ${newUser.email}`);
    return newUser;
  }

  async updateUserRole(userId: string, newRole: UserRole): Promise<AppUser> {
    const idx = this.users.findIndex((u) => u.id === userId);
    if (idx === -1) throw new Error('User not found');
    
    // Prevent disabling or changing role of last active Admin
    const activeAdmins = this.users.filter((u) => u.role === 'admin' && u.status === 'active');
    if (this.users[idx].role === 'admin' && newRole !== 'admin' && activeAdmins.length <= 1) {
      throw new Error('Action blocked: Cannot change role of the last active Admin.');
    }

    this.users[idx] = { ...this.users[idx], role: newRole };
    this.logAuditAction('Dr. Elena Rostova', 'admin', 'UPDATE_ROLE', `Updated role for ${this.users[idx].email} to ${newRole}`);
    return this.users[idx];
  }

  async toggleUserStatus(userId: string): Promise<AppUser> {
    const idx = this.users.findIndex((u) => u.id === userId);
    if (idx === -1) throw new Error('User not found');

    const user = this.users[idx];
    const newStatus = user.status === 'active' ? 'inactive' : 'active';

    const activeAdmins = this.users.filter((u) => u.role === 'admin' && u.status === 'active');
    if (user.role === 'admin' && newStatus === 'inactive' && activeAdmins.length <= 1) {
      throw new Error('Action blocked: Cannot deactivate the last active Admin account.');
    }

    this.users[idx] = { ...user, status: newStatus };
    this.logAuditAction('Dr. Elena Rostova', 'admin', 'TOGGLE_USER_STATUS', `Set status for ${user.email} to ${newStatus}`);
    return this.users[idx];
  }

  // Datasets
  async getDatasets(): Promise<Dataset[]> {
    return [...this.datasets];
  }

  async registerDataset(data: Omit<Dataset, 'id' | 'createdAt'>): Promise<Dataset> {
    const newDataset: Dataset = {
      ...data,
      id: `ds_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      isArchived: false,
    };
    this.datasets.unshift(newDataset);
    this.logAuditAction('Admin', 'admin', 'REGISTER_DATASET', `Registered dataset ${newDataset.name}`);
    return newDataset;
  }

  async toggleArchiveDataset(id: string): Promise<Dataset> {
    const idx = this.datasets.findIndex((d) => d.id === id);
    if (idx === -1) throw new Error('Dataset not found');
    this.datasets[idx] = { ...this.datasets[idx], isArchived: !this.datasets[idx].isArchived };
    return this.datasets[idx];
  }

  // Access Requests
  async getAccessRequests(): Promise<DatasetAccessRequest[]> {
    return [...this.accessRequests];
  }

  async updateAccessRequest(id: string, status: 'approved' | 'rejected', notes?: string): Promise<DatasetAccessRequest> {
    const idx = this.accessRequests.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error('Request not found');
    this.accessRequests[idx] = {
      ...this.accessRequests[idx],
      status,
      reviewerNotes: notes,
      decisionDate: new Date().toISOString().split('T')[0],
      reviewerName: 'Dr. Elena Rostova',
    };
    this.logAuditAction('Dr. Elena Rostova', 'admin', 'DATASET_ACCESS_DECISION', `${status.toUpperCase()} access for ${this.accessRequests[idx].userName}`);
    return this.accessRequests[idx];
  }

  // Experiments
  async getExperiments(): Promise<Experiment[]> {
    return [...this.experiments];
  }

  async createExperiment(experimentData: Partial<Experiment>): Promise<Experiment> {
    const newExp: Experiment = {
      id: `exp_bva_${Math.floor(100 + Math.random() * 900)}`,
      title: experimentData.title || 'Untitled Multimodal Decoding Experiment',
      description: experimentData.description || 'Custom research pipeline run.',
      datasetId: experimentData.datasetId || 'ds_bva_10k',
      datasetName: experimentData.datasetName || 'BVA-BrainImage-10k',
      userId: experimentData.userId || 'user_researcher_01',
      userName: experimentData.userName || 'Prof. Marcus Thorne',
      userRole: experimentData.userRole || 'researcher',
      modalities: experimentData.modalities || ['eeg', 'visual', 'multimodal'],
      status: 'queued',
      targetTask: experimentData.targetTask || 'Visual Signal Decoding',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      eegChannels: experimentData.eegChannels || 64,
      eegSampleRate: experimentData.eegSampleRate || 1000,
      audioSampleRate: experimentData.audioSampleRate || 44100,
      visualResolution: experimentData.visualResolution || '512x512',
      modelName: experimentData.modelName || 'BVA-CrossAttention-Conformer-v2',
      progressPercent: 10,
      currentStep: 'Step 1/6: EEG Bandpass Preprocessing (1-40Hz)',
      isSharedWithViewer: false,
    };
    this.experiments.unshift(newExp);
    this.logAuditAction(newExp.userName, newExp.userRole, 'CREATE_EXPERIMENT', `Created experiment ${newExp.title}`);
    return newExp;
  }

  async cancelExperiment(id: string): Promise<Experiment> {
    const idx = this.experiments.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error('Experiment not found');
    this.experiments[idx] = {
      ...this.experiments[idx],
      status: 'cancelled',
      currentStep: 'Job cancelled by user request.',
    };
    return this.experiments[idx];
  }

  async retryExperiment(id: string): Promise<Experiment> {
    const idx = this.experiments.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error('Experiment not found');
    this.experiments[idx] = {
      ...this.experiments[idx],
      status: 'queued',
      progressPercent: 5,
      currentStep: 'Queued for retry on GPU Node-01...',
    };
    return this.experiments[idx];
  }

  // Model Registry
  async getModels(): Promise<ModelInfo[]> {
    return [...this.models];
  }

  async registerModel(data: Omit<ModelInfo, 'id' | 'lastUpdated'>): Promise<ModelInfo> {
    const newModel: ModelInfo = {
      ...data,
      id: `mdl_${Date.now()}`,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    this.models.unshift(newModel);
    this.logAuditAction('Admin', 'admin', 'REGISTER_MODEL', `Registered model ${newModel.name}`);
    return newModel;
  }

  // Storage
  async getStorageItems(): Promise<StorageItem[]> {
    return [...this.storageItems];
  }

  async getSystemServices(): Promise<SystemServiceStatus[]> {
    return [...this.systemServices];
  }

  async getAuditLogs(): Promise<AuditLog[]> {
    return [...this.auditLogs];
  }

  private logAuditAction(userName: string, userRole: UserRole, action: string, details: string) {
    const log: AuditLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userId: 'user_active',
      userName,
      userRole,
      action,
      resource: 'BVA System',
      ipAddress: '127.0.0.1',
      details,
      outcome: 'success',
    };
    this.auditLogs.unshift(log);
  }
}

export const bvaRepository = new MockBVARepository();
