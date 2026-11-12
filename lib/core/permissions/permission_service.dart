enum UserRole { admin, researcher, student, viewer }

enum Permission {
  createExperiment,
  uploadData,
  runAnalysis,
  manageUsers,
  manageDatasets,
  manageModels,
  viewAuditLogs,
  manageSettings,
  exportReports,
  deleteExperiment,
}

class PermissionService {
  static const Map<UserRole, List<Permission>> _rolePermissions = {
    UserRole.admin: [
      Permission.createExperiment,
      Permission.uploadData,
      Permission.runAnalysis,
      Permission.manageUsers,
      Permission.manageDatasets,
      Permission.manageModels,
      Permission.viewAuditLogs,
      Permission.manageSettings,
      Permission.exportReports,
      Permission.deleteExperiment,
    ],
    UserRole.researcher: [
      Permission.createExperiment,
      Permission.uploadData,
      Permission.runAnalysis,
      Permission.exportReports,
      Permission.deleteExperiment,
    ],
    UserRole.student: [
      Permission.createExperiment,
      Permission.uploadData,
      Permission.runAnalysis,
      Permission.exportReports,
    ],
    UserRole.viewer: [
      Permission.exportReports,
    ],
  };

  static bool hasPermission(UserRole role, Permission permission) {
    return _rolePermissions[role]?.contains(permission) ?? false;
  }
}
