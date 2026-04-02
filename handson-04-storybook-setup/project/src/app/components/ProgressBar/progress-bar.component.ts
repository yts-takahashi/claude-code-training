import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProgressBarColor = 'blue' | 'green' | 'yellow' | 'red';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      @if (showLabel) {
        <div class="flex justify-between items-center mb-1">
          <span class="text-sm font-medium text-gray-700">
            {{ label || '進捗' }}
          </span>
          <span class="text-sm text-gray-500">{{ clampedValue }}%</span>
        </div>
      }
      <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          [class]="barClasses"
          [style.width.%]="clampedValue"
        ></div>
      </div>
    </div>
  `,
})
export class ProgressBarComponent {
  @Input() value = 0;
  @Input() color: ProgressBarColor = 'blue';
  @Input() showLabel = true;
  @Input() label = '';

  get clampedValue(): number {
    return Math.min(100, Math.max(0, this.value));
  }

  get barClasses(): string {
    const base = 'h-2.5 rounded-full transition-all duration-500 ease-out';

    const colorClasses: Record<ProgressBarColor, string> = {
      blue: 'bg-blue-600',
      green: 'bg-green-500',
      yellow: 'bg-yellow-400',
      red: 'bg-red-500',
    };

    return `${base} ${colorClasses[this.color]}`;
  }
}
