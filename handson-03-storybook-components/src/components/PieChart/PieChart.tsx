import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export interface PieChartDataItem {
  /** ラベル */
  name: string;
  /** 値 */
  value: number;
  /** 色（オプション） */
  color?: string;
}

export interface PieChartProps {
  /** チャートデータ */
  data: PieChartDataItem[];
  /** チャートの高さ */
  height?: number;
  /** ドーナツモード（内径比率 0-1） */
  innerRadius?: number;
  /** 外径比率 */
  outerRadius?: number;
  /** ラベル表示 */
  showLabel?: boolean;
  /** 凡例表示 */
  showLegend?: boolean;
  /** ツールチップのフォーマッター */
  tooltipFormatter?: (value: number) => string;
  /** 追加のCSSクラス */
  className?: string;
}

const defaultColors = ['#1E40AF', '#DC2626', '#16A34A', '#D97706', '#7C3AED', '#0891B2', '#BE185D', '#475569'];

/**
 * PieChart - 円グラフコンポーネント
 *
 * 融資ポートフォリオの内訳、業種別融資比率、
 * 審査結果の割合など、構成比の可視化に使用します。
 * ドーナツモードにも対応しています。
 */
export const PieChart: React.FC<PieChartProps> = ({
  data,
  height = 300,
  innerRadius = 0,
  outerRadius = 100,
  showLabel = true,
  showLegend = true,
  tooltipFormatter = (v) => v.toLocaleString(),
  className,
}) => {
  const renderLabel = ({
    name,
    percent,
  }: {
    name: string;
    percent: number;
  }) => {
    return `${name} ${(percent * 100).toFixed(1)}%`;
  };

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            dataKey="value"
            label={showLabel ? renderLabel : false}
            labelLine={showLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || defaultColors[index % defaultColors.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [tooltipFormatter(value), '']}
            contentStyle={{
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            }}
          />
          {showLegend && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
