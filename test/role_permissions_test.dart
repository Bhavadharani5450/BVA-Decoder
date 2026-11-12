import 'package:flutter_test/flutter_test.dart';
import 'package:bva_decoder/core/permissions/permission_service.dart';

void main() {
  group('Role Permissions Architecture Tests', () => {
    test('Admin role possesses full permissions', () {
      expect(PermissionService.hasPermission(UserRole.admin, Permission.manageUsers), isTrue);
      expect(PermissionService.hasPermission(UserRole.admin, Permission.createExperiment), isTrue);
      expect(PermissionService.hasPermission(UserRole.admin, Permission.deleteExperiment), isTrue);
    }),

    test('Researcher role can create experiments but cannot manage users', () {
      expect(PermissionService.hasPermission(UserRole.researcher, Permission.createExperiment), isTrue);
      expect(PermissionService.hasPermission(UserRole.researcher, Permission.manageUsers), isFalse);
    }),

    test('Student role cannot delete experiments or manage users', () {
      expect(PermissionService.hasPermission(UserRole.student, Permission.createExperiment), isTrue);
      expect(PermissionService.hasPermission(UserRole.student, Permission.deleteExperiment), isFalse);
    }),

    test('Viewer role is strictly read-only export', () {
      expect(PermissionService.hasPermission(UserRole.viewer, Permission.createExperiment), isFalse);
      expect(PermissionService.hasPermission(UserRole.viewer, Permission.exportReports), isTrue);
    }),
  });
}
