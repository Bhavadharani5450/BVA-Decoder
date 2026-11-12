/**
 * Comprehensive Core Data Models for BVA Decoder Platform
 */

export type UserRole = 'admin' | 'researcher' | 'student' | 'viewer';

export type ModalityType = 'eeg' | 'visual' | 'audio' | 'multimodal';

export type Permission = 
  | 'create_experiment'
  | 'upload_data'
  | 'run_analysis'
  | 'manage_users'
  | 'manage_datasets'
  | 'manage_models'
  | 'view_audit_logs'
  | 'manage_settings'
  | 'export_reports'
  | 'delete_experiment'
  | 'view_telemetry'
  | 'approve_access';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  affiliation: string;
  department: string;
  createdAt: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin?: string;
}

export interface Dataset {
  id: string;
  name: string;
  title: string;
  description: string;
  modalities: ModalityType[];
  subjectCount: number;
  channelCount: number;
  samplingRateHz: number;
  accessStatus: 'approved' | 'pending' | 'restricted';
  sizeBytes: number;
  doi: string;
  license: string;
  author: string;
  createdAt: string;
  fileFormats: string[];
  isArchived?: boolean;
}

export interface DatasetAccessRequest {
  id: string;
  datasetId: string;
  datasetName: string;
  userId: string;
  userName: string;
  userEmail: string;
  userRole: UserRole;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  rationale: string;
  reviewerNotes?: string;
  decisionDate?: string;
  reviewerName?: string;
}

export interface EvaluationMetrics {
  accuracy: number;
  balancedAccuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  mse: number;
  snrDb: number;
  confusionMatrix: number[][]; // 5x5 matrix
  matrixLabels: string[];
  rocPoints: { fpr: number; tpr: number }[];
  prPoints: { recall: number; precision: number }[];
}

export interface Experiment {
  id: string;
  title: string;
  description: string;
  datasetId: string;
  datasetName: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  modalities: ModalityType[];
  status: 'draft' | 'queued' | 'running' | 'completed' | 'failed' | 'cancelled' | 'archived';
  targetTask: string;
  createdAt: string;
  completedAt?: string;
  eegChannels: number;
  eegSampleRate: number;
  audioSampleRate: number;
  visualResolution: string;
  modelName: string;
  metrics?: EvaluationMetrics;
  progressPercent?: number;
  currentStep?: string;
  errorMessage?: string;
  canRetry?: boolean;
  isSharedWithViewer?: boolean;
}

export interface ModelInfo {
  id: string;
  name: string;
  version: string;
  architecture: string;
  framework: string;
  parametersCount: string;
  description: string;
  status: 'draft' | 'validated' | 'deployed' | 'archived';
  defaultModality: ModalityType;
  accuracy: number;
  f1Score: number;
  lastUpdated: string;
  checkpointRef?: string;
  releaseNotes?: string;
}

export interface Prediction {
  id: string;
  experimentId: string;
  targetLabel: string;
  predictedLabel: string;
  confidenceScore: number;
  reconstructedImageUrl?: string;
  reconstructedAudioWaveform?: number[];
  topProbabilities: { class: string; score: number }[];
  alignmentOffsetMs: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  linkUrl?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  resource: string;
  ipAddress: string;
  details: string;
  outcome: 'success' | 'denied' | 'failure';
}

export interface StorageItem {
  id: string;
  name: string;
  category: 'dataset' | 'model_checkpoint' | 'eeg_raw' | 'report';
  sizeBytes: number;
  ownerName: string;
  updatedAt: string;
  format: string;
  isArchived: boolean;
}

export interface SystemServiceStatus {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  latencyMs: number;
  lastChecked: string;
}
