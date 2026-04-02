import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClasses">
      @if (title) {
        <div class="mb-3">
          <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
          @if (subtitle) {
            <p class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
          }
        </div>
      }
      <div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class CardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() bordered = true;
  @Input() hoverable = false;

  get cardClasses(): string {
    const base = 'bg-white rounded-lg p-6';
    const border = this.bordered ? 'border border-gray-200' : '';
    const shadow = 'shadow-sm';
    const hover = this.hoverable ? 'hover:shadow-md transition-shadow cursor-pointer' : '';

    return `${base} ${border} ${shadow} ${hover}`.trim();
  }
}
