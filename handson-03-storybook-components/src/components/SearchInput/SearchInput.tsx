import React, { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';

export interface SearchInputProps {
  /** 検索値 */
  value?: string;
  /** 値変更時のコールバック */
  onChange?: (value: string) => void;
  /** プレースホルダー */
  placeholder?: string;
  /** デバウンス遅延（ms） */
  debounceMs?: number;
  /** ローディング状態 */
  loading?: boolean;
  /** 無効状態 */
  disabled?: boolean;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * SearchInput - 検索入力コンポーネント
 *
 * 融資申請の検索、顧客検索、案件検索などに使用します。
 * デバウンス機能により、入力のたびにAPIを呼ばず
 * パフォーマンスを最適化します。
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value: controlledValue,
  onChange,
  placeholder = '検索...',
  debounceMs = 300,
  loading = false,
  disabled = false,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(controlledValue ?? '');
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onChange?.(newValue);
      }, debounceMs);
    },
    [onChange, debounceMs]
  );

  const handleClear = () => {
    setInternalValue('');
    onChange?.('');
  };

  return (
    <div className={clsx('relative', className)}>
      {/* 検索アイコン */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        type="text"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          'w-full pl-10 pr-10 py-2 text-sm border border-fin-border rounded-md',
          'focus:outline-none focus:ring-2 focus:ring-fin-primary/50 focus:border-fin-primary',
          'placeholder:text-gray-400',
          disabled && 'bg-gray-50 cursor-not-allowed'
        )}
      />

      {/* 右側: ローディング or クリアボタン */}
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        {loading ? (
          <svg
            className="animate-spin h-4 w-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          internalValue && (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default SearchInput;
