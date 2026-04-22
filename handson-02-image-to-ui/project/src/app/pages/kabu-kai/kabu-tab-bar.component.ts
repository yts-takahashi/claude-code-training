import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kabu-tab-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tab-bar" style="font-family: var(--font_default); background-color: #e8e8e8; border-bottom: 2px solid #ccc;">
      <!-- Row 1: Product tabs -->
      <div class="flex" style="border-bottom: 1px solid #ccc;">
        <a *ngFor="let tab of productTabs" href="#"
           [class]="tab.active
             ? 'px-4 py-2 text-xs font-bold border-b-2 whitespace-nowrap bg-white border-orange-600 text-orange-700'
             : 'px-4 py-2 text-xs hover:bg-gray-100 whitespace-nowrap text-gray-700 border-b-2 border-transparent'"
           style="text-decoration: none; display: inline-block;">
          {{ tab.label }}
        </a>
      </div>

      <!-- Row 2: Action tabs -->
      <div class="flex" style="background-color: #f0f0f0;">
        <a *ngFor="let tab of actionTabs" href="#"
           [class]="tab.active
             ? 'px-4 py-2 text-xs font-bold border-b-2 whitespace-nowrap bg-white text-orange-700 border-orange-600'
             : 'px-4 py-2 text-xs hover:bg-gray-100 whitespace-nowrap text-gray-700 border-b-2 border-transparent'"
           style="text-decoration: none; display: inline-block;">
          {{ tab.label }}
        </a>
      </div>
    </div>
  `,
})
export class KabuTabBarComponent {
  productTabs = [
    { label: '国内株式（現物取引）', active: true },
    { label: '国内株式（信用取引）', active: false },
    { label: 'IPO（新規公開株式）', active: false },
    { label: 'PO（公募・売出株式）', active: false },
    { label: '米国株', active: false },
    { label: '株式累積投資', active: false },
    { label: '公開買付', active: false },
    { label: '中国株', active: false },
    { label: '投資信託', active: false },
    { label: '外貨MMF', active: false },
  ];

  actionTabs = [
    { label: '買付注文', active: true },
    { label: '売付注文', active: false },
    { label: '注文・約定照会（取消・訂正）', active: false },
  ];
}
