import React, { useState } from 'react';
import clsx from 'clsx';

export interface SidebarSubItem {
  /** キー */
  key: string;
  /** ラベル */
  label: string;
  /** リンク先 */
  href?: string;
}

export interface SidebarItem {
  /** キー */
  key: string;
  /** ラベル */
  label: string;
  /** アイコン */
  icon: React.ReactNode;
  /** リンク先 */
  href?: string;
  /** サブメニュー */
  children?: SidebarSubItem[];
  /** バッジ */
  badge?: number;
}

export interface SidebarProps {
  /** メニュー項目 */
  items: SidebarItem[];
  /** アクティブなメニューキー */
  activeKey?: string;
  /** メニュークリック時のコールバック */
  onItemClick?: (key: string) => void;
  /** 折りたたみ状態 */
  collapsed?: boolean;
  /** 折りたたみ切替コールバック */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** ヘッダー要素 */
  header?: React.ReactNode;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * Sidebar - サイドバーナビゲーションコンポーネント
 *
 * 金融システムのメイン画面ナビゲーションとして使用します。
 * 折りたたみ対応で、サブメニューも表示できます。
 */
export const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeKey,
  onItemClick,
  collapsed = false,
  onCollapsedChange,
  header,
  className,
}) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const toggleExpand = (key: string) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <aside
      className={clsx(
        'flex flex-col bg-gray-900 text-white transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* ヘッダー */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        {!collapsed && (header || <span className="text-lg font-bold">FinUI</span>)}
        <button
          onClick={() => onCollapsedChange?.(!collapsed)}
          className="p-1 rounded hover:bg-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={collapsed ? 'M13 5l7 7-7 7M5 5l7 7-7 7' : 'M11 19l-7-7 7-7M19 19l-7-7 7-7'}
            />
          </svg>
        </button>
      </div>

      {/* メニュー */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {items.map((item) => {
          const isActive = activeKey === item.key;
          const isExpanded = expandedKeys.includes(item.key);
          const hasChildren = item.children && item.children.length > 0;

          return (
            <div key={item.key}>
              <button
                onClick={() => {
                  if (hasChildren && !collapsed) {
                    toggleExpand(item.key);
                  }
                  onItemClick?.(item.key);
                }}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                  isActive
                    ? 'bg-fin-primary text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white',
                  collapsed && 'justify-center'
                )}
                title={collapsed ? item.label : undefined}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge != null && (
                      <span className="px-2 py-0.5 text-xs bg-fin-danger rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {hasChildren && (
                      <svg
                        className={clsx('w-4 h-4 transition-transform', isExpanded && 'rotate-90')}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </>
                )}
              </button>

              {/* サブメニュー */}
              {hasChildren && isExpanded && !collapsed && (
                <div className="bg-gray-950">
                  {item.children!.map((child) => (
                    <button
                      key={child.key}
                      onClick={() => onItemClick?.(child.key)}
                      className={clsx(
                        'w-full text-left pl-12 pr-4 py-2 text-sm transition-colors',
                        activeKey === child.key
                          ? 'text-white bg-gray-800'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      )}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
