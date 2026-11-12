import 'package:flutter/material.dart';

class LoginFooter extends StatelessWidget {
  const LoginFooter({super.key});

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.only(top: 24),
      child: Text(
        'BVA Decoder | Multimodal AI Research Platform',
        textAlign: TextAlign.center,
        style: TextStyle(
          fontSize: 11,
          color: Color(0xFF94A3B8),
          fontFamily: 'monospace',
        ),
      ),
    );
  }
}
