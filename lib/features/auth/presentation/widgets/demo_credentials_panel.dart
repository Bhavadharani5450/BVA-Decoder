import 'package:flutter/material.dart';
import 'demo_account_card.dart';

class DemoCredentialsPanel extends StatefulWidget {
  final Function(String email, String password) onSelectAccount;

  const DemoCredentialsPanel({
    super.key,
    required this.onSelectAccount,
  });

  @override
  State<DemoCredentialsPanel> createState() => _DemoCredentialsPanelState();
}

class _DemoCredentialsPanelState extends State<DemoCredentialsPanel> {
  bool _isExpanded = false;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 24),
      decoration: BoxDecoration(
        color: const Color(0xFFF8FAFC),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFE5EAF1)),
      ),
      child: Column(
        children: [
          InkWell(
            onTap: () {
              setState(() {
                _isExpanded = !_isExpanded;
              });
            },
            borderRadius: BorderRadius.circular(12),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Row(
                    children: [
                      Icon(Icons.tune_outlined, size: 16, color: Color(0xFF2563EB)),
                      SizedBox(width: 8),
                      Text(
                        'Development Demo Credentials (4 Roles)',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF172B4D),
                        ),
                      ),
                    ],
                  ),
                  Icon(
                    _isExpanded ? Icons.keyboard_arrow_up : Icons.keyboard_arrow_down,
                    size: 18,
                    color: const Color(0xFF64748B),
                  ),
                ],
              ),
            ),
          ),
          if (_isExpanded) ...[
            const Divider(height: 1, color: Color(0xFFE5EAF1)),
            Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                children: [
                  DemoAccountCard(
                    role: 'Admin',
                    email: 'admin@bva-decoder.demo',
                    password: 'Admin@123',
                    onUse: () => widget.onSelectAccount('admin@bva-decoder.demo', 'Admin@123'),
                  ),
                  const SizedBox(height: 8),
                  DemoAccountCard(
                    role: 'Researcher',
                    email: 'researcher@bva-decoder.demo',
                    password: 'Research@123',
                    onUse: () => widget.onSelectAccount('researcher@bva-decoder.demo', 'Research@123'),
                  ),
                  const SizedBox(height: 8),
                  DemoAccountCard(
                    role: 'Student',
                    email: 'student@bva-decoder.demo',
                    password: 'Student@123',
                    onUse: () => widget.onSelectAccount('student@bva-decoder.demo', 'Student@123'),
                  ),
                  const SizedBox(height: 8),
                  DemoAccountCard(
                    role: 'Viewer',
                    email: 'viewer@bva-decoder.demo',
                    password: 'Viewer@123',
                    onUse: () => widget.onSelectAccount('viewer@bva-decoder.demo', 'Viewer@123'),
                  ),
                  const SizedBox(height: 10),
                  const Text(
                    'Local mock authentication active for all 4 roles. Production authentication is delegated to FastAPI JWT service.',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 10,
                      color: Color(0xFF94A3B8),
                      fontFamily: 'monospace',
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}
