import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral';
export type BadgeSize = 'sm' | 'md';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="badgeClasses">
      <ng-content></ng-content>
    </span>
  `,
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'neutral';
  @Input() size: BadgeSize = 'md';

  get badgeClasses(): string {
    const base = 'inline-flex items-center font-medium rounded-full';

    const variantClasses: Record<BadgeVariant, string> = {
      info: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      neutral: 'bg-gray-100 text-gray-800',
    };

    const sizeClasses: Record<BadgeSize, string> = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
    };

    return `${base} ${variantClasses[this.variant]} ${sizeClasses[this.size]}`;
  }
}
