import React from 'react';
import clsx from 'clsx';

export type TimelineStepStatus = 'completed' | 'current' | 'upcoming';

export interface TimelineStep {
  /** ステップID */
  id: string;
  /** ステップタイトル */
  title: string;
  /** 説明 */
  description?: string;
  /** ステータス */
  status: TimelineStepStatus;
  /** 日時 */
  datetime?: string;
  /** 担当者 */
  assignee?: string;
  /** アイコン */
  icon?: React.ReactNode;
}

export interface TimelineProps {
  /** ステップ一覧 */
  steps: TimelineStep[];
  /** 追加のCSSクラス */
  className?: string;
}

const statusStyles: Record<TimelineStepStatus, { dot: string; line: string; text: string }> = {
  completed: {
    dot: 'bg-fin-success border-fin-success',
    line: 'bg-fin-success',
    text: 'text-gray-900',
  },
  current: {
    dot: 'bg-fin-primary border-fin-primary',
    line: 'bg-gray-200',
    text: 'text-fin-primary font-semibold',
  },
  upcoming: {
    dot: 'bg-white border-gray-300',
    line: 'bg-gray-200',
    text: 'text-gray-400',
  },
};

/**
 * Timeline - タイムラインコンポーネント
 *
 * 融資承認フローのステップ表示、審査進捗の可視化に
 * 使用します。各ステップに担当者と日時を表示できます。
 */
export const Timeline: React.FC<TimelineProps> = ({ steps, className }) => {
  return (
    <div className={clsx('space-y-0', className)}>
      {steps.map((step, index) => {
        const style = statusStyles[step.status];
        const isLast = index === steps.length - 1;

        return (
          <div key={step.id} className="flex gap-4">
            {/* 左側: ドット + 線 */}
            <div className="flex flex-col items-center">
              <div
                className={clsx(
                  'w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                  style.dot
                )}
              >
                {step.status === 'completed' ? (
                  step.icon || (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )
                ) : step.status === 'current' ? (
                  step.icon || (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )
                ) : (
                  step.icon || (
                    <span className="text-xs text-gray-400 font-medium">{index + 1}</span>
                  )
                )}
              </div>
              {!isLast && (
                <div className={clsx('w-0.5 flex-1 min-h-[40px]', style.line)} />
              )}
            </div>

            {/* 右側: コンテンツ */}
            <div className={clsx('pb-8', isLast && 'pb-0')}>
              <p className={clsx('text-sm', style.text)}>{step.title}</p>
              {step.description && (
                <p className="text-xs text-gray-500 mt-1">{step.description}</p>
              )}
              <div className="flex items-center gap-3 mt-1">
                {step.datetime && (
                  <span className="text-xs text-gray-400">{step.datetime}</span>
                )}
                {step.assignee && (
                  <span className="text-xs text-gray-400">
                    担当: {step.assignee}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
