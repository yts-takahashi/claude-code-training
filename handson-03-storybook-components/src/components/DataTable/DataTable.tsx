import React, { useState, useMemo } from 'react';
import clsx from 'clsx';

export interface Column<T> {
  /** カラムキー */
  key: string;
  /** ヘッダーラベル */
  header: string;
  /** ソート可能かどうか */
  sortable?: boolean;
  /** カラム幅 */
  width?: string;
  /** カスタムセルレンダラー */
  render?: (value: T[keyof T], row: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  /** テーブルデータ */
  data: T[];
  /** カラム定義 */
  columns: Column<T>[];
  /** 行のユニークキー */
  rowKey: keyof T;
  /** ページネーション有効化 */
  pagination?: boolean;
  /** 1ページあたりの行数 */
  pageSize?: number;
  /** 行選択モード */
  selectable?: 'single' | 'multiple' | false;
  /** 選択された行キーの配列 */
  selectedKeys?: Array<string | number>;
  /** 行選択時のコールバック */
  onSelectionChange?: (keys: Array<string | number>) => void;
  /** 行クリック時のコールバック */
  onRowClick?: (row: T) => void;
  /** ローディング状態 */
  loading?: boolean;
  /** ローディング時のスケルトン行数 */
  skeletonRows?: number;
  /** データが空の場合のメッセージ */
  emptyMessage?: string;
  /** 追加のCSSクラス */
  className?: string;
}

type SortDirection = 'asc' | 'desc' | null;

/**
 * DataTable - ジェネリクス対応のデータテーブルコンポーネント
 *
 * 融資一覧、審査案件リスト、取引履歴など、
 * 金融データの表示に最適化されたテーブルです。
 * ソート、ページネーション、行選択をサポートします。
 */
export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  rowKey,
  pagination = false,
  pageSize = 10,
  selectable = false,
  selectedKeys = [],
  onSelectionChange,
  onRowClick,
  loading = false,
  skeletonRows = 5,
  emptyMessage = 'データがありません',
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else if (sortDirection === 'desc') {
        setSortKey(null);
        setSortDirection(null);
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      const cmp = String(aVal).localeCompare(String(bVal), 'ja', { numeric: true });
      return sortDirection === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDirection]);

  const totalPages = pagination ? Math.ceil(sortedData.length / pageSize) : 1;
  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  const handleSelect = (key: string | number) => {
    if (!selectable || !onSelectionChange) return;
    if (selectable === 'single') {
      onSelectionChange(selectedKeys.includes(key) ? [] : [key]);
    } else {
      onSelectionChange(
        selectedKeys.includes(key)
          ? selectedKeys.filter((k) => k !== key)
          : [...selectedKeys, key]
      );
    }
  };

  const handleSelectAll = () => {
    if (!onSelectionChange || selectable !== 'multiple') return;
    const allKeys = paginatedData.map((row) => row[rowKey] as string | number);
    const allSelected = allKeys.every((k) => selectedKeys.includes(k));
    onSelectionChange(allSelected ? [] : allKeys);
  };

  const SortIcon = ({ columnKey }: { columnKey: string }) => (
    <span className="ml-1 inline-flex flex-col">
      <svg
        className={clsx('w-3 h-3', sortKey === columnKey && sortDirection === 'asc' ? 'text-fin-primary' : 'text-gray-300')}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 5l7 7H5z" />
      </svg>
      <svg
        className={clsx('w-3 h-3 -mt-1', sortKey === columnKey && sortDirection === 'desc' ? 'text-fin-primary' : 'text-gray-300')}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 19l-7-7h14z" />
      </svg>
    </span>
  );

  if (loading) {
    return (
      <div className={clsx('bg-white rounded-lg border border-fin-border overflow-hidden', className)}>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: skeletonRows }).map((_, i) => (
              <tr key={i} className="border-t border-fin-border">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: `${60 + Math.random() * 30}%` }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={clsx('bg-white rounded-lg border border-fin-border p-12 text-center', className)}>
        <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p className="mt-4 text-sm text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={clsx('bg-white rounded-lg border border-fin-border overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="px-4 py-3 w-10">
                  {selectable === 'multiple' && (
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={paginatedData.length > 0 && paginatedData.every((row) => selectedKeys.includes(row[rowKey] as string | number))}
                      onChange={handleSelectAll}
                    />
                  )}
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={clsx(
                    'px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                    col.sortable && 'cursor-pointer select-none hover:text-gray-700'
                  )}
                  style={{ width: col.width }}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center">
                    {col.header}
                    {col.sortable && <SortIcon columnKey={col.key} />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-fin-border">
            {paginatedData.map((row, rowIndex) => {
              const key = row[rowKey] as string | number;
              const isSelected = selectedKeys.includes(key);
              return (
                <tr
                  key={key}
                  className={clsx(
                    'transition-colors',
                    isSelected ? 'bg-blue-50' : 'hover:bg-gray-50',
                    onRowClick && 'cursor-pointer'
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <input
                        type={selectable === 'multiple' ? 'checkbox' : 'radio'}
                        className="rounded border-gray-300"
                        checked={isSelected}
                        onChange={() => handleSelect(key)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-sm text-gray-700">
                      {col.render
                        ? col.render(row[col.key] as T[keyof T], row, rowIndex)
                        : String(row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-fin-border bg-gray-50">
          <p className="text-sm text-gray-500">
            全{sortedData.length}件中 {(currentPage - 1) * pageSize + 1}-
            {Math.min(currentPage * pageSize, sortedData.length)}件表示
          </p>
          <div className="flex gap-1">
            <button
              className="px-3 py-1 text-sm rounded border border-fin-border bg-white hover:bg-gray-50 disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              前へ
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={clsx(
                  'px-3 py-1 text-sm rounded border',
                  page === currentPage
                    ? 'bg-fin-primary text-white border-fin-primary'
                    : 'border-fin-border bg-white hover:bg-gray-50'
                )}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="px-3 py-1 text-sm rounded border border-fin-border bg-white hover:bg-gray-50 disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              次へ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
