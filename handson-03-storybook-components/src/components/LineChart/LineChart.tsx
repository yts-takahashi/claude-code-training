import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

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
  /** チャートデータ */
  data: Record<string, unknown>[];
  /** X軸のデータキー */
  xAxisKey: string;
  /** 系列定義 */
  series: LineChartSeries[];
  /** チャートの高さ */
  height?: number;
  /** Y軸のフォーマッター */
  yAxisFormatter?: (value: number) => string;
  /** ツールチップのフォーマッター */
  tooltipFormatter?: (value: number) => string;
  /** グリッド表示 */
  showGrid?: boolean;
  /** 凡例表示 */
  showLegend?: boolean;
  /** 追加のCSSクラス */
  className?: string;
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
 * Rechartsベースでレスポンシブ対応です。
 */
export const LineChart: React.FC<LineChartProps> = ({
  data,
  xAxisKey,
  series,
  height = 300,
  yAxisFormatter = formatJPY,
  tooltipFormatter = formatJPY,
  showGrid = true,
  showLegend = true,
  className,
}) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />}
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 12, fill: '#64748B' }}
            tickLine={false}
            axisLine={{ stroke: '#E2E8F0' }}
          />
          <YAxis
            tickFormatter={yAxisFormatter}
            tick={{ fontSize: 12, fill: '#64748B' }}
            tickLine={false}
            axisLine={{ stroke: '#E2E8F0' }}
          />
          <Tooltip
            formatter={(value: number, name: string) => [tooltipFormatter(value), name]}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            }}
          />
          {showLegend && <Legend />}
          {series.map((s, i) => (
            <Line
              key={s.dataKey}
              type="monotone"
              dataKey={s.dataKey}
              name={s.name}
              stroke={s.color || defaultColors[i % defaultColors.length]}
              strokeWidth={2}
              strokeDasharray={s.strokeDasharray}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
