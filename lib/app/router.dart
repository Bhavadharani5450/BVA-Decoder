import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../features/auth/presentation/login_page.dart';

final appRouter = GoRouter(
  initialLocation: '/login',
  routes: [
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginPage(),
    ),
    GoRoute(
      path: '/admin',
      builder: (context, state) => const Scaffold(
        body: Center(child: Text('Admin Workspace Dashboard')),
      ),
    ),
    GoRoute(
      path: '/researcher',
      builder: (context, state) => const Scaffold(
        body: Center(child: Text('Researcher Workspace Dashboard')),
      ),
    ),
    GoRoute(
      path: '/student',
      builder: (context, state) => const Scaffold(
        body: Center(child: Text('Student Workspace Dashboard')),
      ),
    ),
    GoRoute(
      path: '/viewer',
      builder: (context, state) => const Scaffold(
        body: Center(child: Text('Viewer Published Results Dashboard')),
      ),
    ),
  ],
);
