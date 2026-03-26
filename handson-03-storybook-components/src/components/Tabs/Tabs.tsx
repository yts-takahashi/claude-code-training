import React, { useState } from 'react';
import clsx from 'clsx';

export interface TabItem {
  /** タブのキー */
  key: string;
  /** タブラベル */
  label: string;
  /** アイコン */
  icon?: React.ReactNode;
  /** バッジ（件数表示） */
  badge?: number;
  /** 無効状態 */
  disabled?: boolean;
  /** タブコンテンツ */
  content: React.ReactNode;
}

export interface TabsProps {
  /** タブ項目 */
  items: TabItem[];
  /** デフォルトのアクティブタブキー */
  defaultActiveKey?: string;
  /** アクティブタブキー（制御モード） */
  activeKey?: string;
  /** タブ変更時のコールバック */
  onChange?: (key: string) => void;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * Tabs - タブコンポーネント
 *
 * 融資情報の詳細表示（基本情報/審査情報/担保情報など）、
 * ダッシュボードのビュー切替に使用します。
 * バッジで件数を表示できます。
 */
export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveKey,
  activeKey: controlledActiveKey,
  onChange,
  className,
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState(
    defaultActiveKey || items[0]?.key || ''
  );

  const activeKey = controlledActiveKey ?? internalActiveKey;

  const handleTabClick = (key: string) => {
    if (!controlledActiveKey) setInternalActiveKey(key);
    onChange?.(key);
  };

  const activeItem = items.find((item) => item.key === activeKey);

  return (
    <div className={className}>
      {/* タブヘッダー */}
      <div className="border-b border-fin-border">
        <nav className="flex gap-0 -mb-px">
          {items.map((item) => (
            <button
              key={item.key}
              onClick={() => !item.disabled && handleTabClick(item.key)}
              className={clsx(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
                item.key === activeKey
                  ? 'border-fin-primary text-fin-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                item.disabled && 'opacity-50 cursor-not-allowed'
              )}
              disabled={item.disabled}
            >
              {item.icon}
              {item.label}
              {item.badge != null && (
                <span
                  className={clsx(
                    'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium',
                    item.key === activeKey
                      ? 'bg-fin-primary text-white'
                      : 'bg-gray-100 text-gray-600'
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* タブコンテンツ */}
      <div className="py-4">{activeItem?.content}</div>
    </div>
  );
};

export default Tabs;
