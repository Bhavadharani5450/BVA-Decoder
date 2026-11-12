import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'widgets/login_brand_panel.dart';
import 'widgets/login_form_panel.dart';
import 'providers/auth_provider.dart';
import '../../../core/permissions/permission_service.dart';

class LoginPage extends ConsumerWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),
      body: LayoutBuilder(
        builder: (context, constraints) {
          final isDesktop = constraints.maxWidth >= 1200;
          final isTablet = constraints.maxWidth >= 768 && constraints.maxWidth < 1200;

          if (isDesktop || isTablet) {
            return Row(
              children: [
                // Left 50% Panel: Brand & Features
                Expanded(
                  flex: isDesktop ? 1 : 4,
                  child: const LoginBrandPanel(),
                ),
                // Right 50% Panel: Login Form
                Expanded(
                  flex: isDesktop ? 1 : 5,
                  child: LoginFormPanel(
                    onLoginSuccess: () {
                      final user = ref.read(authProvider).user;
                      if (user != null) {
                        switch (user.role) {
                          case UserRole.admin:
                            context.go('/admin');
                            break;
                          case UserRole.researcher:
                            context.go('/researcher');
                            break;
                          case UserRole.student:
                            context.go('/student');
                            break;
                          case UserRole.viewer:
                            context.go('/viewer');
                            break;
                        }
                      }
                    },
                  ),
                ),
              ],
            );
          }

          // Mobile View (< 768px): Full width form
          return SafeArea(
            child: LoginFormPanel(
              onLoginSuccess: () {
                final user = ref.read(authProvider).user;
                if (user != null) {
                  switch (user.role) {
                    case UserRole.admin:
                      context.go('/admin');
                      break;
                    case UserRole.researcher:
                      context.go('/researcher');
                      break;
                    case UserRole.student:
                      context.go('/student');
                      break;
                    case UserRole.viewer:
                      context.go('/viewer');
                      break;
                  }
                }
              },
            ),
          );
        },
      ),
    );
  }
}
