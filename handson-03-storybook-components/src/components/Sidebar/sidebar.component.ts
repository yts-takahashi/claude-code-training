import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SidebarSubItem {
  key: string;
  label: string;
  href?: string;
}

export interface SidebarItem {
  key: string;
  label: string;
  iconPath: string;
  href?: string;
  children?: SidebarSubItem[];
  badge?: number;
}

export interface SidebarProps {
  items: SidebarItem[];
  activeKey?: string;
  collapsed?: boolean;
}

/**
 * Sidebar - サイドバーナビゲーションコンポーネント
 *
 * 金融システムのメイン画面ナビゲーションとして使用します。
 * 折りたたみ対応で、サブメニューも表示できます。
 */
@Component({
  selector: 'fin-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() items: SidebarItem[] = [];
  @Input() activeKey?: string;
  @Input() collapsed = false;
  @Input() className = '';

  @Output() itemClick = new EventEmitter<string>();
  @Output() collapsedChange = new EventEmitter<boolean>();

  expandedKeys: string[] = [];

  get sidebarClasses(): string {
    const classes = [
      'flex flex-col bg-gray-900 text-white transition-all duration-300',
      this.collapsed ? 'w-16' : 'w-64',
    ];
    if (this.className) classes.push(this.className);
    return classes.join(' ');
  }

  get collapseIconPath(): string {
    return this.collapsed
      ? 'M13 5l7 7-7 7M5 5l7 7-7 7'
      : 'M11 19l-7-7 7-7M19 19l-7-7 7-7';
  }

  toggleCollapse(): void {
    this.collapsedChange.emit(!this.collapsed);
  }

  toggleExpand(key: string): void {
    if (this.expandedKeys.includes(key)) {
      this.expandedKeys = this.expandedKeys.filter((k) => k !== key);
    } else {
      this.expandedKeys = [...this.expandedKeys, key];
    }
  }

  isExpanded(key: string): boolean {
    return this.expandedKeys.includes(key);
  }

  hasChildren(item: SidebarItem): boolean {
    return !!item.children && item.children.length > 0;
  }

  onItemClick(item: SidebarItem): void {
    if (this.hasChildren(item) && !this.collapsed) {
      this.toggleExpand(item.key);
    }
    this.itemClick.emit(item.key);
  }

  onSubItemClick(key: string): void {
    this.itemClick.emit(key);
  }

  getItemClasses(item: SidebarItem): string {
    const classes = [
      'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
    ];
    if (this.activeKey === item.key) {
      classes.push('bg-fin-primary text-white');
    } else {
      classes.push('text-gray-300 hover:bg-gray-800 hover:text-white');
    }
    if (this.collapsed) classes.push('justify-center');
    return classes.join(' ');
  }

  getSubItemClasses(key: string): string {
    const classes = [
      'w-full text-left pl-12 pr-4 py-2 text-sm transition-colors',
    ];
    if (this.activeKey === key) {
      classes.push('text-white bg-gray-800');
    } else {
      classes.push('text-gray-400 hover:text-white hover:bg-gray-800');
    }
    return classes.join(' ');
  }
}
