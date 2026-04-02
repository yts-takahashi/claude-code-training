import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AvatarSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="avatarClasses">
      @if (imageUrl) {
        <img
          [src]="imageUrl"
          [alt]="name"
          class="w-full h-full object-cover rounded-full"
        />
      } @else {
        <span [class]="initialsClasses">{{ initials }}</span>
      }
    </div>
  `,
})
export class AvatarComponent {
  @Input() name = '';
  @Input() imageUrl = '';
  @Input() size: AvatarSize = 'md';

  get initials(): string {
    return this.name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  get avatarClasses(): string {
    const base = 'inline-flex items-center justify-center rounded-full bg-gray-300 overflow-hidden';

    const sizeClasses: Record<AvatarSize, string> = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-14 h-14',
    };

    return `${base} ${sizeClasses[this.size]}`;
  }

  get initialsClasses(): string {
    const base = 'font-medium text-gray-700 select-none';

    const sizeClasses: Record<AvatarSize, string> = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-lg',
    };

    return `${base} ${sizeClasses[this.size]}`;
  }
}
