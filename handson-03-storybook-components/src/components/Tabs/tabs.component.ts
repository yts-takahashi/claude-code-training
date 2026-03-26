import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabItem {
  /** タブのキー */
  key: string;
  /** タブラベル */
  label: string;
  /** バッジ（件数表示） */
  badge?: number;
  /** 無効状態 */
  disabled?: boolean;
  /** タブコンテンツテンプレート */
  contentTemplate?: TemplateRef<unknown>;
}

export interface TabsProps {
  items: TabItem[];
  defaultActiveKey?: string;
  activeKey?: string;
}

/**
 * Tabs - タブコンポーネント
 *
 * 融資情報の詳細表示（基本情報/審査情報/担保情報など）、
 * ダッシュボードのビュー切替に使用します。
 * バッジで件数を表示できます。
 */
@Component({
  selector: 'fin-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
})
export class TabsComponent {
  @Input() items: TabItem[] = [];
  @Input() defaultActiveKey?: string;
  @Input() activeKey?: string;
  @Input() className = '';

  @Output() tabChange = new EventEmitter<string>();

  private internalActiveKey = '';

  get currentActiveKey(): string {
    return this.activeKey ?? this.internalActiveKey || this.defaultActiveKey || this.items[0]?.key || '';
  }

  get activeItem(): TabItem | undefined {
    return this.items.find((item) => item.key === this.currentActiveKey);
  }

  onTabClick(key: string, disabled?: boolean): void {
    if (disabled) return;
    if (!this.activeKey) {
      this.internalActiveKey = key;
    }
    this.tabChange.emit(key);
  }

  getTabClasses(item: TabItem): string {
    const classes = [
      'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors',
    ];
    if (item.key === this.currentActiveKey) {
      classes.push('border-fin-primary text-fin-primary');
    } else {
      classes.push('border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300');
    }
    if (item.disabled) {
      classes.push('opacity-50 cursor-not-allowed');
    }
    return classes.join(' ');
  }

  getBadgeClasses(item: TabItem): string {
    const base = 'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-medium';
    return item.key === this.currentActiveKey
      ? `${base} bg-fin-primary text-white`
      : `${base} bg-gray-100 text-gray-600`;
  }
}
