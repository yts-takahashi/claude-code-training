import React from 'react';
import clsx from 'clsx';

export interface FormFieldOption {
  /** 値 */
  value: string;
  /** 表示ラベル */
  label: string;
}

export interface FormFieldProps {
  /** フィールドラベル */
  label: string;
  /** フィールド名 */
  name: string;
  /** 入力タイプ */
  type?: 'text' | 'number' | 'email' | 'password' | 'date' | 'tel' | 'select' | 'textarea';
  /** プレースホルダー */
  placeholder?: string;
  /** 値 */
  value?: string | number;
  /** 値変更コールバック */
  onChange?: (value: string) => void;
  /** エラーメッセージ */
  error?: string;
  /** ヘルパーテキスト */
  helperText?: string;
  /** 必須マーク */
  required?: boolean;
  /** 無効状態 */
  disabled?: boolean;
  /** 読み取り専用 */
  readOnly?: boolean;
  /** セレクトボックスの選択肢 */
  options?: FormFieldOption[];
  /** テキストエリアの行数 */
  rows?: number;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * FormField - フォームフィールドコンポーネント
 *
 * 融資申請フォーム、顧客情報入力、審査コメント入力など、
 * あらゆるフォーム入力に使用します。
 * バリデーションエラーの表示に対応しています。
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  readOnly = false,
  options = [],
  rows = 3,
  className,
}) => {
  const inputClasses = clsx(
    'w-full px-3 py-2 text-sm border rounded-md transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    error
      ? 'border-fin-danger focus:ring-fin-danger/50 focus:border-fin-danger'
      : 'border-fin-border focus:ring-fin-primary/50 focus:border-fin-primary',
    disabled && 'bg-gray-50 cursor-not-allowed',
    readOnly && 'bg-gray-50'
  );

  const renderInput = () => {
    if (type === 'select') {
      return (
        <select
          name={name}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className={inputClasses}
        >
          <option value="">{placeholder || '選択してください'}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (type === 'textarea') {
      return (
        <textarea
          name={name}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          rows={rows}
          className={inputClasses}
        />
      );
    }

    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={inputClasses}
      />
    );
  };

  return (
    <div className={clsx('space-y-1', className)}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-fin-danger ml-1">*</span>}
      </label>
      {renderInput()}
      {error && (
        <p className="text-xs text-fin-danger flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-xs text-gray-400">{helperText}</p>
      )}
    </div>
  );
};

export default FormField;
