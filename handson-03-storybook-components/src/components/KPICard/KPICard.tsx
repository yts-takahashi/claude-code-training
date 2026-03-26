import React from 'react';
import clsx from 'clsx';

export interface KPICardProps {
  /** KPIのタイトル */
  title: string;
  /** KPIの値 */
  value: string | number;
  /** 単位 */
  unit?: string;
  /** 前期比の変動率（%） */
  changeRate?: number;
  /** 前期比のラベル */
  changeLabel?: string;
  /** スパークラインデータ */
  sparklineData?: number[];
  /** ツールチップテキスト */
  tooltip?: string;
  /** アイコン */
  icon?: React.ReactNode;
  /** 追加のCSSクラス */
  className?: string;
}

/**
 * KPICard - 主要業績指標を表示するカードコンポーネント
 *
 * 融資残高、延滞率、新規申請件数などのKPIを
 * 見やすく表示します。前期比やスパークラインで
 * トレンドも一目で把握できます。
 */
export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  unit,
  changeRate,
  changeLabel = '前期比',
  sparklineData,
  tooltip,
  icon,
  className,
}) => {
  const isPositive = changeRate != null && changeRate >= 0;
  const isNegative = changeRate != null && changeRate < 0;

  const renderSparkline = () => {
    if (!sparklineData || sparklineData.length < 2) return null;
    const max = Math.max(...sparklineData);
    const min = Math.min(...sparklineData);
    const range = max - min || 1;
    const width = 120;
    const height = 32;
    const points = sparklineData
      .map((v, i) => {
        const x = (i / (sparklineData.length - 1)) * width;
        const y = height - ((v - min) / range) * height;
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <svg width={width} height={height} className="mt-2">
        <polyline
          fill="none"
          stroke={isNegative ? '#DC2626' : '#16A34A'}
          strokeWidth="2"
          points={points}
        />
      </svg>
    );
  };

  return (
    <div
      className={clsx(
        'bg-white rounded-lg border border-fin-border p-5 hover:shadow-md transition-shadow',
        className
      )}
      title={tooltip}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </span>
            {unit && <span className="text-sm text-gray-500">{unit}</span>}
          </div>
        </div>
        {icon && (
          <div className="flex-shrink-0 p-2 bg-blue-50 rounded-lg text-fin-primary">
            {icon}
          </div>
        )}
      </div>

      {changeRate != null && (
        <div className="mt-3 flex items-center gap-1">
          {isPositive && (
            <svg className="w-4 h-4 text-fin-success" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4l8 8h-6v8h-4v-8H4z" />
            </svg>
          )}
          {isNegative && (
            <svg className="w-4 h-4 text-fin-danger" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 20l-8-8h6V4h4v8h6z" />
            </svg>
          )}
          <span
            className={clsx(
              'text-sm font-medium',
              isPositive && 'text-fin-success',
              isNegative && 'text-fin-danger'
            )}
          >
            {isPositive ? '+' : ''}
            {changeRate.toFixed(1)}%
          </span>
          <span className="text-xs text-gray-400 ml-1">{changeLabel}</span>
        </div>
      )}

      {renderSparkline()}
    </div>
  );
};

export default KPICard;
