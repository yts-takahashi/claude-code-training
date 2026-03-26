import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
}

const variantStyles: Record<string, string> = {
  primary:
    'bg-fin-primary text-white hover:bg-fin-primary-hover focus:ring-fin-primary/50',
  secondary:
    'bg-white text-fin-secondary border border-fin-border hover:bg-gray-50 focus:ring-fin-secondary/50',
  danger:
    'bg-fin-danger text-white hover:bg-fin-danger-hover focus:ring-fin-danger/50',
  ghost:
    'bg-transparent text-fin-secondary hover:bg-gray-100 focus:ring-gray-300/50',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

/**
 * Button - FinUIの基本ボタンコンポーネント
 *
 * 金融アプリケーション全体で使用される汎用ボタン。
 * 承認、却下、検索などのアクションに使用します。
 */
@Component({
  selector: 'fin-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() className = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    const classes = [
      'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
      variantStyles[this.variant],
      sizeStyles[this.size],
    ];
    if (this.disabled || this.loading) {
      classes.push('opacity-50 cursor-not-allowed');
    }
    if (this.className) {
      classes.push(this.className);
    }
    return classes.join(' ');
  }

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  onClick(event: MouseEvent): void {
    if (!this.isDisabled) {
      this.buttonClick.emit(event);
    }
  }
}
