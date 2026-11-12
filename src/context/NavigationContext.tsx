import React, { createContext, useContext, useState } from 'react';
import { UserRole } from '../types';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Database,
  KeyRound,
  Boxes,
  GitBranch,
  FlaskConical,
  AlertTriangle,
  Activity,
  Cpu,
  HardDrive,
  FileText,
  Settings as SettingsIcon,
  User,
  LogOut,
  PlusCircle,
  ActivitySquare,
  Eye,
  Volume2,
  GitMerge,
  Sparkles,
  History,
  BarChart3,
  GitCompare,
  Bell,
  Upload,
  Share2,
  CheckCircle2,
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  category?: string;
}

export interface NavigationContextType {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  getNavItemsForRole: (role: UserRole) => NavItem[];
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  toggleDrawer: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  const getNavItemsForRole = (role: UserRole): NavItem[] => {
    switch (role) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'user_management', label: 'User Management', icon: Users, category: 'Administration' },
          { id: 'roles_permissions', label: 'Roles & Permissions', icon: ShieldCheck, category: 'Administration' },
          { id: 'dataset_management', label: 'Dataset Management', icon: Database, category: 'Data & Access' },
          { id: 'access_requests', label: 'Dataset Access Requests', icon: KeyRound, badge: '1', category: 'Data & Access' },
          { id: 'model_registry', label: 'Model Registry', icon: Boxes, category: 'Models & Compute' },
          { id: 'model_versions', label: 'Model Versions', icon: GitBranch, category: 'Models & Compute' },
          { id: 'all_experiments', label: 'All Experiments', icon: FlaskConical, category: 'Monitoring' },
          { id: 'failed_jobs', label: 'Failed Jobs', icon: AlertTriangle, category: 'Monitoring' },
          { id: 'system_health', label: 'System Health', icon: Activity, category: 'Monitoring' },
          { id: 'api_usage', label: 'API Usage', icon: Cpu, category: 'Monitoring' },
          { id: 'storage', label: 'Storage', icon: HardDrive, category: 'Monitoring' },
          { id: 'audit_logs', label: 'Audit Logs', icon: FileText, category: 'System' },
          { id: 'platform_settings', label: 'Platform Settings', icon: SettingsIcon, category: 'System' },
          { id: 'profile', label: 'Profile', icon: User, category: 'Account' },
        ];

      case 'researcher':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'experiments', label: 'Experiments', icon: FlaskConical, category: 'Research Workspace' },
          { id: 'new_experiment', label: 'New Experiment', icon: PlusCircle, badge: 'Wizard', category: 'Research Workspace' },
          { id: 'datasets', label: 'Dataset Library', icon: Database, category: 'Data & Signals' },
          { id: 'eeg_analysis', label: 'EEG Analysis', icon: ActivitySquare, category: 'Modality Analysis' },
          { id: 'visual_analysis', label: 'Visual Analysis', icon: Eye, category: 'Modality Analysis' },
          { id: 'audio_analysis', label: 'Audio Analysis', icon: Volume2, category: 'Modality Analysis' },
          { id: 'multimodal_fusion', label: 'Multimodal Fusion', icon: GitMerge, category: 'AI Inference' },
          { id: 'predictions', label: 'Predictions', icon: Sparkles, category: 'AI Inference' },
          { id: 'experiment_history', label: 'Experiment History', icon: History, category: 'AI Inference' },
          { id: 'model_evaluation', label: 'Model Evaluation', icon: BarChart3, category: 'Evaluation' },
          { id: 'model_comparison', label: 'Model Comparison', icon: GitCompare, category: 'Evaluation' },
          { id: 'reports', label: 'Reports', icon: FileText, category: 'Export' },
          { id: 'notifications', label: 'Notifications', icon: Bell, category: 'Account' },
          { id: 'profile', label: 'Profile', icon: User, category: 'Account' },
          { id: 'settings', label: 'Settings', icon: SettingsIcon, category: 'Account' },
        ];

      case 'student':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'my_experiments', label: 'My Experiments', icon: FlaskConical, category: 'Workspace' },
          { id: 'available_datasets', label: 'Available Datasets', icon: Database, category: 'Workspace' },
          { id: 'my_uploads', label: 'My Uploads', icon: Upload, category: 'Workspace' },
          { id: 'new_analysis', label: 'New Analysis', icon: PlusCircle, badge: 'Wizard', category: 'Analysis' },
          { id: 'predictions', label: 'Predictions', icon: Sparkles, category: 'Analysis' },
          { id: 'model_evaluation', label: 'Model Evaluation', icon: BarChart3, category: 'Evaluation' },
          { id: 'reports', label: 'Reports', icon: FileText, category: 'Export' },
          { id: 'notifications', label: 'Notifications', icon: Bell, category: 'Account' },
          { id: 'profile', label: 'Profile', icon: User, category: 'Account' },
          { id: 'settings', label: 'Settings', icon: SettingsIcon, category: 'Account' },
        ];

      case 'viewer':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'shared_experiments', label: 'Shared Experiments', icon: Share2, category: 'Public Results' },
          { id: 'published_results', label: 'Published Results', icon: CheckCircle2, category: 'Public Results' },
          { id: 'model_evaluation', label: 'Model Evaluation', icon: BarChart3, category: 'Metrics' },
          { id: 'reports', label: 'Reports', icon: FileText, category: 'Reports' },
          { id: 'profile', label: 'Profile', icon: User, category: 'Account' },
        ];
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        activeTab,
        setActiveTab,
        getNavItemsForRole,
        isDrawerOpen,
        setIsDrawerOpen,
        toggleDrawer,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
