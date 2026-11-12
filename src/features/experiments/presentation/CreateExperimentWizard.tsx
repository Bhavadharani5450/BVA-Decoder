import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '../../../context/NavigationContext';
import { bvaRepository } from '../../../data/repositories/bvaRepository';
import { ModalityType } from '../../../types';
import {
  Check,
  ChevronRight,
  ChevronLeft,
  FileCheck,
  UploadCloud,
  AlertCircle,
  Activity,
  Eye,
  Volume2,
  GitMerge,
  Sparkles,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

export const CreateExperimentWizard: React.FC = () => {
  const { currentUser } = useAuth();
  const { setActiveTab } = useNavigation();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdExpId, setCreatedExpId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDatasetId, setSelectedDatasetId] = useState('ds_bva_10k');
  const [targetTask, setTargetTask] = useState('Visual Category Classification & Image Reconstruction');
  
  // Selected Modalities
  const [modalities, setModalities] = useState<ModalityType[]>(['eeg', 'visual', 'multimodal']);
  
  // Step 2: EEG Config
  const [eegFile, setEegFile] = useState<File | null>(null);
  const [eegChannels, setEegChannels] = useState(64);
  const [eegSampleRate, setEegSampleRate] = useState(1000);
  const [eegFormat, setEegFormat] = useState('.edf');

  // Step 3: Visual Config
  const [visualFile, setVisualFile] = useState<File | null>(null);
  const [visualResolution, setVisualResolution] = useState('512x512');

  // Step 4: Audio Config
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioSampleRate, setAudioSampleRate] = useState(44100);

  // Step 5: Sync Validation
  const [timestampMatch, setTimestampMatch] = useState(true);
  const [syncLagMs, setSyncLagMs] = useState(0);

  // Step 6: Model Selection
  const [selectedModel, setSelectedModel] = useState('BVA-CrossAttention-Conformer-v2');

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setCurrentStep(8); // Execution step

    try {
      const exp = await bvaRepository.createExperiment({
        title: title || 'Multimodal Brain Reconstruction Trial',
        description,
        datasetId: selectedDatasetId,
        userId: currentUser.id,
        userName: currentUser.name,
        userRole: currentUser.role,
        modalities,
        targetTask,
        eegChannels,
        eegSampleRate,
        audioSampleRate,
        visualResolution,
        modelName: selectedModel,
      });

      // Simulate step progress
      setTimeout(() => {
        setCreatedExpId(exp.id);
        setIsSubmitting(false);
      }, 3500);
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { num: 1, label: 'Experiment Details' },
    { num: 2, label: 'EEG Data' },
    { num: 3, label: 'Visual Stimulus' },
    { num: 4, label: 'Audio Stimulus' },
    { num: 5, label: 'Timestamp Sync' },
    { num: 6, label: 'Model Select' },
    { num: 7, label: 'Pre-flight Review' },
    { num: 8, label: 'Live Processing' },
  ];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl border border-[#E5EAF1] p-6 shadow-xs">
      {/* Step Indicator Header */}
      <div className="mb-8 border-b border-slate-100 pb-4 overflow-x-auto">
        <div className="flex items-center min-w-[650px] justify-between">
          {steps.map((s, idx) => (
            <React.Fragment key={s.num}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full text-xs font-bold font-mono flex items-center justify-center transition-all ${
                    currentStep === s.num
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                      : currentStep > s.num
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {currentStep > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                </div>
                <span
                  className={`text-xs whitespace-nowrap ${
                    currentStep === s.num
                      ? 'font-bold text-[#172B4D]'
                      : currentStep > s.num
                      ? 'font-medium text-slate-700'
                      : 'text-slate-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 ${
                    currentStep > s.num ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* STEP 1: Details & Task */}
      {currentStep === 1 && (
        <div className="space-y-5">
          <h2 className="text-base font-bold text-[#172B4D]">Step 1: Experiment Metadata & Decoding Task</h2>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Experiment Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Occipital-Visual Decoding of Natural Scene Images"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Description & Hypothesis</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="State research goals, channel selection rationale, and stimulus presentation parameters..."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Select Base Dataset</label>
              <select
                value={selectedDatasetId}
                onChange={(e) => setSelectedDatasetId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="ds_bva_10k">BVA-BrainImage-10k (64-Ch, 1000Hz)</option>
                <option value="ds_audio_eeg_v1">Auditory-Cortex-EEG-64ch (Speech & Music)</option>
                <option value="ds_tri_modal_hub">TriModal-Brain-AV-3D (128-Ch, Restricted)</option>
                <option value="ds_spatial_vis_eeg">Spatial-Vision-EEG-32ch (32-Ch Compact)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target AI Task</label>
              <select
                value={targetTask}
                onChange={(e) => setTargetTask(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="Visual Category Classification & Image Reconstruction">
                  Visual Category Classification & Image Reconstruction
                </option>
                <option value="Speech Spectrogram Decoding & Audio Synthesis">
                  Speech Spectrogram Decoding & Audio Synthesis
                </option>
                <option value="Tri-Modal Joint Space Embedding">
                  Tri-Modal Joint Space Embedding
                </option>
                <option value="EEG Alpha-Band PSD Mapping">EEG Alpha-Band PSD Mapping</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: EEG Data Upload */}
      {currentStep === 2 && (
        <div className="space-y-5">
          <h2 className="text-base font-bold text-[#172B4D] flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Step 2: EEG Recording & Metadata Validation
          </h2>

          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50">
            <UploadCloud className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-800">Select local EEG Signal File (.edf, .bdf, .npy)</p>
            <p className="text-[11px] text-slate-500 mt-1">Local file metadata will be validated against channel montage schema.</p>
            <input
              type="file"
              accept=".edf,.bdf,.npy,.csv"
              onChange={(e) => setEegFile(e.target.files?.[0] || null)}
              className="mt-3 text-xs mx-auto text-slate-600"
            />
            {eegFile && (
              <div className="mt-3 p-2 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-200 inline-block font-mono">
                Selected: {eegFile.name} ({(eegFile.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Montage Channels</label>
              <select
                value={eegChannels}
                onChange={(e) => setEegChannels(Number(e.target.value))}
                className="w-full p-2 border border-slate-300 rounded-lg"
              >
                <option value={16}>16 Channels</option>
                <option value={32}>32 Channels</option>
                <option value={64}>64 Channels (Standard 10-20)</option>
                <option value={128}>128 Channels (High Density)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Sampling Rate (Hz)</label>
              <select
                value={eegSampleRate}
                onChange={(e) => setEegSampleRate(Number(e.target.value))}
                className="w-full p-2 border border-slate-300 rounded-lg"
              >
                <option value={256}>256 Hz</option>
                <option value={500}>500 Hz</option>
                <option value={1000}>1000 Hz</option>
                <option value={2048}>2048 Hz</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Signal Format</label>
              <input
                type="text"
                value={eegFormat}
                onChange={(e) => setEegFormat(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Visual Stimulus Upload */}
      {currentStep === 3 && (
        <div className="space-y-5">
          <h2 className="text-base font-bold text-[#172B4D] flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            Step 3: Visual Stimulus Files (Image / Video Clips)
          </h2>

          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50">
            <UploadCloud className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-800">Select Image/Video Stimuli Folder or File</p>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setVisualFile(e.target.files?.[0] || null)}
              className="mt-3 text-xs mx-auto text-slate-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Image Resolution</label>
              <select
                value={visualResolution}
                onChange={(e) => setVisualResolution(e.target.value)}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg font-mono"
              >
                <option value="256x256">256 x 256 px</option>
                <option value="512x512">512 x 512 px (ViT Default)</option>
                <option value="1024x1024">1024 x 1024 px</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Audio Stimulus Upload */}
      {currentStep === 4 && (
        <div className="space-y-5">
          <h2 className="text-base font-bold text-[#172B4D] flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-blue-600" />
            Step 4: Audio Stimulus File Selection (.wav, .flac)
          </h2>

          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50">
            <UploadCloud className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-800">Select Acoustic File (.wav, .flac, .mp3)</p>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
              className="mt-3 text-xs mx-auto text-slate-600"
            />
          </div>
        </div>
      )}

      {/* STEP 5: Timestamp Synchronization Check */}
      {currentStep === 5 && (
        <div className="space-y-5">
          <h2 className="text-base font-bold text-[#172B4D] flex items-center gap-2">
            <GitMerge className="w-5 h-5 text-blue-600" />
            Step 5: Cross-Modality Timestamp & Trial ID Synchronization
          </h2>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900">
              <p className="font-bold">Modality Synchronization Validated!</p>
              <p className="mt-0.5 font-mono">
                EEG Onset Trigger Marker #S255 aligns with Visual Stimulus Frame #10492 and Audio Envelope start time within <span className="font-bold">+14.2 ms</span> tolerance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-400 block text-[10px]">EEG Trial Count</span>
              <span className="text-base font-bold text-slate-800">1,000 Trials</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Visual Frames</span>
              <span className="text-base font-bold text-slate-800">1,000 Images</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-slate-400 block text-[10px]">Sync Offset</span>
              <span className="text-base font-bold text-emerald-600">+14.2 ms</span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: Select Model */}
      {currentStep === 6 && (
        <div className="space-y-5">
          <h2 className="text-base font-bold text-[#172B4D] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Step 6: Select AI Model Architecture & Hyperparameters
          </h2>

          <div className="space-y-3">
            {[
              {
                id: 'BVA-CrossAttention-Conformer-v2',
                name: 'BVA-CrossAttention-Conformer-v2 (Recommended)',
                desc: 'State-of-the-art 42.8M parameter spatial conformer with gated cross-attention for visual decoding.',
                acc: '89.4%',
              },
              {
                id: 'Audio-EEG-Net-ResNeXt',
                name: 'Audio-EEG-Net-ResNeXt',
                desc: 'Specialized temporal ResNeXt for speech spectrogram envelope reconstruction.',
                acc: '84.1%',
              },
              {
                id: 'TriModal-Fusion-Transformer-v3',
                name: 'TriModal-Fusion-Transformer-v3',
                desc: '96.5M parameter tri-stream joint space embedding transformer.',
                acc: '91.2%',
              },
            ].map((m) => (
              <label
                key={m.id}
                className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedModel === m.id
                    ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="modelSelect"
                    checked={selectedModel === m.id}
                    onChange={() => setSelectedModel(m.id)}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#172B4D] block">{m.name}</span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">{m.desc}</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded shrink-0">
                  {m.acc} Benchmark
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* STEP 7: Review & Submit */}
      {currentStep === 7 && (
        <div className="space-y-5">
          <h2 className="text-base font-bold text-[#172B4D]">Step 7: Pre-Flight Experiment Review</h2>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs font-mono space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Title:</span>
              <span className="font-bold text-slate-900">{title || 'Untitled Experiment'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Dataset:</span>
              <span className="font-bold text-slate-900">{selectedDatasetId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">EEG Config:</span>
              <span className="font-bold text-slate-900">{eegChannels} Channels @ {eegSampleRate} Hz</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Selected Model:</span>
              <span className="font-bold text-blue-700">{selectedModel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">FastAPI Backend Target:</span>
              <span className="font-bold text-purple-700">PyTorch GPU Node #02</span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 8: Live Processing Simulation */}
      {currentStep === 8 && (
        <div className="py-12 text-center space-y-4">
          {isSubmitting ? (
            <div className="flex flex-col items-center">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
              <h3 className="text-base font-bold text-[#172B4D]">Running Multimodal AI Inference Pipeline...</h3>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Executing Bandpass Filtering ➔ Cross-Attention Matrix Calculation ➔ PyTorch Model Forward Pass
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#172B4D]">Experiment Created & Results Ready!</h3>
              <p className="text-xs text-slate-500 font-mono mt-1">
                Experiment ID: <span className="font-bold text-blue-700">{createdExpId}</span>
              </p>
              <button
                onClick={() => setActiveTab('predictions')}
                className="mt-5 px-5 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-xs"
              >
                View Brain Decoding Predictions
              </button>
            </div>
          )}
        </div>
      )}

      {/* Navigation Wizard Footer Buttons */}
      {currentStep < 8 && (
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 disabled:opacity-40 transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          {currentStep < 7 ? (
            <button
              onClick={handleNext}
              className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1 shadow-xs"
            >
              Continue <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 text-xs font-bold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-md"
            >
              <Sparkles className="w-4 h-4" /> Run Multimodal Analysis
            </button>
          )}
        </div>
      )}
    </div>
  );
};
