import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigation, NavItem } from '../../context/NavigationContext';
import { PermissionService } from '../../core/permissions/permissionService';
import { LogOut, X, Shield, Lock } from 'lucide-react';

export const AppSidebar: React.FC = () => {
  const { currentRole, currentUser, logout } = useAuth();
  const { activeTab, setActiveTab, getNavItemsForRole, isDrawerOpen, setIsDrawerOpen } = useNavigation();

  const navItems = getNavItemsForRole(currentRole);
  const roleBadge = PermissionService.getRoleBadgeColor(currentRole);

  // Group items by category
  const categories: { [key: string]: NavItem[] } = {};
  navItems.forEach((item) => {
    const cat = item.category || 'General';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(item);
  });

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-white border-r border-[#E5EAF1] w-64 shrink-0 shadow-2xs">
      {/* Top: Header / Drawer Close */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider font-mono">
            {currentRole} Workspace
          </span>
        </div>
        <button
          onClick={() => setIsDrawerOpen(false)}
          className="lg:hidden p-1 text-slate-400 hover:text-slate-600 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {Object.entries(categories).map(([category, items]) => (
          <div key={category}>
            {category !== 'General' && (
              <h3 className="px-3 mb-2 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                {category}
              </h3>
            )}
            <div className="space-y-1">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsDrawerOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom: Current User Summary & Logout */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/60">
        <div className="p-2.5 bg-white rounded-lg border border-slate-200/80 shadow-2xs mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-[#172B4D] truncate">
              {currentUser.name}
            </span>
            <span
              className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.2 rounded ${roleBadge.bg} ${roleBadge.text} ${roleBadge.border} border`}
            >
              {currentRole}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 truncate font-mono">
            {currentUser.email}
          </p>
        </div>

        <button
          onClick={() => {
            logout();
            setActiveTab('login');
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Workspace</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block shrink-0 h-[calc(100vh-4rem)] sticky top-16">
        {sidebarContent}
      </aside>

      {/* Mobile / Tablet Drawer */}
      {isDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="relative z-10">{sidebarContent}</div>
        </div>
      )}
    </>
  );
};
