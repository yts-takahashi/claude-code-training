import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface AlertBannerProps {
  type: AlertType;
  title?: string;
  message: string;
  closable?: boolean;
  actionText?: string;
}

interface AlertConfig {
  bg: string;
  border: string;
  icon: string;
  iconColor: string;
  titleColor: string;
}

const typeConfig: Record<AlertType, AlertConfig> = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-800',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    iconColor: 'text-green-500',
    titleColor: 'text-green-800',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    iconColor: 'text-yellow-500',
    titleColor: 'text-yellow-800',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    iconColor: 'text-red-500',
    titleColor: 'text-red-800',
    icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
};

/**
 * AlertBanner - アラートバナーコンポーネント
 *
 * 重要な通知、エラー表示、成功メッセージ、
 * 注意喚起などに使用するバナーです。
 */
@Component({
  selector: 'fin-alert-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-banner.component.html',
})
export class AlertBannerComponent {
  @Input() type: AlertType = 'info';
  @Input() title?: string;
  @Input() message = '';
  @Input() closable = false;
  @Input() actionText?: string;
  @Input() className = '';

  @Output() alertClose = new EventEmitter<void>();
  @Output() action = new EventEmitter<void>();

  visible = true;

  get config(): AlertConfig {
    return typeConfig[this.type];
  }

  get containerClasses(): string {
    const classes = [
      'flex items-start gap-3 px-4 py-3 rounded-md border',
      this.config.bg,
      this.config.border,
    ];
    if (this.className) classes.push(this.className);
    return classes.join(' ');
  }

  get messageClasses(): string {
    return this.title ? 'text-sm mt-1 text-gray-600' : `text-sm ${this.config.titleColor}`;
  }

  handleClose(): void {
    this.visible = false;
    this.alertClose.emit();
  }

  handleAction(): void {
    this.action.emit();
  }
}
