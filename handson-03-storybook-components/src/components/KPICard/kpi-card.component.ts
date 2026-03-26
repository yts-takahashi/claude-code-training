import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  changeRate?: number;
  changeLabel?: string;
  sparklineData?: number[];
  tooltip?: string;
}

/**
 * KPICard - 主要業績指標を表示するカードコンポーネント
 *
 * 融資残高、延滞率、新規申請件数などのKPIを
 * 見やすく表示します。前期比やスパークラインで
 * トレンドも一目で把握できます。
 */
@Component({
  selector: 'fin-kpi-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-card.component.html',
})
export class KPICardComponent {
  @Input() title = '';
  @Input() value: string | number = '';
  @Input() unit?: string;
  @Input() changeRate?: number;
  @Input() changeLabel = '前期比';
  @Input() sparklineData?: number[];
  @Input() tooltip?: string;
  @Input() className = '';

  get formattedValue(): string {
    return typeof this.value === 'number' ? this.value.toLocaleString() : this.value;
  }

  get isPositive(): boolean {
    return this.changeRate != null && this.changeRate >= 0;
  }

  get isNegative(): boolean {
    return this.changeRate != null && this.changeRate < 0;
  }

  get changeRateFormatted(): string {
    if (this.changeRate == null) return '';
    return `${this.isPositive ? '+' : ''}${this.changeRate.toFixed(1)}%`;
  }

  get sparklineSvgPoints(): string {
    if (!this.sparklineData || this.sparklineData.length < 2) return '';
    const max = Math.max(...this.sparklineData);
    const min = Math.min(...this.sparklineData);
    const range = max - min || 1;
    const width = 120;
    const height = 32;
    return this.sparklineData
      .map((v, i) => {
        const x = (i / (this.sparklineData!.length - 1)) * width;
        const y = height - ((v - min) / range) * height;
        return `${x},${y}`;
      })
      .join(' ');
  }

  get sparklineColor(): string {
    return this.isNegative ? '#DC2626' : '#16A34A';
  }

  get hasSparkline(): boolean {
    return !!this.sparklineData && this.sparklineData.length >= 2;
  }

  get cardClasses(): string {
    const classes = ['bg-white rounded-lg border border-fin-border p-5 hover:shadow-md transition-shadow'];
    if (this.className) classes.push(this.className);
    return classes.join(' ');
  }
}
