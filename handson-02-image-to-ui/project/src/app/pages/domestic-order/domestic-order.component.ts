import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-domestic-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    :host { display: block; font-family: 'Noto Sans JP', 'メイリオ', Meiryo, sans-serif; font-size: 13px; color: #333; background: #fff; }
    .nav-main { background: #fff; border-bottom: 1px solid #ccc; }
    .nav-sub { background: #f5f5f5; border-bottom: 1px solid #ccc; }
    .form-label-cell { background: #d9eaf8; border-right: 1px solid #bcd0e6; font-weight: bold; width: 110px; padding: 6px 8px; vertical-align: middle; font-size: 12px; }
    .form-input-cell { background: #fff; padding: 5px 8px; vertical-align: middle; font-size: 12px; }
    .form-row { border-bottom: 1px solid #d0d8e0; }
    .btn-primary { background: #e86310; color: #fff; border: none; cursor: pointer; font-weight: bold; }
    .btn-primary:hover { background: #d05800; }
    .btn-outline { background: #fff; border: 1px solid #999; cursor: pointer; }
    .btn-outline:hover { background: #f0f0f0; }
    .btn-order-type { border: 1px solid #e86310; cursor: pointer; padding: 3px 12px; font-size: 12px; }
    .btn-order-type.active { background: #e86310; color: #fff; }
    .btn-order-type:not(.active) { background: #fff; color: #e86310; }
    .btn-expiry { border: 1px solid #ccc; cursor: pointer; padding: 2px 10px; font-size: 12px; background: #fff; }
    .btn-expiry.active { background: #e86310; color: #fff; border-color: #e86310; }
    .step-line { height: 2px; background: #0066cc; flex: 1; }
    .step-line.inactive { background: #ccc; }
    .step-circle { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 13px; }
    .step-circle.active { background: #0066cc; color: #fff; }
    .step-circle.inactive { background: #ccc; color: #fff; }
    .side-panel { border-left: 1px solid #ddd; }
    .tab-btn { border: 1px solid #ccc; background: #f5f5f5; cursor: pointer; padding: 4px 8px; font-size: 11px; white-space: nowrap; }
    .tab-btn.active { background: #fff; border-bottom-color: #fff; font-weight: bold; color: #0066cc; border-bottom: 2px solid #0066cc; }
    .ita-table td, .ita-table th { border: 1px solid #ddd; padding: 2px 6px; font-size: 11px; text-align: right; }
    .ita-sell { background: #ffe8e8; }
    .ita-buy { background: #e8f0ff; }
    .ita-current { background: #ffffcc; font-weight: bold; }
    .chart-area { background: #fafafa; border: 1px solid #ddd; }
    .notice-section { background: #fff; border-top: 3px solid #0066cc; }
    .notice-link { color: #0066cc; text-decoration: underline; cursor: pointer; }
    .caution-box { background: #fff8e1; border: 1px solid #f0c040; border-left: 3px solid #e08000; }
    .price-table td { padding: 2px 4px; font-size: 11px; border: 1px solid #e0e8f0; }
    .price-label { color: #555; background: #f0f5fa; font-size: 11px; width: 90px; }
  `],
  template: `
    <div style="min-width: 960px; background: #fff;">

      <!-- ===== HEADER ===== -->
      <header>
        <!-- Top bar: small navy logo + white utility bar -->
        <div class="flex items-center" style="background: #fff; border-bottom: 1px solid #ddd; min-height: 34px;">
          <!-- 大和証券 logo box (wider to match original) -->
          <div style="background: #002b6b; padding: 4px 16px 4px 12px; min-height: 34px; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; flex-shrink: 0; min-width: 130px;">
            <span class="text-white font-bold" style="font-size: 15px; letter-spacing: 0.08em; line-height: 1.2;">大和証券</span>
            <span class="text-white" style="font-size: 9px; opacity: 0.8; letter-spacing: 0.05em;">Daiwa Securities</span>
          </div>
          <!-- Utility links -->
          <div class="flex items-center flex-1 px-3 gap-2" style="font-size: 11px; color: #555;">
            <span class="px-1.5 py-0.5 border border-gray-400 cursor-pointer text-gray-600" style="font-size: 11px;">1400※HD ▼</span>
            <span class="text-gray-500" style="font-size: 11px;">画面サイズ: 1,880</span>
            <span class="text-gray-400 mx-1">|</span>
            <span class="text-gray-500 flex items-center gap-0.5 cursor-pointer" style="font-size: 11px;">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="m21 21-4.35-4.35"/></svg>
              100%
            </span>
          </div>
          <div class="flex items-center gap-2 pr-3" style="font-size: 11px;">
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
            <a href="#" class="text-blue-700 hover:underline" style="font-size: 11px;">口座情報</a>
            <a href="#" class="text-blue-700 hover:underline" style="font-size: 11px;">よくあるご質問</a>
            <a href="#" class="text-blue-700 hover:underline flex items-center gap-0.5" style="font-size: 11px;">ヘルプ&amp;マニュアル
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>
            </a>
            <a href="#" class="text-blue-700 hover:underline flex items-center gap-0.5" style="font-size: 11px;">旧サイトへ
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg>
            </a>
            <a href="#" class="text-gray-600 hover:underline" style="font-size: 11px;">ログアウト</a>
          </div>
        </div>

        <!-- Main navigation -->
        <nav class="nav-main flex items-center px-2 py-0" style="border-bottom: 1px solid #ddd;">
          <a href="#" class="flex items-center gap-1 px-2 py-2 text-xs text-gray-600 hover:text-blue-700 border-b-2 border-transparent" style="font-size: 12px;">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" /></svg>
            <span>ホーム</span>
          </a>
          <a href="#" class="flex items-center gap-1 px-2 py-2 text-xs font-bold border-b-2" style="font-size: 12px; color: #0066cc; border-bottom-color: #0066cc;">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
            <span>お取引</span>
          </a>
          <a href="#" class="flex items-center gap-1 px-2 py-2 text-xs text-gray-600 hover:text-blue-700 border-b-2 border-transparent" style="font-size: 12px;">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>
            <span>マーケット情報</span>
          </a>
          <a href="#" class="flex items-center gap-1 px-2 py-2 text-xs text-gray-600 hover:text-blue-700 border-b-2 border-transparent" style="font-size: 12px;">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>
            <span>登録銘柄・ツール</span>
          </a>
          <a href="#" class="flex items-center gap-1 px-2 py-2 text-xs text-gray-600 hover:text-blue-700 border-b-2 border-transparent" style="font-size: 12px;">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" /></svg>
            <span>残高情報</span>
          </a>
          <a href="#" class="flex items-center gap-1 px-2 py-2 text-xs text-gray-600 hover:text-blue-700 border-b-2 border-transparent" style="font-size: 12px;">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
            <span>お手続き・サポート</span>
          </a>
          <a href="#" class="flex items-center gap-1 px-2 py-2 text-xs text-gray-600 hover:text-blue-700 border-b-2 border-transparent" style="font-size: 12px;">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>
            <span>法人口座</span>
          </a>
          <div class="ml-auto flex items-center gap-2">
            <span class="px-1.5 py-0.5 border border-gray-400 text-gray-500" style="font-size: 11px;">NISA開設不可 ▼</span>
            <a href="#" class="flex items-center gap-0.5 text-gray-600 hover:text-blue-700" style="font-size: 11px;">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" /></svg>
              Myメニュー設定
            </a>
          </div>
        </nav>

        <!-- Sub navigation: product categories -->
        <nav class="nav-sub flex items-center px-3 py-0 flex-wrap" style="font-size: 12px;">
          <a href="#" class="px-2 py-1 text-gray-800 font-bold" style="border-bottom: 2px solid #e86310; font-size: 12px;">国内株式（現物取引）</a>
          <a href="#" class="px-2 py-1 text-blue-700 hover:underline" style="font-size: 12px;">国内株式（信用取引）</a>
          <a href="#" class="px-2 py-1 text-blue-700 hover:underline" style="font-size: 12px;">IPO（新規公開株式）</a>
          <a href="#" class="px-2 py-1 text-blue-700 hover:underline" style="font-size: 12px;">PO（公募・売出株式）</a>
          <a href="#" class="px-2 py-1 text-blue-700 hover:underline" style="font-size: 12px;">米国株</a>
          <a href="#" class="px-2 py-1 text-blue-700 hover:underline" style="font-size: 12px;">株式累積投資</a>
          <a href="#" class="px-2 py-1 text-blue-700 hover:underline" style="font-size: 12px;">公開買付</a>
          <a href="#" class="px-2 py-1 text-blue-700 hover:underline" style="font-size: 12px;">中国株</a>
          <a href="#" class="px-2 py-1 text-blue-700 hover:underline" style="font-size: 12px;">投資信託</a>
          <a href="#" class="px-2 py-1 text-blue-700 hover:underline" style="font-size: 12px;">外貨MMF</a>
        </nav>

        <!-- Order type tabs -->
        <nav class="flex items-end px-3" style="border-bottom: 2px solid #e86310; background: #fff;">
          <a href="#" class="px-3 py-1.5 text-sm font-bold" style="color: #e86310; border-bottom: 3px solid #e86310; margin-bottom: -2px; background: #fff; font-size: 13px;">買付注文</a>
          <a href="#" class="px-3 py-1.5 text-sm text-gray-600 hover:text-orange-600" style="font-size: 13px;">売付注文</a>
          <a href="#" class="px-3 py-1.5 text-sm text-gray-600 hover:text-orange-600" style="font-size: 13px;">注文・約定照会（取消・訂正）</a>
        </nav>
      </header>

      <!-- ===== MAIN CONTENT ===== -->
      <div class="flex">

        <!-- ===== LEFT: Order Form ===== -->
        <div class="flex-1 px-4 pt-3 pb-6" style="min-width: 0; max-width: 760px;">

          <!-- Page title + flags -->
          <div class="flex items-center justify-between mb-2" style="border-left: 3px solid #0066cc; padding-left: 8px;">
            <h1 class="font-bold flex items-center gap-2" style="font-size: 15px; color: #333;">
              注文入力
              <span style="color: #ccc; font-size: 14px;">☆</span>
            </h1>
            <div class="flex items-center gap-3 text-xs text-gray-500">
              <label class="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" [(ngModel)]="showSell" />
                <span style="display: inline-block; width: 10px; height: 10px; background: #cc3300; margin-right: 2px;"></span>
                <span>売付</span>
              </label>
              <label class="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" [(ngModel)]="showBuy" />
                <span style="display: inline-block; width: 10px; height: 10px; background: #00aa66; margin-right: 2px;"></span>
                <span>買付</span>
              </label>
              <span class="text-gray-400">|</span>
              <label class="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" [(ngModel)]="showBuyingPower" />
                <span>買付余力</span>
              </label>
              <label class="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" [(ngModel)]="nisaUnsupported" disabled />
                <span class="text-gray-400">NISA口座未開設</span>
              </label>
              <label class="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" [(ngModel)]="linkEnabled" />
                <span>リンク有無</span>
              </label>
            </div>
          </div>

          <!-- Form table -->
          <div style="border: 1px solid #bcd0e6; border-radius: 2px;">
            <table class="w-full" style="border-collapse: collapse;">
              <tbody>

                <!-- 売買 -->
                <tr class="form-row">
                  <td class="form-label-cell">売買</td>
                  <td class="form-input-cell">
                    <div class="flex items-center gap-1">
                      <button class="btn-order-type" [class.active]="buySell==='buy'" (click)="buySell='buy'">買付</button>
                      <button class="btn-order-type" [class.active]="buySell==='sell'" (click)="buySell='sell'"
                        style="border-color: #0066cc;"
                        [style.background]="buySell==='sell' ? '#0066cc' : '#fff'"
                        [style.color]="buySell==='sell' ? '#fff' : '#0066cc'">売付</button>
                    </div>
                  </td>
                </tr>

                <!-- 銘柄名 -->
                <tr class="form-row">
                  <td class="form-label-cell">銘柄名</td>
                  <td class="form-input-cell">
                    <div class="flex items-center gap-2 flex-wrap">
                      <div>
                        <span class="text-xs text-gray-500">{{ stockCode }} {{ stockMarket }}</span>
                        <span class="text-xs text-gray-400 ml-1">②最良執行市場: 東証</span>
                        <div class="font-bold text-blue-700" style="font-size: 14px;">{{ stockName }}</div>
                      </div>
                      <button class="btn-outline px-3 py-1 text-xs ml-2 flex items-center gap-1">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="m21 21-4.35-4.35"/></svg>
                        銘柄検索
                      </button>
                    </div>
                  </td>
                </tr>

                <!-- 口座 -->
                <tr class="form-row">
                  <td class="form-label-cell">口座</td>
                  <td class="form-input-cell">
                    <div class="flex items-center gap-1">
                      <button class="btn-expiry" [class.active]="account==='toku'" (click)="account='toku'">特定口座</button>
                      <button class="btn-expiry" [class.active]="account==='ippan'" (click)="account='ippan'">一般口座</button>
                      <button class="btn-expiry" [class.active]="account==='nisa'" (click)="account='nisa'">NISA口座</button>
                    </div>
                  </td>
                </tr>

                <!-- 注文数量 -->
                <tr class="form-row">
                  <td class="form-label-cell">注文数量</td>
                  <td class="form-input-cell">
                    <div class="flex items-center gap-2">
                      <span class="text-gray-400 px-1 border border-gray-300" style="font-size: 14px;">─</span>
                      <input type="number" [(ngModel)]="quantity" class="px-2 py-1 border border-gray-400 text-sm text-right" style="width: 80px;" />
                      <span class="text-sm">株</span>
                      <span class="text-xs text-gray-500 ml-1">（注文単位:100株）</span>
                    </div>
                  </td>
                </tr>

                <!-- 注文条件 -->
                <tr class="form-row">
                  <td class="form-label-cell">注文条件</td>
                  <td class="form-input-cell">
                    <div class="flex items-center gap-1">
                      <button class="btn-order-type" [class.active]="orderType==='sashine'" (click)="orderType='sashine'">指値</button>
                      <button class="btn-order-type" [class.active]="orderType==='nariyuki'" (click)="orderType='nariyuki'">成行</button>
                      <button class="btn-order-type" [class.active]="orderType==='dual'" (click)="orderType='dual'" style="font-size: 11px;">デュアル板寄</button>
                    </div>
                  </td>
                </tr>

                <!-- 注文単価 -->
                <tr class="form-row">
                  <td class="form-label-cell">注文単価</td>
                  <td class="form-input-cell">
                    <div class="flex items-center gap-2 flex-wrap">
                      <input type="text"
                        [value]="orderType==='nariyuki' ? '--' : limitPrice"
                        [disabled]="orderType==='nariyuki'"
                        (input)="limitPrice = $any($event.target).value"
                        class="px-2 py-1 border border-gray-400 text-sm text-right"
                        style="width: 80px;"
                        [style.background]="orderType==='nariyuki' ? '#f5f5f5' : '#fff'" />
                      <span class="text-xs text-gray-500">円</span>
                      <span class="text-xs text-gray-400 ml-1">（制限値幅:2,815円-3,625円）</span>
                    </div>
                  </td>
                </tr>

                <!-- SOR条件 -->
                <tr class="form-row">
                  <td class="form-label-cell">SOR条件</td>
                  <td class="form-input-cell">
                    <div class="flex items-center gap-1">
                      <button class="btn-expiry" [class.active]="sorCondition==='yes'" (click)="sorCondition='yes'">する</button>
                      <button class="btn-expiry" [class.active]="sorCondition==='no'" (click)="sorCondition='no'">しない</button>
                    </div>
                  </td>
                </tr>

                <!-- 執行条件 -->
                <tr class="form-row">
                  <td class="form-label-cell">執行条件</td>
                  <td class="form-input-cell">
                    <div class="flex items-center gap-1 flex-wrap">
                      <label class="flex items-center gap-1 cursor-pointer text-xs">
                        <input type="radio" name="trade" value="none" [(ngModel)]="tradeCondition" />
                        <span>なし</span>
                      </label>
                      <label class="flex items-center gap-1 cursor-pointer text-xs ml-2">
                        <input type="radio" name="trade" value="yoritsuke" [(ngModel)]="tradeCondition" />
                        <span>寄付</span>
                      </label>
                      <label class="flex items-center gap-1 cursor-pointer text-xs ml-2">
                        <input type="radio" name="trade" value="hike" [(ngModel)]="tradeCondition" />
                        <span>引成</span>
                      </label>
                      <label class="flex items-center gap-1 cursor-pointer text-xs ml-2">
                        <input type="radio" name="trade" value="funari" [(ngModel)]="tradeCondition" />
                        <span>不成</span>
                      </label>
                    </div>
                  </td>
                </tr>

                <!-- 有効期間 -->
                <tr class="form-row">
                  <td class="form-label-cell">有効期間</td>
                  <td class="form-input-cell">
                    <div class="flex items-center gap-2 flex-wrap">
                      <button class="btn-expiry" [class.active]="expiry==='today'" (click)="expiry='today'">当日</button>
                      <button class="btn-expiry" [class.active]="expiry==='specify'" (click)="expiry='specify'">期間指定</button>
                      <input type="date" *ngIf="expiry==='specify'" [(ngModel)]="expiryDate"
                        class="px-2 py-0.5 border border-gray-400 text-xs" />
                      <span class="text-xs text-gray-400" *ngIf="expiry==='today'">訂正前まで有効</span>
                    </div>
                  </td>
                </tr>

                <!-- 連続注文 -->
                <tr class="form-row">
                  <td class="form-label-cell">連続注文</td>
                  <td class="form-input-cell">
                    <div class="flex items-center gap-1">
                      <label class="flex items-center gap-1 cursor-pointer text-xs">
                        <input type="radio" name="continuous" value="none" [(ngModel)]="continuousOrder" />
                        <span>しない</span>
                      </label>
                      <label class="flex items-center gap-1 cursor-pointer text-xs ml-3">
                        <input type="radio" name="continuous" value="yes" [(ngModel)]="continuousOrder" />
                        <span>する</span>
                      </label>
                    </div>
                  </td>
                </tr>

                <!-- 買付概算金額 -->
                <tr>
                  <td class="form-label-cell">{{ buySell === 'buy' ? '買付' : '売付' }}概算金額</td>
                  <td class="form-input-cell">
                    <span class="font-bold" style="font-size: 15px; color: #333;">{{ estimatedAmount | number }}円</span>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          <!-- Caution text -->
          <div class="mt-2 text-xs text-gray-600 leading-relaxed px-1">
            <p>
              お取引前に（<a href="#" class="notice-link">売買委託注文の取扱いの停止・注文受付中止・インサイダー取引規制</a>）の情報をご確認した上で、必要事項を選択または入力した後、下記「注文内容を確認」ボタンをクリックしてください。
            </p>
          </div>

          <!-- Second caution box -->
          <div class="caution-box mt-2 px-3 py-2 text-xs text-gray-700 leading-relaxed" style="position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <p>
                特定口座を開設している場合、源泉徴収税分が買付余力から減算されるのは約定日の翌日です。このため、当該商品の売却約定日における買付けの際は買付余力の範囲内の取引であっても、後日不足金が発生する場合があります。また、源泉徴収は外貨決済であっても円貨で行われることにご注意ください。
              </p>
              <button class="ml-2 flex-shrink-0 text-gray-500 hover:text-gray-700" style="font-size: 16px; line-height: 1;">▼</button>
            </div>
          </div>

          <!-- Action buttons -->
          <div class="flex items-center justify-center gap-4 mt-4">
            <button class="btn-outline px-8 py-2 text-sm font-bold" style="min-width: 120px;" (click)="clearForm()">クリア</button>
            <button class="btn-primary px-8 py-2 text-sm font-bold" style="min-width: 180px; font-size: 14px;" (click)="confirmOrder()">注文内容を確認</button>
          </div>

          <!-- Step indicator -->
          <div class="flex items-center mt-4" style="max-width: 360px; margin: 16px auto 0;">
            <div class="flex flex-col items-center gap-1">
              <div class="step-circle active">1</div>
              <div class="text-xs font-bold" style="color: #0066cc;">入力</div>
            </div>
            <div class="step-line"></div>
            <div class="flex flex-col items-center gap-1">
              <div class="step-circle inactive">2</div>
              <div class="text-xs text-gray-400">確認</div>
            </div>
            <div class="step-line inactive"></div>
            <div class="flex flex-col items-center gap-1">
              <div class="step-circle inactive">3</div>
              <div class="text-xs text-gray-400">完了</div>
            </div>
          </div>

          <!-- Footer links -->
          <div class="flex items-center gap-3 mt-4 text-xs flex-wrap" style="border-top: 1px solid #eee; padding-top: 8px;">
            <a href="#" class="notice-link flex items-center gap-0.5">お取引のご注意 <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg></a>
            <a href="#" class="notice-link flex items-center gap-0.5">最良執行方針 <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg></a>
            <a href="#" class="notice-link flex items-center gap-0.5">新興企業について <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg></a>
            <a href="#" class="notice-link flex items-center gap-0.5">手数料 <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg></a>
            <a href="#" class="notice-link flex items-center gap-0.5">上場有価証券等書面 <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/></svg></a>
          </div>
        </div>

        <!-- ===== RIGHT: Reference Info Panel ===== -->
        <div class="side-panel px-3 pt-3 pb-6 shrink-0" style="width: 400px; font-size: 12px;">

          <!-- Account Balance -->
          <div class="flex gap-2 mb-1">
            <div class="flex-1 border border-gray-300 px-2 py-1">
              <div class="text-xs text-gray-500 mb-0.5">主口座</div>
              <div class="font-bold text-right" style="font-size: 13px;">1,100,000円</div>
            </div>
            <div class="flex-1 border border-gray-300 px-2 py-1">
              <div class="text-xs text-gray-500 mb-0.5">NISA口座</div>
              <div class="font-bold text-right" style="font-size: 12px;">123,456,789,012円</div>
            </div>
          </div>
          <div class="mb-0.5 text-xs" style="color: #cc3300;">
            <a href="#" style="color: #cc3300; text-decoration: underline;">成長投資枠未利用額: 2,400,000円</a>
          </div>
          <div class="mb-1 text-xs">
            <a href="#" class="notice-link">非課税利用状況を確認する</a>
          </div>
          <div class="flex gap-2 mb-2">
            <button class="btn-outline px-2 py-0.5 text-xs">入金をする</button>
            <button class="btn-outline px-2 py-0.5 text-xs">買付余力の確認</button>
          </div>

          <!-- Reference Info tabs -->
          <div style="border: 1px solid #ccc;">
            <!-- Tab bar -->
            <div class="flex" style="border-bottom: 1px solid #ccc; background: #f5f5f5;">
              <button class="tab-btn" [class.active]="infoTab==='ref'" (click)="infoTab='ref'" style="font-size: 11px;">参考株価</button>
              <button class="tab-btn" [class.active]="infoTab==='summary'" (click)="infoTab='summary'" style="font-size: 11px;">サマリー/株価</button>
              <button class="tab-btn" [class.active]="infoTab==='news'" (click)="infoTab='news'" style="font-size: 11px;">ニュース</button>
              <button class="tab-btn" [class.active]="infoTab==='other'" (click)="infoTab='other'" style="font-size: 11px; white-space: nowrap;">その他銘柄情報</button>
            </div>

            <!-- Summary tab content -->
            <div *ngIf="infoTab==='summary' || infoTab==='ref'" class="p-2">

              <!-- Current price info -->
              <table class="w-full mb-2 price-table" style="border-collapse: collapse;">
                <tbody>
                  <tr>
                    <td class="price-label" style="border: 1px solid #ddd; padding: 2px 4px; background: #f0f5fa; color: #555; font-size: 11px;" rowspan="2">現在値<br><span style="font-size: 10px; color: #777;">（前日比）</span></td>
                    <td style="border: 1px solid #ddd; padding: 2px 6px; text-align: right; font-weight: bold; font-size: 14px;">3,220.0</td>
                    <td style="border: 1px solid #ddd; padding: 2px 4px; font-size: 10px; color: #777; text-align: right;">2024/11/26 10:21</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #ddd; padding: 2px 6px; text-align: right; font-size: 11px;" [style.color]="priceChange < 0 ? '#0066cc' : '#cc3300'">
                      ({{ priceChange | number:'1.1-1' }} {{ priceChangePct }}%)
                    </td>
                    <td style="border: 1px solid #ddd; padding: 2px 4px; text-align: right;">
                      <button class="btn-outline px-2 py-0" style="font-size: 10px;">更新</button>
                    </td>
                  </tr>
                  <tr *ngFor="let row of priceStats">
                    <td style="border: 1px solid #ddd; padding: 2px 4px; background: #f0f5fa; color: #555; font-size: 11px;">{{ row.label }}</td>
                    <td style="border: 1px solid #ddd; padding: 2px 6px; text-align: right; font-size: 11px; font-weight: bold;">{{ row.value }}</td>
                    <td style="border: 1px solid #ddd; padding: 2px 4px; font-size: 10px; color: #777; text-align: right;">2024/11/26 10:21</td>
                  </tr>
                </tbody>
              </table>

              <!-- 板 header -->
              <table class="ita-table w-full mb-0" style="border-collapse: collapse;">
                <thead>
                  <tr style="background: #e8f0f8;">
                    <th style="border: 1px solid #ccc; padding: 2px 6px; font-size: 11px; text-align: center;">売数量</th>
                    <th style="border: 1px solid #ccc; padding: 2px 6px; font-size: 11px; text-align: center;">
                      <div>気配値</div>
                      <div style="font-size: 10px; font-weight: normal; color: #666;">成行</div>
                    </th>
                    <th style="border: 1px solid #ccc; padding: 2px 6px; font-size: 11px; text-align: center;">買数量</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="ita-sell" style="border: 1px solid #ddd; padding: 2px 6px; text-align: right; color: #cc3300; font-size: 11px;">99,999,999</td>
                    <td style="border: 1px solid #ddd; padding: 2px 6px; text-align: center; font-weight: bold; font-size: 11px;">OVER</td>
                    <td style="border: 1px solid #ddd; padding: 2px 6px;"></td>
                  </tr>
                  <tr *ngFor="let row of orderBook.sell">
                    <td class="ita-sell" style="border: 1px solid #ddd; padding: 2px 6px; text-align: right; color: #cc3300; font-size: 11px;">{{ row.qty | number }}</td>
                    <td style="border: 1px solid #ddd; padding: 2px 6px; text-align: center; font-weight: bold; cursor: pointer; font-size: 11px;" (click)="limitPrice=row.price.toString()">{{ row.price }}</td>
                    <td style="border: 1px solid #ddd; padding: 2px 6px;"></td>
                  </tr>
                  <tr class="ita-current">
                    <td style="border: 1px solid #ddd; padding: 2px 6px; text-align: right; font-size: 10px; color: #666;">現在 ↓</td>
                    <td style="border: 1px solid #ddd; padding: 2px 6px; text-align: center; font-weight: bold; font-size: 12px; color: #333; background: #fff3b0;">{{ boardCurrentPrice }}</td>
                    <td style="border: 1px solid #ddd; padding: 2px 6px;"></td>
                  </tr>
                  <tr *ngFor="let row of orderBook.buy">
                    <td style="border: 1px solid #ddd; padding: 2px 6px;"></td>
                    <td style="border: 1px solid #ddd; padding: 2px 6px; text-align: center; font-weight: bold; cursor: pointer; font-size: 11px;" (click)="limitPrice=row.price.toString()">{{ row.price }}</td>
                    <td class="ita-buy" style="border: 1px solid #ddd; padding: 2px 6px; text-align: right; color: #0066cc; font-size: 11px;">{{ row.qty | number }}</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #ddd; padding: 2px 6px;"></td>
                    <td style="border: 1px solid #ddd; padding: 2px 6px; text-align: center; font-weight: bold; font-size: 11px;">UNDER</td>
                    <td class="ita-buy" style="border: 1px solid #ddd; padding: 2px 6px; text-align: right; color: #0066cc; font-size: 11px;">123,456,789</td>
                  </tr>
                </tbody>
              </table>

              <!-- Chart period selector -->
              <div class="flex items-center gap-0 mt-2 mb-1">
                <button class="tab-btn" [class.active]="chartPeriod==='5min'" (click)="chartPeriod='5min'" style="font-size: 11px; padding: 2px 8px;">5分足</button>
                <button class="tab-btn" [class.active]="chartPeriod==='day'" (click)="chartPeriod='day'" style="font-size: 11px; padding: 2px 8px;">日足</button>
                <button class="tab-btn" [class.active]="chartPeriod==='week'" (click)="chartPeriod='week'" style="font-size: 11px; padding: 2px 8px;">週足</button>
                <button class="tab-btn" [class.active]="chartPeriod==='month'" (click)="chartPeriod='month'" style="font-size: 11px; padding: 2px 8px;">月足</button>
              </div>

              <!-- Chart (SVG - candlestick style) -->
              <div class="chart-area" style="position: relative; overflow: hidden;">
                <svg width="100%" height="160" viewBox="0 0 370 160" preserveAspectRatio="none" style="display: block;">
                  <!-- Background -->
                  <rect x="0" y="0" width="370" height="150" fill="#fff"/>
                  <!-- Grid lines -->
                  <line x1="30" y1="20" x2="365" y2="20" stroke="#eee" stroke-width="0.5"/>
                  <line x1="30" y1="50" x2="365" y2="50" stroke="#eee" stroke-width="0.5"/>
                  <line x1="30" y1="80" x2="365" y2="80" stroke="#eee" stroke-width="0.5"/>
                  <line x1="30" y1="110" x2="365" y2="110" stroke="#eee" stroke-width="0.5"/>
                  <line x1="30" y1="130" x2="365" y2="130" stroke="#eee" stroke-width="0.5"/>
                  <!-- Y axis labels -->
                  <text x="0" y="23" font-size="9" fill="#999">350</text>
                  <text x="0" y="53" font-size="9" fill="#999">300</text>
                  <text x="0" y="83" font-size="9" fill="#999">250</text>
                  <text x="0" y="113" font-size="9" fill="#999">200</text>
                  <text x="0" y="133" font-size="9" fill="#999">150</text>
                  <!-- Candlestick bars (weekly, gradual uptrend) -->
                  <!-- Each candle: rect for body, line for wick -->
                  <!-- Rising candles (red in JP) -->
                  <line x1="35" y1="138" x2="35" y2="125" stroke="#cc3300" stroke-width="1"/>
                  <rect x="32" y="130" width="6" height="8" fill="#cc3300"/>
                  <line x1="48" y1="136" x2="48" y2="120" stroke="#cc3300" stroke-width="1"/>
                  <rect x="45" y="126" width="6" height="10" fill="#cc3300"/>
                  <line x1="61" y1="128" x2="61" y2="115" stroke="#0066cc" stroke-width="1"/>
                  <rect x="58" y="118" width="6" height="10" fill="#0066cc"/>
                  <line x1="74" y1="125" x2="74" y2="112" stroke="#cc3300" stroke-width="1"/>
                  <rect x="71" y="116" width="6" height="9" fill="#cc3300"/>
                  <line x1="87" y1="130" x2="87" y2="118" stroke="#0066cc" stroke-width="1"/>
                  <rect x="84" y="122" width="6" height="8" fill="#0066cc"/>
                  <line x1="100" y1="122" x2="100" y2="108" stroke="#cc3300" stroke-width="1"/>
                  <rect x="97" y="112" width="6" height="10" fill="#cc3300"/>
                  <line x1="113" y1="118" x2="113" y2="105" stroke="#cc3300" stroke-width="1"/>
                  <rect x="110" y="109" width="6" height="9" fill="#cc3300"/>
                  <line x1="126" y1="115" x2="126" y2="100" stroke="#0066cc" stroke-width="1"/>
                  <rect x="123" y="104" width="6" height="11" fill="#0066cc"/>
                  <line x1="139" y1="108" x2="139" y2="94" stroke="#cc3300" stroke-width="1"/>
                  <rect x="136" y="98" width="6" height="10" fill="#cc3300"/>
                  <line x1="152" y1="105" x2="152" y2="90" stroke="#cc3300" stroke-width="1"/>
                  <rect x="149" y="94" width="6" height="11" fill="#cc3300"/>
                  <line x1="165" y1="110" x2="165" y2="96" stroke="#0066cc" stroke-width="1"/>
                  <rect x="162" y="100" width="6" height="10" fill="#0066cc"/>
                  <line x1="178" y1="100" x2="178" y2="85" stroke="#cc3300" stroke-width="1"/>
                  <rect x="175" y="89" width="6" height="11" fill="#cc3300"/>
                  <line x1="191" y1="96" x2="191" y2="80" stroke="#cc3300" stroke-width="1"/>
                  <rect x="188" y="84" width="6" height="12" fill="#cc3300"/>
                  <line x1="204" y1="92" x2="204" y2="76" stroke="#0066cc" stroke-width="1"/>
                  <rect x="201" y="80" width="6" height="12" fill="#0066cc"/>
                  <line x1="217" y1="85" x2="217" y2="68" stroke="#cc3300" stroke-width="1"/>
                  <rect x="214" y="72" width="6" height="13" fill="#cc3300"/>
                  <line x1="230" y1="88" x2="230" y2="72" stroke="#0066cc" stroke-width="1"/>
                  <rect x="227" y="76" width="6" height="12" fill="#0066cc"/>
                  <line x1="243" y1="78" x2="243" y2="62" stroke="#cc3300" stroke-width="1"/>
                  <rect x="240" y="66" width="6" height="12" fill="#cc3300"/>
                  <line x1="256" y1="72" x2="256" y2="55" stroke="#cc3300" stroke-width="1"/>
                  <rect x="253" y="59" width="6" height="13" fill="#cc3300"/>
                  <line x1="269" y1="78" x2="269" y2="60" stroke="#0066cc" stroke-width="1"/>
                  <rect x="266" y="64" width="6" height="14" fill="#0066cc"/>
                  <line x1="282" y1="65" x2="282" y2="48" stroke="#cc3300" stroke-width="1"/>
                  <rect x="279" y="52" width="6" height="13" fill="#cc3300"/>
                  <line x1="295" y1="60" x2="295" y2="42" stroke="#cc3300" stroke-width="1"/>
                  <rect x="292" y="46" width="6" height="14" fill="#cc3300"/>
                  <line x1="308" y1="65" x2="308" y2="48" stroke="#0066cc" stroke-width="1"/>
                  <rect x="305" y="52" width="6" height="13" fill="#0066cc"/>
                  <line x1="321" y1="56" x2="321" y2="38" stroke="#cc3300" stroke-width="1"/>
                  <rect x="318" y="42" width="6" height="14" fill="#cc3300"/>
                  <line x1="334" y1="50" x2="334" y2="32" stroke="#cc3300" stroke-width="1"/>
                  <rect x="331" y="36" width="6" height="14" fill="#cc3300"/>
                  <line x1="347" y1="45" x2="347" y2="28" stroke="#cc3300" stroke-width="1"/>
                  <rect x="344" y="32" width="6" height="13" fill="#cc3300"/>
                  <line x1="360" y1="40" x2="360" y2="22" stroke="#0066cc" stroke-width="1"/>
                  <rect x="357" y="26" width="6" height="14" fill="#0066cc"/>
                  <!-- Date labels -->
                  <text x="28" y="150" font-size="8" fill="#aaa">24/12/23</text>
                  <text x="88" y="150" font-size="8" fill="#aaa">25/02/03</text>
                  <text x="148" y="150" font-size="8" fill="#aaa">25/03/17</text>
                  <text x="208" y="150" font-size="8" fill="#aaa">25/04/28</text>
                  <text x="268" y="150" font-size="8" fill="#aaa">25/06/09</text>
                  <text x="328" y="150" font-size="8" fill="#aaa">25/11/24</text>
                </svg>
              </div>
            </div>

            <!-- News tab -->
            <div *ngIf="infoTab==='news'" class="p-3 text-xs text-gray-500">
              <p>ニュース情報は現在取得できません。</p>
            </div>

            <!-- Other info tab -->
            <div *ngIf="infoTab==='other'" class="p-3 text-xs text-gray-500">
              <p>その他銘柄情報は現在取得できません。</p>
            </div>
          </div>
        </div>

      </div>

      <!-- ===== NOTICE SECTION (full width) ===== -->
      <div class="notice-section px-6 py-3 mt-0" style="border-top: 2px solid #ddd;">
        <h2 class="font-bold mb-2" style="font-size: 13px; color: #333; border-left: 3px solid #0066cc; padding-left: 6px;">ご注意事項</h2>
        <div class="text-xs text-gray-700 leading-relaxed space-y-3" style="max-width: 960px;">

          <div>
            <p class="font-bold mb-1">【取引方法について】</p>
            <p>「<a href="#" style="color:#cc3300; text-decoration:underline;">売買委託注文の取扱いの停止・注文受付中止・インサイダー取引規制</a>」の情報をご確認した上で、必要事項を選択または入力した後、下記「注文内容を確認」ボタンをクリックしてください。<br>
            株注文は（現物・信用取引等）、取消しをする場合は、注文の約定が確認されるまでは取消しを実施してください。日計り取引については、まず売却してから、改めて同銘柄の再発注を行ってください。<br>
            取引時間中については、取引の状況によっては訂正が実施できない場合があります。</p>
            <p class="font-bold mt-1" style="color: #cc3300;">信用取引の株注文のため、配当金相当額が控除されて決済されます。また、品貸料・逆日歩が発生した場合、追加コストとして負担が生じます。</p>
            <p class="mt-1">信用取引の詳細については<a href="#" class="notice-link">信用取引案内</a>をご確認ください。<br>
            信用取引には「制度信用取引」と「一般信用取引」があります。制度信用取引は取引所の制度に基づく取引です。一般信用取引は当社との間で締結した個別の条件に基づく取引です。<br>
            1.制度信用取引では、売建の場合は取引所の貸借銘柄であることが必要です。<br>
            2.一般信用取引では、当社の一般信用取引可能銘柄であることが必要です。</p>
          </div>

          <div>
            <p class="font-bold mb-1">【注文内容の確認】</p>
            <p>1.注文確認書面・注文完了画面についてはご確認し、「<a href="#" class="notice-link">売買委託手数料</a>」をご選択してください。<br>
            2.取引に関しては、注文が成立した後、注文の取消・訂正はできません。注文内容をよくご確認の上、注文を行ってください。<br>
            3.注文完了後は「<a href="#" class="notice-link">上場有価証券等書面</a>」をご確認ください。</p>
          </div>

          <div>
            <p class="font-bold mb-1">【注文条件・執行条件・有効期限・SOR注文について】</p>
            <p>1.指値注文の制限は、「<a href="#" class="notice-link">呼び値の単位</a>」及び「<a href="#" class="notice-link">値幅制限</a>」一覧表のとおりに制限されます。<br>
            2.成行注文は、市場での売買において最も優先される注文方法です。成行注文の場合、以下の有効期限は「当日」のみとなります。<br>
            &emsp;●成行注文、寄指（寄付指値）注文、引成（引け成行）注文 および「引指（引け指値）」注文<br>
            &emsp;●Lデュアル板寄せの注文<br>
            3.SOR注文とは: SOR（スマート・オーダー・ルーティング）は、複数の市場・取引所から最良の執行条件を持つ市場を選択して注文を執行するシステムです。SOR注文を「する」に設定した場合、当社のSORシステムが最良執行先を自動的に選択します。</p>
          </div>

          <div>
            <p class="mb-1">当社のSOR注文の執行方法について、<a href="#" class="notice-link">最良執行方針書</a>にて当社のSOR注文の執行方針を詳しく確認できます。当社は、複数の市場・取引所から最良の執行条件を持つ市場を選択して注文を執行するシステムです。市場流動性の状況によっては期待した金額・数量で注文が成立しない場合があります。SOR注文利用時は事前に最良執行方針をご確認ください。</p>
          </div>

          <div>
            <p class="font-bold mb-1">【期間指定定義について】</p>
            <p>期間指定の取引日の営業日のカウントは以下のとおりです。<br>
            ・現物取引（株式）: 注文の発注日から起算して最長30営業日まで<br>
            ・信用取引（制度）: 注文の発注日から起算して最長30営業日まで（返済期限超過の場合は不可）<br>
            ・信用取引（一般）: 注文の発注日から起算して最長30営業日まで（当社が定める期限内）<br>
            なお、上記期間が経過しても注文が成立しなかった場合は、自動的に失効します。</p>
          </div>

          <div>
            <p class="font-bold mb-1">【IOC注文について】</p>
            <p>以下の注文については、IOC（Immediate or Cancel）条件が適用されます。<br>
            ・対象注文: 板寄注文のみ<br>
            ・約定できた数量のみが約定し、残数量は自動的に取り消されます。<br>
            ・IOC注文は、注文受付時の板状況により約定金額が決定されます。<br>
            ・対象外注文: 全数量が約定できなかった場合、全数量が取り消されます。</p>
          </div>

          <div>
            <p class="font-bold mb-1">【その他の注意事項】</p>
            <p>・当社の取引システムはメンテナンス等により、一時的に取引ができない場合があります。<br>
            ・取引所の取引システム障害等により、注文の執行に影響が生じる場合があります。<br>
            ・相場情報は取引所から提供される情報であり、遅延が生じる場合があります。<br>
            ・株式の売買に際しては、取引委託手数料のほか、消費税等がかかります。<br>
            ・当社は、<a href="#" class="notice-link">金融商品取引法</a>等の関係法令および当社の社内規則に従い業務を行っています。<br>
            ・株式等の取引には価格変動リスクがあります。投資元本が保証されるものではありません。過去の実績は将来の運用成果等を保証するものではありません。<br>
            ・当社のお取引における個人情報の取り扱いについては、<a href="#" class="notice-link">個人情報保護方針</a>をご確認ください。<br>
            ・オンライントレードの取引ルールや各種サービスの詳細については、<a href="#" class="notice-link">ご利用規約</a>をご確認ください。</p>
          </div>

        </div>
      </div>

      <!-- ===== FOOTER ===== -->
      <div class="py-3 text-center text-xs text-gray-500" style="border-top: 1px solid #eee; background: #f9f9f9;">
        <p>© Daiwa Securities Co. Ltd. All Rights Reserved.</p>
      </div>

    </div>
  `,
})
export class DomesticOrderComponent {
  // フォーム状態
  buySell = 'buy';
  stockCode = '6758';
  stockName = 'ソニーグループ';
  stockMarket = '東証プライム';
  account = 'toku';
  quantity: number = 100;
  orderType = 'sashine';
  limitPrice = '3220';
  sorCondition = 'yes';
  tradeCondition = 'none';
  expiry = 'today';
  expiryDate = '';
  continuousOrder = 'none';

  // UI状態
  showSell = false;
  showBuy = true;
  showBuyingPower = true;
  nisaUnsupported = true;
  linkEnabled = false;
  infoTab = 'summary';
  chartPeriod = 'week';

  // 株価情報
  currentPrice = 3220.0;
  priceChange = -24.5;
  priceChangePct = '-2.36';
  boardCurrentPrice = 330;

  get estimatedAmount(): number {
    const price = parseFloat(this.limitPrice) || this.currentPrice;
    return this.quantity * price;
  }

  // 株価統計（参考情報パネル用）
  priceStats = [
    { label: '前日終値', value: '1,034.0' },
    { label: '始値', value: '975.5' },
    { label: '高値', value: '1024.1' },
    { label: '安値', value: '961.0' },
    { label: '出来高', value: '12,186,200' },
    { label: 'VWAP', value: '12,186,200' },
  ];

  // 板情報（売: 338-331, 買: 329-323）
  orderBook = {
    sell: [
      { price: 338, qty: 20000 },
      { price: 337, qty: 20000 },
      { price: 336, qty: 20000 },
      { price: 335, qty: 20000 },
      { price: 334, qty: 20000 },
      { price: 333, qty: 20000 },
      { price: 332, qty: 20000 },
      { price: 331, qty: 20000 },
    ],
    buy: [
      { price: 330, qty: 15000 },
      { price: 329, qty: 15000 },
      { price: 328, qty: 15000 },
      { price: 327, qty: 15000 },
      { price: 326, qty: 15000 },
      { price: 325, qty: 15000 },
      { price: 324, qty: 15000 },
    ],
  };

  clearForm() {
    this.quantity = 100;
    this.orderType = 'sashine';
    this.limitPrice = '3220';
    this.sorCondition = 'yes';
    this.tradeCondition = 'none';
    this.expiry = 'today';
    this.expiryDate = '';
    this.continuousOrder = 'none';
  }

  confirmOrder() {
    const side = this.buySell === 'buy' ? '買付' : '売付';
    const type = this.orderType === 'nariyuki' ? '成行' : `指値 ${this.limitPrice}円`;
    alert(`注文内容を確認してください。\n${this.stockName} ${side} ${this.quantity}株 ${type}`);
  }
}
