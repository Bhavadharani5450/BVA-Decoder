import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Breadcrumb {
  label: string;
  tabId?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  action?: React.ReactNode;
  onBreadcrumbClick?: (tabId: string) => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs = [{ label: 'BVA Decoder' }],
  action,
  onBreadcrumbClick,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E5EAF1]">
      <div>
        {/* Breadcrumb path */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
          {breadcrumbs.map((b, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />}
              {b.tabId && onBreadcrumbClick ? (
                <button
                  onClick={() => onBreadcrumbClick(b.tabId!)}
                  className="hover:text-blue-600 transition-colors"
                >
                  {b.label}
                </button>
              ) : (
                <span className={idx === breadcrumbs.length - 1 ? 'font-medium text-slate-800' : ''}>
                  {b.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#172B4D]">
          {title}
        </h1>
        {subtitle && <p className="text-xs sm:text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>

      {/* Action CTA Button Container */}
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
