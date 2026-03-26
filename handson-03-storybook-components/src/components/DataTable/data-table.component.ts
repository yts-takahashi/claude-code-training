import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Column {
  /** カラムキー */
  key: string;
  /** ヘッダーラベル */
  header: string;
  /** ソート可能かどうか */
  sortable?: boolean;
  /** カラム幅 */
  width?: string;
  /** カスタムセルテンプレートRef */
  cellTemplate?: TemplateRef<unknown>;
}

export interface DataTableProps {
  data: Record<string, unknown>[];
  columns: Column[];
  rowKey: string;
  pagination?: boolean;
  pageSize?: number;
  selectable?: 'single' | 'multiple' | false;
  selectedKeys?: Array<string | number>;
  loading?: boolean;
  skeletonRows?: number;
  emptyMessage?: string;
}

type SortDirection = 'asc' | 'desc' | null;

/**
 * DataTable - データテーブルコンポーネント
 *
 * 融資一覧、審査案件リスト、取引履歴など、
 * 金融データの表示に最適化されたテーブルです。
 * ソート、ページネーション、行選択をサポートします。
 */
@Component({
  selector: 'fin-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent {
  @Input() data: Record<string, unknown>[] = [];
  @Input() columns: Column[] = [];
  @Input() rowKey = 'id';
  @Input() pagination = false;
  @Input() pageSize = 10;
  @Input() selectable: 'single' | 'multiple' | false = false;
  @Input() selectedKeys: Array<string | number> = [];
  @Input() loading = false;
  @Input() skeletonRows = 5;
  @Input() emptyMessage = 'データがありません';
  @Input() className = '';

  @Output() selectionChange = new EventEmitter<Array<string | number>>();
  @Output() rowClick = new EventEmitter<Record<string, unknown>>();

  sortKey: string | null = null;
  sortDirection: SortDirection = null;
  currentPage = 1;

  get sortedData(): Record<string, unknown>[] {
    if (!this.sortKey || !this.sortDirection) return this.data;
    return [...this.data].sort((a, b) => {
      const aVal = a[this.sortKey!];
      const bVal = b[this.sortKey!];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = String(aVal).localeCompare(String(bVal), 'ja', { numeric: true });
      return this.sortDirection === 'asc' ? cmp : -cmp;
    });
  }

  get totalPages(): number {
    return this.pagination ? Math.ceil(this.sortedData.length / this.pageSize) : 1;
  }

  get paginatedData(): Record<string, unknown>[] {
    if (!this.pagination) return this.sortedData;
    const start = (this.currentPage - 1) * this.pageSize;
    return this.sortedData.slice(start, start + this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get skeletonRowsArray(): number[] {
    return Array.from({ length: this.skeletonRows }, (_, i) => i);
  }

  get rangeStart(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get rangeEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.sortedData.length);
  }

  get allSelected(): boolean {
    if (this.paginatedData.length === 0) return false;
    return this.paginatedData.every((row) =>
      this.selectedKeys.includes(row[this.rowKey] as string | number)
    );
  }

  get containerClasses(): string {
    const classes = ['bg-white rounded-lg border border-fin-border overflow-hidden'];
    if (this.className) classes.push(this.className);
    return classes.join(' ');
  }

  handleSort(key: string): void {
    if (this.sortKey === key) {
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        this.sortKey = null;
        this.sortDirection = null;
      }
    } else {
      this.sortKey = key;
      this.sortDirection = 'asc';
    }
    this.currentPage = 1;
  }

  handleSelect(key: string | number): void {
    if (!this.selectable) return;
    if (this.selectable === 'single') {
      this.selectionChange.emit(this.selectedKeys.includes(key) ? [] : [key]);
    } else {
      this.selectionChange.emit(
        this.selectedKeys.includes(key)
          ? this.selectedKeys.filter((k) => k !== key)
          : [...this.selectedKeys, key]
      );
    }
  }

  handleSelectAll(): void {
    if (this.selectable !== 'multiple') return;
    const allKeys = this.paginatedData.map((row) => row[this.rowKey] as string | number);
    const allSelected = allKeys.every((k) => this.selectedKeys.includes(k));
    this.selectionChange.emit(allSelected ? [] : allKeys);
  }

  isSelected(row: Record<string, unknown>): boolean {
    return this.selectedKeys.includes(row[this.rowKey] as string | number);
  }

  onRowClick(row: Record<string, unknown>): void {
    this.rowClick.emit(row);
  }

  getCellValue(row: Record<string, unknown>, key: string): string {
    return String(row[key] ?? '');
  }

  getSortIconClass(columnKey: string, direction: 'asc' | 'desc'): string {
    const isActive = this.sortKey === columnKey && this.sortDirection === direction;
    return `w-3 h-3 ${isActive ? 'text-fin-primary' : 'text-gray-300'}${direction === 'desc' ? ' -mt-1' : ''}`;
  }

  getSkeletonWidth(): string {
    return `${60 + Math.random() * 30}%`;
  }

  setPage(page: number): void {
    this.currentPage = page;
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  onCheckboxClick(event: Event): void {
    event.stopPropagation();
  }
}
