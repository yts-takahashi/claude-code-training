import React from 'react';
import clsx from 'clsx';

export type StatusType = 'approved' | 'pending' | 'rejected' | 'processing' | 'expired';

export interface StatusBadgeProps {
  /** ステータス */
  status: StatusType;
  /** サイズ */
  size?: 'sm' | 'md' | 'lg';
  /** 追加のCSSクラス */
  className?: string;
}

const statusConfig: Record<
  StatusType,
  { label: string; bgColor: string; textColor: string; icon: string }
> = {
  approved: {
    label: '承認済',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    icon: 'M5 13l4 4L19 7',
  },
  pending: {
    label: '審査中',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  rejected: {
    label: '却下',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    icon: 'M6 18L18 6M6 6l12 12',
  },
  processing: {
    label: '処理中',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  },
  expired: {
    label: '期限切れ',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z',
  },
};

const sizeStyles: Record<string, { badge: string; icon: string }> = {
  sm: { badge: 'px-2 py-0.5 text-xs', icon: 'w-3 h-3' },
  md: { badge: 'px-2.5 py-1 text-xs', icon: 'w-3.5 h-3.5' },
  lg: { badge: 'px-3 py-1.5 text-sm', icon: 'w-4 h-4' },
};

/**
 * StatusBadge - ステータスバッジコンポーネント
 *
 * 融資申請の承認状態、取引ステータスなどを
 * 視覚的に分かりやすく表示するバッジです。
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className,
}) => {
  const config = statusConfig[status];
  const sizeStyle = sizeStyles[size];

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full font-medium',
        config.bgColor,
        config.textColor,
        sizeStyle.badge,
        className
      )}
    >
      <svg
        className={sizeStyle.icon}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={config.icon} />
      </svg>
      {config.label}
    </span>
  );
};

export default StatusBadge;
