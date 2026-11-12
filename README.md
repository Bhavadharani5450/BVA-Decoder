# BVA Decoder (Brain Visual-Audio Decoder)

**BVA Decoder** is a professional, responsive research platform designed for analyzing high-density EEG recordings together with corresponding visual (image/video) and audio stimuli using multimodal AI algorithms.

> **Scientific Disclaimer**: BVA Decoder is an academic research platform for computational neuroscience, Brain-Computer Interface (BCI) researchers, and AI developers. It is not intended for mind-reading or medical diagnostic applications. All evaluation metrics and predictions are generated from benchmark sample datasets.

---

## Key Features

1. **Four Enforced User Roles**:
   - **Admin**: User management, role access permissions, dataset approval, model registry, audit logs, and platform monitoring.
   - **Researcher**: Full research suite for uploading EEG/stimuli data, creating experiments, running multimodal fusion, and exporting reports.
   - **Student**: Access permitted datasets, upload experimental trials, run analysis pipelines, and track individual progress.
   - **Viewer**: Read-only access to approved published experiments, model evaluations, and shared reports.

2. **Multimodal Analysis Suite**:
   - **16/64-Channel EEG Visualizer**: Scrolling waveform stream, gain scrubbers, 1-40Hz bandpass filtering, and spectral power density breakdown.
   - **Visual Stimulus & Feature Maps**: Image/video frame inspector with ViT patch token alignment and occipital attention heatmaps.
   - **Audio Waveform & Spectrogram**: Mel-spectrogram heatmap, fundamental frequency (F0) pitch, RMS energy, and MFCC feature extraction.
   - **Multimodal Fusion Engine**: Gated cross-attention transformer configuration with cross-modality attention score matrix.
   - **8-Step Create Experiment Wizard**: Step-by-step setup with automatic cross-modality timestamp synchronization validation (+14.2ms tolerance).

3. **Model Evaluation & Benchmarking**:
   - Classification accuracy, precision, recall, F1-score, and MSE stat cards.
   - Interactive 5x5 multi-class confusion matrix heatmap.
   - Receiver Operating Characteristic (ROC) curve & AUC metrics.

---

## Folder Architecture

```
lib/
  main.dart                           # Flutter Web entry point
  app/
    app.dart                          # App root setup & Riverpod provider scope
    router.dart                       # GoRouter route definitions & role guards
    theme/                            # App colors & typography system
  core/
    permissions/                      # Centralized permission matrix & guards
    network/                          # Dio-style ApiClient abstraction
  data/
    models/                           # Typed data models (User, Dataset, Experiment, Prediction)
    repositories/                     # Abstract BVA repository & mock implementation
  features/
    dashboard/                        # Role-specific KPI cards & recent trials
    experiments/                      # 8-Step experiment creation wizard & detail view
    datasets/                         # Dataset library & access request modal
    eeg_analysis/                     # Multi-channel EEG signal visualizer canvas
    visual_analysis/                  # ViT feature map visualizer
    audio_analysis/                   # Mel-spectrogram audio visualizer
    multimodal_fusion/                # Cross-attention weights matrix
    predictions/                      # Reconstructed target visualizer
    model_evaluation/                 # 5x5 confusion matrix & ROC curves
    reports/                          # PDF/JSON report export generator
    user_management/                  # Admin user roles, access requests & audit logs
    profile font/                     # Profile & API credentials generator
```

---

## Run & Verification Commands

### Web Preview (Node / Vite / React Applet)
```bash
npm run dev
```
The dev server starts on `http://localhost:3000`.

### Type Check & Build Verification
```bash
npm run lint
npm run build
```

---

## Future FastAPI Backend Integration

The frontend architecture includes a Dio/ApiClient abstraction designed for seamless integration with a Python FastAPI backend:
- `JWT Authentication`: Bearer tokens injected into request headers.
- `MNE Preprocessing`: Bandpass filtering (1-40Hz) and CSP spatial filtering.
- `PyTorch Inference`: Model forward passes hosted on GPU nodes.
- `Data Access Claims`: FastAPI endpoints must mirror client-side claims in `PermissionService`.
