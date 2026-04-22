import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kabu-page-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer style="font-family: var(--font_default); font-size: 11px; color: #555;">
      <!-- Upper footer links -->
      <div class="py-4 px-6 text-center border-t" style="border-color: #ccc;">
        <div class="flex flex-wrap justify-center gap-4 mb-2">
          <a *ngFor="let link of upperLinks" href="#" class="text-blue-600 hover:underline">{{ link }}</a>
        </div>
        <div class="flex flex-wrap justify-center gap-4">
          <a *ngFor="let link of lowerLinks" href="#" class="text-blue-600 hover:underline">{{ link }}</a>
        </div>
      </div>

      <!-- Notice box -->
      <div class="mx-4 mb-4 p-3 border rounded text-xs leading-relaxed" style="border-color: #ccc; background-color: white;">
        <p class="font-bold mb-1">⚠ ご注意</p>
        <p>大和証券株式会社がインターネット上で公開している情報については、大和証券の許可なく転用、販売することを固く禁じます。また、提供している情報の内容に関しては万全を期していますが、その内容を保証するものではありません。万一この情報に基づいて被ったいかなる損害についても、大和証券は一切責任を負い兼ねます。投資にあたっての最終判断はお客様ご自身の判断でお願いします。</p>
        <div class="mt-2">
          <p>商号等：大和証券株式会社　金融商品取引業者　関東財務局長（金商）第108号</p>
          <p>加入協会：<a href="#" class="text-blue-600 hover:underline">日本証券業協会</a>、<a href="#" class="text-blue-600 hover:underline">一般社団法人日本投資顧問業協会</a>、<a href="#" class="text-blue-600 hover:underline">一般社団法人金融先物取引業協会</a>、<a href="#" class="text-blue-600 hover:underline">一般社団法人第二種金融商品取引業協会</a>、<a href="#" class="text-blue-600 hover:underline">一般社団法人日本STO協会</a></p>
        </div>
      </div>

      <!-- Copyright bar -->
      <div class="py-2 text-center text-xs text-white font-medium" style="background-color: var(--cc-primary);">
        Copyright (c) DAIWA Securities Co., Ltd.
      </div>
    </footer>
  `,
})
export class KabuPageFooterComponent {
  upperLinks = [
    'オンライントレードで取り扱う金融商品のリスク等について',
    '金融商品取引法の施行にともなう当社の対応について',
  ];
  lowerLinks = [
    'サイトマップ', 'ご利用環境', 'ご利用時間', '個人情報の取り扱い',
    'サイトポリシー', 'システム障害時の対応について', '内部者に該当するお客さまへ',
  ];
}
