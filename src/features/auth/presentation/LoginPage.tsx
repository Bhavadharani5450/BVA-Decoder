import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '../../../context/NavigationContext';
import { UserRole } from '../../../types';
import {
  Brain,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Activity,
  Sliders,
  Sparkles,
  Volume2,
  Shield,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from 'lucide-react';

export const LoginPage: React.FC<{ onLoginSuccess?: () => void }> = ({ onLoginSuccess }) => {
  const { loginAs } = useAuth();
  const { setActiveTab } = useNavigation();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Validation & Loading State
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Accordion & Modal Controls
  const [showDemoAccordion, setShowDemoAccordion] = useState(true);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  // EXACTLY FOUR DEMO ACCOUNTS (Admin, Researcher, Student, Viewer)
  const demoAccounts = [
    {
      role: 'Admin' as UserRole,
      email: 'admin@bva-decoder.demo',
      pass: 'Admin@123',
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      iconColor: 'text-purple-600',
    },
    {
      role: 'Researcher' as UserRole,
      email: 'researcher@bva-decoder.demo',
      pass: 'Research@123',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      iconColor: 'text-blue-600',
    },
    {
      role: 'Student' as UserRole,
      email: 'student@bva-decoder.demo',
      pass: 'Student@123',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      iconColor: 'text-emerald-600',
    },
    {
      role: 'Viewer' as UserRole,
      email: 'viewer@bva-decoder.demo',
      pass: 'Viewer@123',
      color: 'bg-slate-100 text-slate-800 border-slate-200',
      iconColor: 'text-slate-600',
    },
  ];

  const validateForm = (): boolean => {
    let valid = true;
    setEmailError(null);
    setPasswordError(null);
    setFormError(null);

    if (!email.trim()) {
      setEmailError('Email Address or Username is required');
      valid = false;
    } else if (email.includes('@') && !/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }

    return valid;
  };

  const handleSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const normEmail = email.trim().toLowerCase();
      if (normEmail === 'admin@bva-decoder.demo' && password === 'Admin@123') {
        loginAs('admin');
        setActiveTab('dashboard');
        if (onLoginSuccess) onLoginSuccess();
      } else if (normEmail === 'researcher@bva-decoder.demo' && password === 'Research@123') {
        loginAs('researcher');
        setActiveTab('dashboard');
        if (onLoginSuccess) onLoginSuccess();
      } else if (normEmail === 'student@bva-decoder.demo' && password === 'Student@123') {
        loginAs('student');
        setActiveTab('dashboard');
        if (onLoginSuccess) onLoginSuccess();
      } else if (normEmail === 'viewer@bva-decoder.demo' && password === 'Viewer@123') {
        loginAs('viewer');
        setActiveTab('dashboard');
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setFormError('Invalid credentials. Check your email & password or use a Demo Account below.');
      }
    }, 700);
  };

  const useDemoAccount = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setEmailError(null);
    setPasswordError(null);
    setFormError(null);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center p-0 lg:p-6 font-sans">
      <div className="w-full max-w-6xl min-h-[660px] bg-white rounded-none lg:rounded-2xl border-0 lg:border border-[#E5EAF1] shadow-none lg:shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* ==========================================
            LEFT PANEL: BRAND & SCIENCE (50% desktop)
           ========================================== */}
        <div className="lg:col-span-6 bg-[#0B1020] bg-gradient-to-br from-[#0B1020] via-[#131B36] to-[#1E1B4B] p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden hidden sm:flex">
          {/* Subtle Grid Pattern Background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          {/* Top Brand Lockup */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-base font-bold tracking-wider block font-mono">
                  BVA DECODER
                </span>
                <span className="text-xs text-slate-400 font-mono block -mt-0.5">
                  Brain Visual-Audio Decoder
                </span>
              </div>
            </div>

            <div className="mt-4 inline-block px-3 py-1 bg-blue-600/20 border border-blue-500/40 rounded text-[10px] font-mono font-bold tracking-wider text-blue-300 uppercase">
              MULTIMODAL AI RESEARCH PLATFORM
            </div>
          </div>

          {/* Main Headline & Feature Cards */}
          <div className="my-8 relative z-10 space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Decode Signals.<br />Explore Intelligence.
              </h1>
              <p className="text-xs lg:text-sm text-slate-300 mt-3 leading-relaxed max-w-md">
                An intelligent research platform for EEG signal processing, visual understanding and audio analysis using multimodal artificial intelligence.
              </p>
            </div>

            {/* 3 Feature Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3.5 backdrop-blur-xs">
                <div className="p-2.5 rounded-lg bg-blue-500/20 text-blue-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white">EEG Intelligence</h3>
                  <p className="text-[11px] text-slate-400">Brain signal processing and analysis.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3.5 backdrop-blur-xs">
                <div className="p-2.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white">Visual Understanding</h3>
                  <p className="text-[11px] text-slate-400">Image and video stimulus analysis.</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3.5 backdrop-blur-xs">
                <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white">Audio Intelligence</h3>
                  <p className="text-[11px] text-slate-400">Audio feature extraction and analysis.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Security Indicators */}
          <div className="relative z-10 flex items-center gap-4 text-[11px] font-mono text-slate-400 pt-4 border-t border-white/10">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-blue-400" /> Secure Access
            </span>
            <span>·</span>
            <span>Research Workspace</span>
            <span>·</span>
            <span>Multimodal AI</span>
          </div>
        </div>

        {/* ==========================================
            RIGHT PANEL: LOGIN FORM (50% desktop)
           ========================================== */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-10 flex flex-col justify-between">
          <div className="max-w-[440px] w-full mx-auto my-auto space-y-6">
            
            {/* Mobile Header (< sm) */}
            <div className="flex sm:hidden items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-[#172B4D] block font-mono">BVA DECODER</span>
                <span className="text-[10px] text-slate-500 font-mono block">Multimodal AI Platform</span>
              </div>
            </div>

            {/* Desktop Brand Icon Badge */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-xs">
                <Brain className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#172B4D] block tracking-wider font-mono">
                  BVA DECODER
                </span>
                <span className="text-[10px] text-slate-400 font-mono block">
                  Multimodal AI Platform
                </span>
              </div>
            </div>

            {/* Heading */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172B4D]">
                Welcome Back.
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Sign in to access your AI research workspace.
              </p>
            </div>

            {/* Form Global Error Alert */}
            {formError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSignIn} className="space-y-4">
              {/* Email / Username Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address or Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError(null);
                    }}
                    placeholder="name@institution.edu or username"
                    className={`w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 transition-all ${
                      emailError ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-blue-500'
                    }`}
                  />
                </div>
                {emailError && <p className="text-[11px] text-rose-600 mt-1 font-medium">{emailError}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError(null);
                    }}
                    placeholder="Enter your password"
                    className={`w-full pl-9 pr-9 py-2 text-xs bg-slate-50 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 transition-all ${
                      passwordError ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-blue-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400 hover:text-slate-600 absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passwordError && <p className="text-[11px] text-rose-600 mt-1 font-medium">{passwordError}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In to Workspace <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* ==========================================
                DEMO CREDENTIALS ACCORDION (ALL FOUR ROLES)
               ========================================== */}
            <div className="border border-slate-200 rounded-xl bg-slate-50/60 overflow-hidden">
              <button
                type="button"
                onClick={() => setShowDemoAccordion(!showDemoAccordion)}
                className="w-full px-4 py-2.5 flex items-center justify-between text-left text-xs font-bold text-[#172B4D] hover:bg-slate-100/60 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-600" />
                  Development Demo Credentials (4 Roles)
                </span>
                {showDemoAccordion ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {showDemoAccordion && (
                <div className="p-3 border-t border-slate-200 space-y-2.5 bg-white">
                  {demoAccounts.map((acc) => (
                    <div
                      key={acc.role}
                      className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between gap-2"
                    >
                      <div className="font-mono text-xs">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase ${acc.color}`}>
                            {acc.role}
                          </span>
                        </div>
                        <div className="font-bold text-slate-900">{acc.email}</div>
                        <div className="text-[11px] text-slate-500">Password: {acc.pass}</div>
                      </div>

                      <button
                        type="button"
                        onClick={() => useDemoAccount(acc.email, acc.pass)}
                        className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded text-xs font-semibold text-slate-800 transition-colors shrink-0"
                      >
                        Use Account
                      </button>
                    </div>
                  ))}

                  <p className="text-[10px] font-mono text-slate-400 text-center pt-1">
                    Local mock authentication active for all 4 roles. Production authentication is delegated to FastAPI JWT service.
                  </p>
                </div>
              )}
            </div>

            {/* Subtle Footer */}
            <div className="text-center pt-2">
              <p className="text-[11px] font-mono text-slate-400">
                BVA Decoder | Multimodal AI Research Platform
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-blue-600">
              <Lock className="w-5 h-5" />
              <h3 className="text-sm font-bold text-[#172B4D]">Password Reset Request</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Password recovery requests must be submitted to your institutional platform administrator or through the FastAPI OAuth backend.
            </p>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowForgotPasswordModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
