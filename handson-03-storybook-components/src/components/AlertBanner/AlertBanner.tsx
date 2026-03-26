import React, { useState } from 'react';
import clsx from 'clsx';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface AlertBannerProps {
  /** アラートタイプ */
  type: AlertType;
  /** タイトル */
  title?: string;
  /** メッセージ */
  message: string;
  /** 閉じるボタン表示 */
  closable?: boolean;
  /** 閉じた時のコールバック */
  onClose?: () => void;
  /** アクションボタンテキスト */
  actionText?: string;
  /** アクションボタンクリック時のコールバック */
  onAction?: () => void;
  /** 追加のCSSクラス */
  className?: string;
}

const typeConfig: Record<AlertType, { bg: string; border: string; icon: string; iconColor: string; titleColor: string }> = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-800',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    iconColor: 'text-green-500',
    titleColor: 'text-green-800',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    iconColor: 'text-yellow-500',
    titleColor: 'text-yellow-800',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    iconColor: 'text-red-500',
    titleColor: 'text-red-800',
    icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
};

/**
 * AlertBanner - アラートバナーコンポーネント
 *
 * 重要な通知、エラー表示、成功メッセージ、
 * 注意喚起などに使用するバナーです。
 * アクションボタンで対応操作を促すこともできます。
 */
export const AlertBanner: React.FC<AlertBannerProps> = ({
  type,
  title,
  message,
  closable = false,
  onClose,
  actionText,
  onAction,
  className,
}) => {
  const [visible, setVisible] = useState(true);
  const config = typeConfig[type];

  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <div
      className={clsx(
        'flex items-start gap-3 px-4 py-3 rounded-md border',
        config.bg,
        config.border,
        className
      )}
      role="alert"
    >
      <svg
        className={clsx('w-5 h-5 flex-shrink-0 mt-0.5', config.iconColor)}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={config.icon} />
      </svg>

      <div className="flex-1 min-w-0">
        {title && (
          <p className={clsx('text-sm font-semibold', config.titleColor)}>{title}</p>
        )}
        <p className={clsx('text-sm', title ? 'mt-1 text-gray-600' : config.titleColor)}>
          {message}
        </p>
        {actionText && (
          <button
            onClick={onAction}
            className={clsx('mt-2 text-sm font-medium underline', config.titleColor)}
          >
            {actionText}
          </button>
        )}
      </div>

      {closable && (
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 rounded hover:bg-black/5"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AlertBanner;
