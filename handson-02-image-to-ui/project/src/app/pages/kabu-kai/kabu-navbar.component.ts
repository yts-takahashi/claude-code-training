import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kabu-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="navbar-top" style="font-family: var(--font_default);">
      <!-- Top bar: オレンジレッド背景 -->
      <div class="flex items-center" style="background-color: #d9340a; color: white; min-height: 30px; font-size: 12px; padding: 0 12px;">
        <!-- Logo -->
        <div class="flex items-center" style="min-width: 180px;">
          <img src="assets/logo.svg" alt="大和証券 Daiwa Securities" style="height: 28px; width: auto;">
        </div>

        <!-- Screen size selector (dev tool) -->
        <div class="flex items-center gap-1 text-white" style="font-size: 11px; flex: 1; justify-content: center;">
          <span style="background: rgba(0,0,0,0.3); padding: 1px 6px; border-radius: 2px; font-size: 11px;">1400 ⊛ HD</span>
          <span style="opacity: 0.6; font-size: 10px;">▼</span>
          <span style="margin-left: 12px; opacity: 0.8;">画面サイズ：1,880</span>
          <span style="margin-left: 8px; cursor: pointer; opacity: 0.8;">🔍</span>
          <span style="margin-left: 4px; cursor: pointer; opacity: 0.7; font-size: 14px;">⊕</span>
          <span style="cursor: pointer; opacity: 0.7; font-size: 14px;">⊖</span>
        </div>

        <!-- Right links -->
        <div class="flex items-center gap-3" style="font-size: 11px;">
          <span class="cursor-pointer hover:underline flex items-center gap-1"><span style="font-size:13px;">👤</span>口座情報</span>
          <span class="cursor-pointer hover:underline">よくあるご質問</span>
          <span class="cursor-pointer hover:underline flex items-center gap-1"><span style="font-size:11px;">↗</span>ヘルプ＆マニュアル</span>
          <span class="cursor-pointer hover:underline flex items-center gap-1"><span style="font-size:11px;">↗</span>旧サイトへ</span>
          <span class="cursor-pointer hover:underline font-bold flex items-center gap-1"><span>→</span>ログアウト</span>
        </div>
      </div>

      <!-- Main navigation: 白背景、アイコン付きリンク -->
      <nav class="flex items-center" style="background-color: white; font-size: 12px; min-height: 38px; padding: 0 8px; border-bottom: 1px solid #ddd;">
        <a *ngFor="let item of navItems" href="#"
           class="flex items-center gap-1 hover:bg-gray-100 whitespace-nowrap"
           style="padding: 8px 10px; text-decoration: none; color: #333; display: inline-flex; align-items: center;">
          <span style="font-size: 14px; color: #d9340a;">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </a>
        <div class="ml-auto flex items-center gap-2" style="font-size: 11px;">
          <span style="color:#555; white-space:nowrap;">法人口座</span>
          <span style="color:#aaa; font-size:10px;">▼</span>
          <span style="color:#555; margin-left:6px; white-space:nowrap;">NISA開設不可</span>
          <span style="color:#aaa; font-size:10px;">▼</span>
          <span style="color:#555; cursor: pointer; white-space:nowrap; margin-left:6px;">⚙ Myメニュー設定</span>
          <span style="color:#555; cursor: pointer; white-space:nowrap; margin-left:6px; font-size:10px;">入力・報告 ▶</span>
        </div>
      </nav>

      <!-- Sub navigation: 白背景、国内株式タブ群 -->
      <div class="flex items-center flex-wrap" style="background-color: white; font-size: 11px; min-height: 28px; border-bottom: 2px solid #e0e0e0; padding: 0 8px;">
        <span *ngFor="let item of subNavItems; let last = last" class="flex items-center">
          <a href="#"
             [style]="item.active
               ? 'color: #333; padding: 6px 10px; text-decoration: none; display: inline-block; font-weight: bold; border-bottom: 2px solid #d9340a; white-space:nowrap; margin-bottom:-2px;'
               : 'color: #555; padding: 6px 10px; text-decoration: none; display: inline-block; white-space:nowrap;'">
            {{ item.label }}
          </a>
        </span>
      </div>
    </header>
  `,
})
export class KabuNavbarComponent {
  navItems = [
    { label: 'ホーム', icon: '⌂' },
    { label: 'お取引', icon: '📋' },
    { label: 'マーケット情報', icon: '📈' },
    { label: '登録銘柄・ツール', icon: '★' },
    { label: '残高情報', icon: '💰' },
    { label: 'お手続き・サポート', icon: '🔧' },
  ];
  subNavItems = [
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
}
