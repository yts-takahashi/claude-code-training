import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

export type NotificationType = 'info' | 'warning' | 'error' | 'success';

export interface NotificationItem {
  /** ID */
  id: string;
  /** タイトル */
  title: string;
  /** メッセージ */
  message: string;
  /** タイプ */
  type: NotificationType;
  /** 日時 */
  timestamp: string;
  /** 既読フラグ */
  read: boolean;
}

export interface NotificationBellProps {
  /** 通知一覧 */
  notifications: NotificationItem[];
  /** 既読切替コールバック */
  onMarkAsRead?: (id: string) => void;
  /** 全件既読コールバック */
  onMarkAllAsRead?: () => void;
  /** 通知クリックコールバック */
  onNotificationClick?: (notification: NotificationItem) => void;
  /** 追加のCSSクラス */
  className?: string;
}

const typeIconPaths: Record<NotificationType, string> = {
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
};

const typeColors: Record<NotificationType, string> = {
  info: 'text-blue-500',
  warning: 'text-yellow-500',
  error: 'text-red-500',
  success: 'text-green-500',
};

/**
 * NotificationBell - 通知ベルコンポーネント
 *
 * 融資承認通知、期限切れアラート、システム通知など、
 * 重要な通知をユーザーに届けるベルアイコンです。
 */
export const NotificationBell: React.FC<NotificationBellProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onNotificationClick,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={clsx('relative', className)} ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-xs font-bold text-white bg-fin-danger rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-fin-border z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-fin-border">
            <h4 className="text-sm font-semibold text-gray-900">通知</h4>
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="text-xs text-fin-primary hover:underline"
              >
                すべて既読にする
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="px-4 py-8 text-sm text-gray-400 text-center">通知はありません</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={clsx(
                    'flex gap-3 px-4 py-3 border-b border-fin-border last:border-0 cursor-pointer hover:bg-gray-50',
                    !notification.read && 'bg-blue-50/50'
                  )}
                  onClick={() => {
                    onMarkAsRead?.(notification.id);
                    onNotificationClick?.(notification);
                  }}
                >
                  <svg
                    className={clsx('w-5 h-5 flex-shrink-0 mt-0.5', typeColors[notification.type])}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={typeIconPaths[notification.type]} />
                  </svg>
                  <div className="flex-1 min-w-0">
                    <p className={clsx('text-sm', !notification.read ? 'font-semibold text-gray-900' : 'text-gray-700')}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-fin-primary rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
