import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { AppHeader } from './shared/layouts/AppHeader';
import { AppSidebar } from './shared/layouts/AppSidebar';
import { DashboardPage } from './features/dashboard/presentation/DashboardPage';
import { CreateExperimentWizard } from './features/experiments/presentation/CreateExperimentWizard';
import { DatasetLibraryPage } from './features/datasets/presentation/DatasetLibraryPage';
import { EEGSignalVisualizer } from './features/eeg_analysis/presentation/EEGSignalVisualizer';
import { VisualStimulusVisualizer } from './features/visual_analysis/presentation/VisualStimulusVisualizer';
import { AudioSpectrogramVisualizer } from './features/audio_analysis/presentation/AudioSpectrogramVisualizer';
import { MultimodalFusionVisualizer } from './features/multimodal_fusion/presentation/MultimodalFusionVisualizer';
import { PredictionsPage } from './features/predictions/presentation/PredictionsPage';
import { ModelEvaluationPage } from './features/model_evaluation/presentation/ModelEvaluationPage';
import { ReportsPage } from './features/reports/presentation/ReportsPage';
import {
  UserManagementPage,
  RolesAndPermissionsPage,
  ModelRegistryPage,
  AccessRequestsPage,
  SystemHealthPage,
} from './features/user_management/presentation/AdminPages';
import { ProfilePage } from './features/profile/presentation/ProfilePage';
import { LoginPage } from './features/auth/presentation/LoginPage';

const MainLayoutContent: React.FC = () => {
  const { activeTab } = useNavigation();

  const renderCurrentView = () => {
    switch (activeTab) {
      case 'dashboard':
      case 'experiments':
      case 'my_experiments':
      case 'all_experiments':
      case 'shared_experiments':
      case 'my_uploads':
      case 'experiment_history':
      case 'published_results':
        return <DashboardPage />;

      case 'new_experiment':
      case 'new_analysis':
        return <CreateExperimentWizard />;

      case 'datasets':
      case 'available_datasets':
      case 'dataset_management':
        return <DatasetLibraryPage />;

      case 'eeg_analysis':
        return <EEGSignalVisualizer />;

      case 'visual_analysis':
        return <VisualStimulusVisualizer />;

      case 'audio_analysis':
        return <AudioSpectrogramVisualizer />;

      case 'multimodal_fusion':
        return <MultimodalFusionVisualizer />;

      case 'predictions':
        return <PredictionsPage />;

      case 'model_evaluation':
      case 'model_comparison':
        return <ModelEvaluationPage />;

      case 'reports':
        return <ReportsPage />;

      case 'user_management':
        return <UserManagementPage />;

      case 'roles_permissions':
        return <RolesAndPermissionsPage />;

      case 'access_requests':
        return <AccessRequestsPage />;

      case 'model_registry':
      case 'model_versions':
        return <ModelRegistryPage />;

      case 'system_health':
      case 'failed_jobs':
      case 'api_usage':
      case 'storage':
      case 'audit_logs':
        return <SystemHealthPage />;

      case 'login':
        return <LoginPage />;

      case 'profile':
      case 'platform_settings':
      case 'settings':
      case 'notifications':
        return <ProfilePage />;

      default:
        return <DashboardPage />;
    }
  };

  if (activeTab === 'login') {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col font-sans">
      <AppHeader />
      <div className="flex-1 flex">
        <AppSidebar />
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationProvider>
        <MainLayoutContent />
      </NavigationProvider>
    </AuthProvider>
  );
}
