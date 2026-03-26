import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';

export interface LineChartSeries {
  /** データキー */
  dataKey: string;
  /** 系列名 */
  name: string;
  /** 線の色 */
  color?: string;
  /** 破線パターン */
  strokeDasharray?: string;
}

export interface LineChartProps {
  data: Record<string, unknown>[];
  xAxisKey: string;
  series: LineChartSeries[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
}

const defaultColors = ['#1E40AF', '#DC2626', '#16A34A', '#D97706', '#7C3AED', '#0891B2'];

/**
 * 日本円フォーマット
 */
const formatJPY = (value: number): string => {
  if (value >= 100000000) return `${(value / 100000000).toFixed(1)}億円`;
  if (value >= 10000) return `${(value / 10000).toFixed(0)}万円`;
  return `¥${value.toLocaleString()}`;
};

/**
 * LineChart - 折れ線グラフコンポーネント
 *
 * 融資残高推移、月次申請件数推移、延滞率推移など、
 * 時系列データの可視化に使用します。
 * Chart.js + ng2-chartsベースでレスポンシブ対応です。
 */
@Component({
  selector: 'fin-line-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './line-chart.component.html',
})
export class LineChartComponent implements OnChanges {
  @Input() data: Record<string, unknown>[] = [];
  @Input() xAxisKey = '';
  @Input() series: LineChartSeries[] = [];
  @Input() height = 300;
  @Input() yAxisFormatter: ((value: number) => string) | null = null;
  @Input() tooltipFormatter: ((value: number) => string) | null = null;
  @Input() showGrid = true;
  @Input() showLegend = true;
  @Input() className = '';

  chartData: ChartData<'line'> = { labels: [], datasets: [] };
  chartOptions: ChartConfiguration<'line'>['options'] = {};

  private getFormatter(): (value: number) => string {
    return this.yAxisFormatter || formatJPY;
  }

  private getTooltipFormatter(): (value: number) => string {
    return this.tooltipFormatter || formatJPY;
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.updateChart();
  }

  private updateChart(): void {
    const labels = this.data.map((d) => String(d[this.xAxisKey] ?? ''));
    const datasets = this.series.map((s, i) => {
      const color = s.color || defaultColors[i % defaultColors.length];
      const borderDash = s.strokeDasharray ? s.strokeDasharray.split(' ').map(Number) : [];
      return {
        label: s.name,
        data: this.data.map((d) => Number(d[s.dataKey] ?? 0)),
        borderColor: color,
        backgroundColor: color,
        borderWidth: 2,
        borderDash,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.3,
        fill: false,
      };
    });

    this.chartData = { labels, datasets };

    const formatter = this.getFormatter();
    const tipFormatter = this.getTooltipFormatter();

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: this.showLegend,
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const value = context.parsed.y;
              return `${label}: ${tipFormatter(value)}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: this.showGrid, color: '#E2E8F0' },
          ticks: { font: { size: 12 }, color: '#64748B' },
          border: { color: '#E2E8F0' },
        },
        y: {
          grid: { display: this.showGrid, color: '#E2E8F0' },
          ticks: {
            font: { size: 12 },
            color: '#64748B',
            callback: (value) => formatter(Number(value)),
          },
          border: { color: '#E2E8F0' },
        },
      },
    };
  }
}
