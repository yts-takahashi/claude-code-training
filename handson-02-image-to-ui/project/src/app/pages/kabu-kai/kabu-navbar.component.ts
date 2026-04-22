import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kabu-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="navbar-top" style="background-color: var(--cc-primary); color: white; font-family: var(--font_default);">
      <!-- Top bar -->
      <div class="flex items-center justify-between px-3 py-1" style="min-height: 36px; font-size: 12px;">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <span class="font-bold text-white" style="font-size: 18px; letter-spacing: 0.5px;">大和証券</span>
        </div>

        <!-- Screen size selector (dev tool) -->
        <div class="flex items-center gap-2 text-white" style="font-size: 11px;">
          <span>画面サイズ：1,400</span>
        </div>

        <!-- Right icons -->
        <div class="flex items-center gap-3" style="font-size: 11px;">
          <span class="cursor-pointer hover:underline">口座情報</span>
          <span class="cursor-pointer hover:underline">よくあるご質問</span>
          <span class="cursor-pointer hover:underline">ヘルプ＆マニュアル</span>
          <span class="cursor-pointer hover:underline">入力補助</span>
          <span class="cursor-pointer hover:underline">旧サイトへ</span>
          <span class="cursor-pointer hover:underline font-bold">ログアウト</span>
        </div>
      </div>

      <!-- Main navigation -->
      <nav class="flex items-center px-3 py-1 gap-1" style="background-color: var(--cc-primary); border-top: 1px solid rgba(255,255,255,0.3); font-size: 12px;">
        <a *ngFor="let item of navItems" href="#"
           class="px-3 py-1 text-white hover:bg-white hover:bg-opacity-20 rounded whitespace-nowrap">
          {{ item }}
        </a>
        <div class="ml-auto flex items-center gap-2">
          <span class="text-white text-xs">NISA未開設</span>
          <span class="text-white text-xs cursor-pointer hover:underline">Myメニュー設定</span>
        </div>
      </nav>

      <!-- Sub navigation -->
      <div class="flex items-center px-3 py-1 gap-2" style="background-color: rgba(0,0,0,0.15); font-size: 11px;">
        <span *ngFor="let item of subNavItems; let last = last" class="flex items-center gap-2">
          <a href="#" class="text-white hover:underline whitespace-nowrap">{{ item }}</a>
          <span *ngIf="!last" class="text-white opacity-50">|</span>
        </span>
      </div>
    </header>
  `,
})
export class KabuNavbarComponent {
  navItems = ['ホーム', 'お取引', 'マーケット情報', '登録銘柄・ツール', '残高情報', 'お手続き・サポート'];
  subNavItems = [
    '買付注文', '売付注文', '注文・約定照会（取消・訂正）',
    'IPO（新規公開株式）', 'PO（公募・売出株式）',
    '米国株', '株式累積投資', '公開買付', '中国株', '投資信託', '外貨MMF'
  ];
}
