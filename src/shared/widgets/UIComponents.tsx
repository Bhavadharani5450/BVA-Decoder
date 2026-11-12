import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Permission, UserRole } from '../../types';
import { PermissionService } from '../../core/permissions/permissionService';
import {
  AlertTriangle,
  FileQuestion,
  Lock,
  Loader2,
  TrendingUp,
  TrendingDown,
  Info,
} from 'lucide-react';

// ==========================================
// 1. STAT CARD
// ==========================================
interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ElementType;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  description?: string;
  isDemo?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  icon: Icon,
  trend,
  trendDirection = 'up',
  description,
  isDemo = true,
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#E5EAF1] p-5 shadow-2xs hover:shadow-xs transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider font-mono">
          {title}
        </span>
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[#172B4D] font-mono tabular-nums">
          {value}
        </span>
        {unit && <span className="text-xs font-mono font-medium text-slate-500">{unit}</span>}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-1 text-xs mt-2 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2 overflow-hidden">
          {trend && (
            <span
              className={`flex items-center gap-1 font-mono text-[11px] font-semibold shrink-0 ${
                trendDirection === 'up'
                  ? 'text-emerald-600'
                  : trendDirection === 'down'
                  ? 'text-rose-600'
                  : 'text-slate-500'
              }`}
            >
              {trendDirection === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
              {trendDirection === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
              {trend}
            </span>
          )}
          {description && (
            <span className="text-slate-500 text-[11px] truncate font-sans">{description}</span>
          )}
        </div>
        {isDemo && (
          <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
            Demo Stats
          </span>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 2. STATUS BADGE
// ==========================================
interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const s = status.toLowerCase();
  let style = 'bg-slate-100 text-slate-700 border-slate-200';

  if (s === 'completed' || s === 'approved' || s === 'active' || s === 'available') {
    style = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (s === 'running' || s === 'training' || s === 'in progress') {
    style = 'bg-blue-50 text-blue-700 border-blue-200';
  } else if (s === 'queued' || s === 'pending' || s === 'draft') {
    style = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (s === 'failed' || s === 'rejected' || s === 'inactive' || s === 'restricted') {
    style = 'bg-rose-50 text-rose-700 border-rose-200';
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium font-mono border capitalize ${style}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 shrink-0 opacity-70" />
      {status}
    </span>
  );
};

// ==========================================
// 3. EMPTY STATE
// ==========================================
interface EmptyStateProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, action }) => {
  return (
    <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 text-center flex flex-col items-center justify-center min-h-[260px]">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
        <FileQuestion className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-[#172B4D] mb-1">{title}</h3>
      <p className="text-xs text-slate-500 max-w-md mb-4">{description}</p>
      {action}
    </div>
  );
};

// ==========================================
// 4. LOADING STATE
// ==========================================
export const LoadingState: React.FC<{ message?: string }> = ({
  message = 'Processing signals & loading research data...',
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#E5EAF1] p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-3" />
      <p className="text-sm font-semibold text-[#172B4D]">{message}</p>
      <p className="text-xs text-slate-400 mt-1 font-mono">BVA Signal Processing Pipeline</p>
    </div>
  );
};

// ==========================================
// 5. ERROR STATE
// ==========================================
export const ErrorState: React.FC<{
  title?: string;
  message: string;
  onRetry?: () => void;
}> = ({ title = 'Execution Error', message, onRetry }) => {
  return (
    <div className="bg-rose-50/50 border border-rose-200 rounded-xl p-6 text-center flex flex-col items-center justify-center">
      <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-semibold text-rose-900 mb-1">{title}</h3>
      <p className="text-xs text-rose-700 max-w-lg mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-medium hover:bg-rose-700 transition-colors"
        >
          Retry Request
        </button>
      )}
    </div>
  );
};

// ==========================================
// 6. ROLE GUARD & ACCESS DENIED SCREEN
// ==========================================
interface RoleGuardProps {
  requiredPermission?: Permission;
  requiredRoles?: UserRole[];
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  requiredPermission,
  requiredRoles,
  children,
}) => {
  const { currentRole, currentUser, switchRole } = useAuth();

  let hasAccess = true;

  if (requiredRoles && !requiredRoles.includes(currentRole)) {
    hasAccess = false;
  }

  if (requiredPermission && !PermissionService.userCan(currentUser, requiredPermission)) {
    hasAccess = false;
  }

  if (!hasAccess) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-10 text-center max-w-xl mx-auto my-12 shadow-sm">
        <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-[#172B4D] mb-2">Access Denied (403 Unauthorized)</h2>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Your current role (<strong className="capitalize text-slate-900 font-mono">{currentRole}</strong>) does not have sufficient permissions to access this feature or administrative workspace.
        </p>

        <div className="p-3 bg-slate-50 rounded-lg text-left text-xs font-mono text-slate-600 mb-6 space-y-1">
          <div>Required Permission: <span className="text-blue-700 font-semibold">{requiredPermission || 'Role Policy'}</span></div>
          <div>Enforced By: <span className="text-purple-700 font-semibold">PermissionService (Client & FastAPI backend claim check)</span></div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <p className="w-full text-xs text-slate-500 mb-1">Switch to a role with permission:</p>
          <button
            onClick={() => switchRole('admin')}
            className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-medium hover:bg-purple-700 transition-colors"
          >
            Switch to Admin
          </button>
          <button
            onClick={() => switchRole('researcher')}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
          >
            Switch to Researcher
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
