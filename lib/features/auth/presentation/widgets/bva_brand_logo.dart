import 'package:flutter/material.dart';

class BvaBrandLogo extends StatelessWidget {
  final double size;
  final bool isDark;

  const BvaBrandLogo({
    super.key,
    this.size = 40,
    this.isDark = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF2563EB) : const Color(0xFF172B4D),
        borderRadius: BorderRadius.circular(size * 0.25),
        boxShadow: [
          BoxShadow(
            color: (isDark ? const Color(0xFF2563EB) : const Color(0xFF172B4D)).withOpacity(0.3),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Icon(
        Icons.psychology_outlined,
        color: Colors.white,
        size: size * 0.6,
      ),
    );
  }
}
