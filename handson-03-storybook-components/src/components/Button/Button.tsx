import React from 'react';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** ボタンのバリアント */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  /** ボタンのサイズ */
  size?: 'sm' | 'md' | 'lg';
  /** ローディング状態 */
  loading?: boolean;
  /** 左側アイコン */
  iconLeft?: React.ReactNode;
  /** 右側アイコン */
  iconRight?: React.ReactNode;
  /** 子要素 */
  children: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  primary:
    'bg-fin-primary text-white hover:bg-fin-primary-hover focus:ring-fin-primary/50',
  secondary:
    'bg-white text-fin-secondary border border-fin-border hover:bg-gray-50 focus:ring-fin-secondary/50',
  danger:
    'bg-fin-danger text-white hover:bg-fin-danger-hover focus:ring-fin-danger/50',
  ghost:
    'bg-transparent text-fin-secondary hover:bg-gray-100 focus:ring-gray-300/50',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

/**
 * Button - FinUIの基本ボタンコンポーネント
 *
 * 金融アプリケーション全体で使用される汎用ボタン。
 * 承認、却下、検索などのアクションに使用します。
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        variantStyles[variant],
        sizeStyles[size],
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
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
      )}
      {!loading && iconLeft}
      {children}
      {!loading && iconRight}
    </button>
  );
};

export default Button;
