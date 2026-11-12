import { UserRole, Permission, AppUser } from '../../types';

/**
 * Role Permission Mapping Matrix for BVA Decoder Platform.
 * Note: Frontend guards hide features and block navigation for UX.
 * Fast API backend MUST enforce identical claims and permissions on every endpoint.
 */
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    'create_experiment',
    'upload_data',
    'run_analysis',
    'manage_users',
    'manage_datasets',
    'manage_models',
    'view_audit_logs',
    'manage_settings',
    'export_reports',
    'delete_experiment',
  ],
  researcher: [
    'create_experiment',
    'upload_data',
    'run_analysis',
    'export_reports',
    'delete_experiment', // own experiments
  ],
  student: [
    'create_experiment',
    'upload_data',
    'run_analysis',
    'export_reports',
  ],
  viewer: [
    'export_reports', // read-only view & report download
  ],
};

export class PermissionService {
  /**
   * Check if a specific role possesses a permission
   */
  static hasPermission(role: UserRole, permission: Permission): boolean {
    const permissions = ROLE_PERMISSIONS[role] || [];
    return permissions.includes(permission);
  }

  /**
   * Check if current user has permission
   */
  static userCan(user: AppUser | null, permission: Permission): boolean {
    if (!user) return false;
    return this.hasPermission(user.role, permission);
  }

  /**
   * Get all permissions for a role
   */
  static getPermissionsForRole(role: UserRole): Permission[] {
    return ROLE_PERMISSIONS[role] || [];
  }

  /**
   * Role Display Name
   */
  static getRoleBadgeColor(role: UserRole): { bg: string; text: string; border: string } {
    switch (role) {
      case 'admin':
        return { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' };
      case 'researcher':
        return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
      case 'student':
        return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
      case 'viewer':
        return { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' };
    }
  }

  /**
   * Role Description
   */
  static getRoleDescription(role: UserRole): string {
    switch (role) {
      case 'admin':
        return 'Full administrative access: user management, dataset access requests, model registry, audit logs, and platform settings.';
      case 'researcher':
        return 'Full research suite: dataset upload, experiment creation, multimodal fusion execution, prediction analysis, and report generation.';
      case 'student':
        return 'Academic user: access permitted datasets, upload experimental trials, run analysis pipelines, view predictions, and track progress.';
      case 'viewer':
        return 'Read-only access: inspect approved experiments, published decoding results, model evaluations, and export shared reports.';
    }
  }
}
