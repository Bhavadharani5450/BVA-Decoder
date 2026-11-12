import 'package:flutter/material.dart';

void main() {
  runApp(const BVADecoderApp());
}

class BVADecoderApp extends StatelessWidget {
  const BVADecoderApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'BVA Decoder',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        scaffoldBackgroundColor: const Color(0xFFF5F7FB),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF2563EB),
          surface: Colors.white,
        ),
      ),
      home: const Scaffold(
        body: Center(
          child: Text(
            'BVA Decoder - Brain Visual-Audio Decoder Platform',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: Color(0xFF172B4D),
            ),
          ),
        ),
      ),
    );
  }
}
