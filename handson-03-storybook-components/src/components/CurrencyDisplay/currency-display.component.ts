import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CurrencyDisplayProps {
  amount: number;
  currency?: 'JPY' | 'USD' | 'EUR';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  colorCoded?: boolean;
  changeRate?: number;
  showSign?: boolean;
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
 */
@Component({
  selector: 'fin-currency-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currency-display.component.html',
})
export class CurrencyDisplayComponent {
  @Input() amount = 0;
  @Input() currency: 'JPY' | 'USD' | 'EUR' = 'JPY';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() colorCoded = false;
  @Input() changeRate?: number;
  @Input() showSign = false;
  @Input() className = '';

  get isNegative(): boolean {
    return this.amount < 0;
  }

  get displayAmount(): string {
    const absAmount = Math.abs(this.amount);
    const symbol = currencySymbols[this.currency] || '';
    const formattedAmount =
      this.currency === 'JPY'
        ? `${symbol}${absAmount.toLocaleString('ja-JP')}`
        : `${symbol}${absAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return `${this.isNegative ? '-' : this.showSign && this.amount > 0 ? '+' : ''}${formattedAmount}`;
  }

  get colorClass(): string {
    if (!this.colorCoded) return 'text-gray-900';
    if (this.isNegative) return 'text-fin-danger';
    if (this.amount > 0) return 'text-fin-success';
    return 'text-gray-700';
  }

  get sizeClass(): string {
    return sizeStyles[this.size];
  }

  get changeRateFormatted(): string {
    if (this.changeRate == null) return '';
    return `${this.changeRate >= 0 ? '+' : ''}${this.changeRate.toFixed(1)}%`;
  }

  get changeRateColorClass(): string {
    if (this.changeRate == null) return '';
    return this.changeRate >= 0 ? 'text-fin-success' : 'text-fin-danger';
  }

  get isChangePositive(): boolean {
    return this.changeRate != null && this.changeRate >= 0;
  }
}
