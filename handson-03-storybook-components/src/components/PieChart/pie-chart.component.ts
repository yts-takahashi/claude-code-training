import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

export interface PieChartDataItem {
  /** ラベル */
  name: string;
  /** 値 */
  value: number;
  /** 色（オプション） */
  color?: string;
}

export interface PieChartProps {
  data: PieChartDataItem[];
  height?: number;
  innerRadius?: number;
  outerRadius?: number;
  showLabel?: boolean;
  showLegend?: boolean;
  tooltipFormatter?: (value: number) => string;
}

const defaultColors = ['#1E40AF', '#DC2626', '#16A34A', '#D97706', '#7C3AED', '#0891B2', '#BE185D', '#475569'];

/**
 * PieChart - 円グラフコンポーネント
 *
 * 融資ポートフォリオの内訳、業種別融資比率、
 * 審査結果の割合など、構成比の可視化に使用します。
 * ドーナツモードにも対応しています。
 */
@Component({
  selector: 'fin-pie-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './pie-chart.component.html',
})
export class PieChartComponent implements OnChanges {
  @Input() data: PieChartDataItem[] = [];
  @Input() height = 300;
  @Input() innerRadius = 0;
  @Input() outerRadius = 100;
  @Input() showLabel = true;
  @Input() showLegend = true;
  @Input() tooltipFormatter: ((value: number) => string) | null = null;
  @Input() className = '';

  chartData: ChartData<'doughnut'> = { labels: [], datasets: [] };
  chartOptions: ChartConfiguration<'doughnut'>['options'] = {};

  ngOnChanges(_changes: SimpleChanges): void {
    this.updateChart();
  }

  private getTooltipFormatter(): (value: number) => string {
    return this.tooltipFormatter || ((v: number) => v.toLocaleString());
  }

  private updateChart(): void {
    const labels = this.data.map((d) => d.name);
    const values = this.data.map((d) => d.value);
    const colors = this.data.map((d, i) => d.color || defaultColors[i % defaultColors.length]);
    const tipFormatter = this.getTooltipFormatter();

    // Calculate cutout percentage from innerRadius/outerRadius ratio
    const cutout = this.innerRadius > 0 ? `${(this.innerRadius / this.outerRadius) * 100}%` : '0%';

    this.chartData = {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: '#ffffff',
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      cutout,
      plugins: {
        legend: {
          display: this.showLegend,
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed;
              const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
              const pct = ((value / total) * 100).toFixed(1);
              return `${label}: ${tipFormatter(value)} (${pct}%)`;
            },
          },
        },
      },
    };
  }
}
