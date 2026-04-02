import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [disabled]="disabled || loading"
      [class]="buttonClasses"
      (click)="onClick()"
    >
      @if (loading) {
        <svg
          class="animate-spin -ml-1 mr-2 h-4 w-4 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
        </svg>
      }
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;

  @Output() clicked = new EventEmitter<void>();

  get buttonClasses(): string {
    const base = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses: Record<ButtonVariant, string> = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-300',
    };

    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const disabledClass = this.disabled || this.loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    return `${base} ${variantClasses[this.variant]} ${sizeClasses[this.size]} ${disabledClass}`;
  }

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}
