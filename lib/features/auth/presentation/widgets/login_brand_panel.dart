import 'package:flutter/material.dart';
import 'bva_brand_logo.dart';

class LoginBrandPanel extends StatelessWidget {
  const LoginBrandPanel({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: Color(0xFF0B1020),
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Color(0xFF0B1020),
            Color(0xFF131B36),
            Color(0xFF1E1B4B),
          ],
        ),
      ),
      padding: const EdgeInsets.symmetric(horizontal: 48.0, vertical: 40.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Top Brand Lockup
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const BvaBrandLogo(size: 38, isDark: true),
                  const SizedBox(width: 14),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'BVA DECODER',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                          letterSpacing: 1.2,
                        ),
                      ),
                      Text(
                        'Brain Visual-Audio Decoder',
                        style: TextStyle(
                          color: Colors.white.withOpacity(0.6),
                          fontSize: 11,
                          fontFamily: 'monospace',
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(height: 16),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: const Color(0xFF2563EB).withOpacity(0.2),
                  borderRadius: BorderRadius.circular(4),
                  border: Border.all(color: const Color(0xFF2563EB).withOpacity(0.4)),
                ),
                child: const Text(
                  'MULTIMODAL AI RESEARCH PLATFORM',
                  style: TextStyle(
                    color: Color(0xFF60A5FA),
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 1.0,
                    fontFamily: 'monospace',
                  ),
                ),
              ),
            ],
          ),

          // Main Headline & Feature Cards
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Decode Signals.\nExplore Intelligence.',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                  height: 1.2,
                  letterSpacing: -0.5,
                ),
              ),
              const SizedBox(height: 12),
              Text(
                'An intelligent research platform for EEG signal processing, visual understanding and audio analysis using multimodal artificial intelligence.',
                style: TextStyle(
                  color: Colors.white.withOpacity(0.7),
                  fontSize: 13,
                  height: 1.5,
                ),
              ),
              const SizedBox(height: 32),

              // 3 Feature Cards
              _FeatureCard(
                icon: Icons.graphic_eq_outlined,
                title: 'EEG Intelligence',
                subtitle: 'Brain signal processing and analysis.',
                accentColor: const Color(0xFF3B82F6),
              ),
              const SizedBox(height: 12),
              _FeatureCard(
                icon: Icons.remove_red_eye_outlined,
                title: 'Visual Understanding',
                subtitle: 'Image and video stimulus analysis.',
                accentColor: const Color(0xFF06B6D4),
              ),
              const SizedBox(height: 12),
              _FeatureCard(
                icon: Icons.graphic_eq,
                title: 'Audio Intelligence',
                subtitle: 'Audio feature extraction and analysis.',
                accentColor: const Color(0xFFA855F7),
              ),
            ],
          ),

          // Bottom Security Indicators
          Row(
            children: [
              _SecurityIndicator(label: 'Secure Access'),
              const SizedBox(width: 16),
              _SecurityIndicator(label: 'Research Workspace'),
              const SizedBox(width: 16),
              _SecurityIndicator(label: 'Multimodal AI'),
            ],
          ),
        ],
      ),
    );
  }
}

class _FeatureCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final Color accentColor;

  const _FeatureCard({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.accentColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.04),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.white.withOpacity(0.08)),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: accentColor.withOpacity(0.15),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(icon, color: accentColor, size: 20),
          ),
          const SizedBox(width: 14),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.semibold,
                  fontSize: 13,
                ),
              ),
              Text(
                subtitle,
                style: TextStyle(
                  color: Colors.white.withOpacity(0.6),
                  fontSize: 11,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _SecurityIndicator extends StatelessWidget {
  final String label;

  const _SecurityIndicator({required this.label});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(Icons.shield_outlined, color: Colors.white.withOpacity(0.4), size: 14),
        const SizedBox(width: 4),
        Text(
          label,
          style: TextStyle(
            color: Colors.white.withOpacity(0.5),
            fontSize: 11,
            fontFamily: 'monospace',
          ),
        ),
      ],
    );
  }
}
