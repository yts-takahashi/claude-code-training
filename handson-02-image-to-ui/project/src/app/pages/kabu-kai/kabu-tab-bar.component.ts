import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kabu-tab-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tab-bar" style="font-family: var(--font_default); background-color: white;">
      <!-- Action tabs: 買付注文 | 売付注文 | 注文・約定照会（取消・訂正） -->
      <div class="flex" style="background-color: white; border-bottom: 1px solid #ccc; padding: 0 8px;">
        <a *ngFor="let tab of actionTabs" href="#"
           [style]="tab.active
             ? 'text-decoration:none; display:inline-block; padding:6px 14px; font-size:12px; font-weight:bold; color:#d9340a; border-bottom:2px solid #d9340a; margin-bottom:-1px; white-space:nowrap;'
             : 'text-decoration:none; display:inline-block; padding:6px 14px; font-size:12px; color:#555; white-space:nowrap;'">
          {{ tab.label }}
        </a>
      </div>
    </div>
  `,
})
export class KabuTabBarComponent {
  actionTabs = [
    { label: '買付注文', active: true },
    { label: '売付注文', active: false },
    { label: '注文・約定照会（取消・訂正）', active: false },
  ];
}
