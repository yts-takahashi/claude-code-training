import React from 'react';
import clsx from 'clsx';

export interface CurrencyDisplayProps {
  /** 金額 */
  amount: number;
  /** 通貨コード */
  currency?: 'JPY' | 'USD' | 'EUR';
  /** サイズ */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** 色分け有効（正:緑、負:赤） */
  colorCoded?: boolean;
  /** 変動率（%） */
  changeRate?: number;
  /** 符号表示 */
  showSign?: boolean;
  /** 追加のCSSクラス */
  className?: string;
}

const sizeStyles: Record<string, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl font-semibold',
  xl: 'text-3xl font-bold',
};

const currencySymbols: Record<string, string> = {
  JPY: '¥',
  USD: '$',
  EUR: '€',
};

/**
 * CurrencyDisplay - 通貨表示コンポーネント
 *
 * 融資金額、返済額、残高などの金額を
 * 適切にフォーマットして表示します。
 * 正負による色分けや変動率も表示できます。
 */
export const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({
  amount,
  currency = 'JPY',
  size = 'md',
  colorCoded = false,
  changeRate,
  showSign = false,
  className,
}) => {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const symbol = currencySymbols[currency] || '';

  const formattedAmount =
    currency === 'JPY'
      ? `${symbol}${absAmount.toLocaleString('ja-JP')}`
      : `${symbol}${absAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const displayAmount = `${isNegative ? '-' : showSign && amount > 0 ? '+' : ''}${formattedAmount}`;

  const colorClass = colorCoded
    ? isNegative
      ? 'text-fin-danger'
      : amount > 0
        ? 'text-fin-success'
        : 'text-gray-700'
    : 'text-gray-900';

  return (
    <span className={clsx('inline-flex items-center gap-2', className)}>
      <span className={clsx(sizeStyles[size], colorClass, 'font-mono tabular-nums')}>
        {displayAmount}
      </span>
      {changeRate != null && (
        <span
          className={clsx(
            'inline-flex items-center gap-0.5 text-xs font-medium',
            changeRate >= 0 ? 'text-fin-success' : 'text-fin-danger'
          )}
        >
          {changeRate >= 0 ? (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4l8 8h-6v8h-4v-8H4z" />
            </svg>
          ) : (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 20l-8-8h6V4h4v8h6z" />
            </svg>
          )}
          {changeRate >= 0 ? '+' : ''}
          {changeRate.toFixed(1)}%
        </span>
      )}
    </span>
  );
};

export default CurrencyDisplay;
