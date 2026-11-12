import '../../core/permissions/permission_service.dart';

class AuthUser {
  final String id;
  final String email;
  final String name;
  final UserRole role;

  AuthUser({
    required this.id,
    required this.email,
    required this.name,
    required this.role,
  });
}

abstract class AuthRepository {
  Future<AuthUser?> login(String email, String password);
}

class MockAuthRepository implements AuthRepository {
  static bool enableMockAuth = true; // Dev flag: disable when FastAPI backend connected

  final Map<String, Map<String, dynamic>> _demoAccounts = {
    'admin@bva-decoder.demo': {
      'password': 'Admin@123',
      'id': 'user_admin_01',
      'name': 'Dr. Elena Rostova',
      'role': UserRole.admin,
    },
    'researcher@bva-decoder.demo': {
      'password': 'Research@123',
      'id': 'user_researcher_01',
      'name': 'Prof. Marcus Thorne',
      'role': UserRole.researcher,
    },
    'student@bva-decoder.demo': {
      'password': 'Student@123',
      'id': 'user_student_01',
      'name': 'Aria Chen',
      'role': UserRole.student,
    },
    'viewer@bva-decoder.demo': {
      'password': 'Viewer@123',
      'id': 'user_viewer_01',
      'name': 'Dr. Samuel Vance',
      'role': UserRole.viewer,
    },
  };

  @override
  Future<AuthUser?> login(String email, String password) async {
    await Future.delayed(const Duration(milliseconds: 800)); // Simulate network latency

    if (!enableMockAuth) {
      throw UnimplementedError('FastAPI backend connection required for production authentication.');
    }

    final normalizedEmail = email.trim().toLowerCase();
    final account = _demoAccounts[normalizedEmail];

    if (account != null && account['password'] == password) {
      return AuthUser(
        id: account['id'] as String,
        email: normalizedEmail,
        name: account['name'] as String,
        role: account['role'] as UserRole,
      );
    }

    return null;
  }
}
