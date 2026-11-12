import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '../../context/NavigationContext';
import { PermissionService } from '../../core/permissions/permissionService';
import { UserRole } from '../../types';
import {
  Brain,
  Menu,
  Bell,
  Search,
  UserCheck,
  ChevronDown,
  LogOut,
  User,
  Shield,
  Layers,
  Sliders,
  Check,
} from 'lucide-react';

export const AppHeader: React.FC = () => {
  const { currentUser, currentRole, switchRole, logout } = useAuth();
  const { toggleDrawer, setActiveTab } = useNavigation();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const roleColors = PermissionService.getRoleBadgeColor(currentRole);

  const roles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'admin', label: 'Admin', desc: 'Full System & User Control' },
    { role: 'researcher', label: 'Researcher', desc: 'Full Multimodal AI Suite' },
    { role: 'student', label: 'Student', desc: 'Dataset Access & Analysis' },
    { role: 'viewer', label: 'Viewer', desc: 'Read-only Published Results' },
  ];

  return (
    <header className="h-16 bg-white border-b border-[#E5EAF1] sticky top-0 z-30 px-4 lg:px-6 flex items-center justify-between shadow-2xs">
      {/* Left: Mobile Menu Toggle & Brand Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleDrawer}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Toggle Navigation Drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-[#172B4D] block leading-tight">
              BVA Decoder
            </span>
            <span className="text-[10px] font-mono text-slate-400 block -mt-0.5">
              Brain Visual-Audio Decoder
            </span>
          </div>
        </div>
      </div>

      {/* Middle: Search input bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search experiments, datasets, neural models, signals..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Right: Demo Role Switcher, Notifications & Profile */}
      <div className="flex items-center gap-3">
        {/* Role Selector Button for Local Development */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs transition-colors"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-slate-500 hidden sm:inline">Role:</span>
            <span className={`font-semibold capitalize px-2 py-0.5 rounded text-[11px] ${roleColors.bg} ${roleColors.text} ${roleColors.border} border`}>
              {currentRole}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-900">Switch Role (Local Development)</p>
                <p className="text-[11px] text-slate-500">Test platform permissions across the 4 user roles</p>
              </div>
              <div className="py-1">
                {roles.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => {
                      switchRole(r.role);
                      setShowRoleDropdown(false);
                      setActiveTab('dashboard');
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-slate-50 flex items-start gap-2.5 transition-colors ${
                      currentRole === r.role ? 'bg-blue-50/60' : ''
                    }`}
                  >
                    <div className="mt-0.5">
                      {currentRole === r.role ? (
                        <Check className="w-4 h-4 text-blue-600" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900 capitalize flex items-center gap-1.5">
                        {r.label}
                      </div>
                      <div className="text-[11px] text-slate-500">{r.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Icon */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (currentRole === 'researcher' || currentRole === 'student') {
                setActiveTab('notifications');
              }
            }}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
          </button>
        </div>

        {/* Profile Menu Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200"
            />
            <div className="hidden xl:block text-left">
              <span className="text-xs font-semibold text-[#172B4D] block leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-slate-500 block leading-tight capitalize">
                {currentUser.role}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden xl:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-900">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                <p className="text-[10px] font-mono text-blue-600 mt-0.5">{currentUser.affiliation}</p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('profile');
                  setShowProfileMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-slate-400" /> View Profile
              </button>
              <button
                onClick={() => {
                  setActiveTab('platform_settings');
                  setShowProfileMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <Sliders className="w-4 h-4 text-slate-400" /> Preferences
              </button>
              <div className="border-t border-slate-100 my-1" />
              <button
                onClick={() => {
                  logout();
                  setActiveTab('login');
                  setShowProfileMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
              >
                <LogOut className="w-4 h-4 text-rose-500" /> Switch / Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
