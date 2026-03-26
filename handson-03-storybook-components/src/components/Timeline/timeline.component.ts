import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TimelineStepStatus = 'completed' | 'current' | 'upcoming';

export interface TimelineStep {
  id: string;
  title: string;
  description?: string;
  status: TimelineStepStatus;
  datetime?: string;
  assignee?: string;
}

export interface TimelineProps {
  steps: TimelineStep[];
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
 * 融資承認フローのステップ表示、審査進捗の可視化に使用します。
 */
@Component({
  selector: 'fin-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
})
export class TimelineComponent {
  @Input() steps: TimelineStep[] = [];
  @Input() className = '';

  getStyle(status: TimelineStepStatus): { dot: string; line: string; text: string } {
    return statusStyles[status];
  }

  isLast(index: number): boolean {
    return index === this.steps.length - 1;
  }

  getDotClasses(status: TimelineStepStatus): string {
    return `w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${this.getStyle(status).dot}`;
  }

  getLineClasses(status: TimelineStepStatus): string {
    return `w-0.5 flex-1 min-h-[40px] ${this.getStyle(status).line}`;
  }

  getTextClasses(status: TimelineStepStatus): string {
    return `text-sm ${this.getStyle(status).text}`;
  }
}
