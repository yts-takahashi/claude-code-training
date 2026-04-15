import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-domestic-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    @media (min-width: 1024px) {
      .sidebar-area {
        width: 300px;
        flex-shrink: 0;
        border-top: none !important;
        border-left: 1px solid #ddd;
      }
    }
  `],
  template: `
    <div class="min-h-screen bg-white" style="font-size: 12px; color: #333; font-family: 'Noto Sans JP', 'Meiryo', sans-serif;">

      <!-- Top Header -->
      <header>
        <!-- Top bar -->
        <div class="flex items-center justify-between px-2 py-1 text-white" style="background-color: #e84020; font-size: 11px;">
          <div class="flex items-center gap-2">
            <span class="font-bold" style="font-size: 15px;">大阪証券</span>
            <span class="text-xs ml-3">ログアウト</span>
            <span class="mx-1">|</span>
            <span>口座番号: 1234567890</span>
          </div>
          <div class="flex items-center gap-2">
            <span>お客様の氏名: 山田 太郎 様</span>
            <span class="mx-1">|</span>
            <span>2024/04/15 10:30</span>
            <span class="mx-1">|</span>
            <a href="#" class="underline text-white">ヘルプ</a>
            <span class="mx-1">|</span>
            <a href="#" class="underline text-white">お問い合わせ</a>
          </div>
        </div>

        <!-- Main Navigation -->
        <nav class="flex items-center gap-1 px-2 py-1 text-white text-xs" style="background-color: #c03010;">
          <a href="#" class="px-2 py-0.5 hover:text-yellow-200">トップ</a>
          <span>|</span>
          <a href="#" class="px-2 py-0.5 bg-white text-red-700 font-bold">国内株式</a>
          <span>|</span>
          <a href="#" class="px-2 py-0.5 hover:text-yellow-200">外国株式</a>
          <span>|</span>
          <a href="#" class="px-2 py-0.5 hover:text-yellow-200">投資信託</a>
          <span>|</span>
          <a href="#" class="px-2 py-0.5 hover:text-yellow-200">債券</a>
          <span>|</span>
          <a href="#" class="px-2 py-0.5 hover:text-yellow-200">FX</a>
          <span>|</span>
          <a href="#" class="px-2 py-0.5 hover:text-yellow-200">口座管理</a>
          <span>|</span>
          <a href="#" class="px-2 py-0.5 hover:text-yellow-200">資産確認</a>
          <span>|</span>
          <a href="#" class="px-2 py-0.5 hover:text-yellow-200">マーケット</a>
        </nav>

        <!-- Sub Navigation -->
        <nav class="flex items-center gap-1 px-2 py-1 text-white text-xs" style="background-color: #666;">
          <a href="#" class="hover:text-yellow-200">注文・訂正・取消</a>
          <span>›</span>
          <a href="#" class="hover:text-yellow-200">注文照会</a>
          <span>›</span>
          <a href="#" class="hover:text-yellow-200">約定照会</a>
          <span>›</span>
          <a href="#" class="hover:text-yellow-200">保有株式一覧</a>
          <span>›</span>
          <a href="#" class="hover:text-yellow-200">株式相場</a>
          <span>›</span>
          <a href="#" class="hover:text-yellow-200">ランキング</a>
          <span>›</span>
          <a href="#" class="hover:text-yellow-200">銘柄検索</a>
        </nav>

        <!-- Breadcrumb + info bar -->
        <div class="flex items-center justify-between px-2 py-1 text-xs" style="background-color: #f0f0f0; border-bottom: 1px solid #ccc;">
          <div class="flex items-center gap-1 text-gray-600">
            <a href="#" class="text-blue-700 hover:underline">ホーム</a>
            <span>›</span>
            <a href="#" class="text-blue-700 hover:underline">国内株式</a>
            <span>›</span>
            <span>注文入力</span>
          </div>
          <div class="text-gray-500" style="font-size: 10px;">現在値は15分遅延表示です</div>
        </div>
      </header>

      <!-- Main 2-column layout -->
      <div class="flex flex-col lg:flex-row" style="min-height: 800px;">

        <!-- ===== Left Column: Order Form ===== -->
        <div class="flex-1 px-3 pt-2 pb-6" style="min-width: 0; border-right: 1px solid #ddd;">

          <!-- Page Title -->
          <h1 class="font-bold mb-2" style="font-size: 13px; color: #c03010; border-bottom: 2px solid #e84020; padding-bottom: 3px;">
            【注文入力】
          </h1>

          <!-- Order Form Table -->
          <div style="border: 1px solid #bbb;">
            <table class="w-full" style="border-collapse: collapse; font-size: 11px;">
              <tbody>

                <!-- 銘柄グループ -->
                <tr style="border-bottom: 1px solid #ccc;">
                  <td class="px-2 py-1.5 font-bold align-middle whitespace-nowrap" style="width: 90px; background: #e8eef5; border-right: 1px solid #ccc;">銘柄グループ</td>
                  <td class="px-2 py-1.5">
                    <div class="flex items-center gap-2">
                      <select class="px-1 py-0.5 border border-gray-400 text-xs" style="width: 180px;" [(ngModel)]="stockGroup">
                        <option value="">-- 選択してください --</option>
                        <option value="1">保有株式から選択</option>
                        <option value="2">お気に入りから選択</option>
                      </select>
                      <span class="text-gray-500" style="font-size: 10px;">※銘柄グループから選択できます</span>
                    </div>
                  </td>
                </tr>

                <!-- 銘柄 -->
                <tr style="border-bottom: 1px solid #ccc;">
                  <td class="px-2 py-1.5 font-bold align-top whitespace-nowrap" style="background: #e8eef5; border-right: 1px solid #ccc;">銘柄</td>
                  <td class="px-2 py-1.5">
                    <div class="flex items-center gap-1 flex-wrap">
                      <input type="text" [(ngModel)]="stockCode" placeholder="コード" class="px-1 py-0.5 border border-gray-400 text-xs" style="width: 60px;" />
                      <select class="px-1 py-0.5 border border-gray-400 text-xs" [(ngModel)]="market">
                        <option value="t">東証</option>
                        <option value="o">大証</option>
                        <option value="n">名証</option>
                        <option value="s">札証</option>
                        <option value="f">福証</option>
                      </select>
                      <button class="px-2 py-0.5 text-white text-xs" style="background-color: #336699;">銘柄検索</button>
                    </div>
                    <div class="mt-1 text-xs" *ngIf="stockCode">
                      <span class="font-bold text-blue-700">{{ stockName }}</span>
                      <span class="ml-2">現在値:</span>
                      <span class="font-bold text-red-600 ml-1">{{ currentPrice | number }}</span>
                      <span>円</span>
                      <span class="ml-3 text-red-600">前日比: +45円 (+1.45%)</span>
                    </div>
                    <div class="mt-0.5 text-xs text-gray-500" *ngIf="stockCode">
                      出来高: 12,345,678株　高値: 3,150円　安値: 3,080円
                    </div>
                  </td>
                </tr>

                <!-- 売買区分 -->
                <tr style="border-bottom: 1px solid #ccc;">
                  <td class="px-2 py-1.5 font-bold align-middle whitespace-nowrap" style="background: #e8eef5; border-right: 1px solid #ccc;">売買区分</td>
                  <td class="px-2 py-1.5">
                    <div class="flex items-center gap-4">
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="orderSide" value="buy" [(ngModel)]="orderSide" />
                        <span class="font-bold" style="color: #cc0000;">買い注文</span>
                      </label>
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="orderSide" value="sell" [(ngModel)]="orderSide" />
                        <span class="font-bold" style="color: #0066cc;">売り注文</span>
                      </label>
                    </div>
                  </td>
                </tr>

                <!-- 株数 -->
                <tr style="border-bottom: 1px solid #ccc;">
                  <td class="px-2 py-1.5 font-bold align-middle whitespace-nowrap" style="background: #e8eef5; border-right: 1px solid #ccc;">株数</td>
                  <td class="px-2 py-1.5">
                    <div class="flex items-center gap-1 flex-wrap">
                      <input type="number" [(ngModel)]="quantity" placeholder="0" class="px-1 py-0.5 border border-gray-400 text-xs text-right" style="width: 70px;" />
                      <span class="text-xs">株</span>
                      <span class="text-xs text-gray-500 mx-2">（1単元: 100株）</span>
                      <button class="px-1.5 py-0.5 text-xs border border-gray-400 bg-gray-100" (click)="setQuantity(100)">100</button>
                      <button class="px-1.5 py-0.5 text-xs border border-gray-400 bg-gray-100" (click)="setQuantity(200)">200</button>
                      <button class="px-1.5 py-0.5 text-xs border border-gray-400 bg-gray-100" (click)="setQuantity(300)">300</button>
                      <button class="px-1.5 py-0.5 text-xs border border-gray-400 bg-gray-100" (click)="setQuantity(500)">500</button>
                      <button class="px-1.5 py-0.5 text-xs border border-gray-400 bg-gray-100" (click)="setQuantity(1000)">1000</button>
                    </div>
                  </td>
                </tr>

                <!-- 注文区分 -->
                <tr style="border-bottom: 1px solid #ccc;">
                  <td class="px-2 py-1.5 font-bold align-middle whitespace-nowrap" style="background: #e8eef5; border-right: 1px solid #ccc;">注文区分</td>
                  <td class="px-2 py-1.5">
                    <div class="flex items-center gap-3 flex-wrap">
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="priceType" value="market" [(ngModel)]="priceType" />
                        <span>成行</span>
                      </label>
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="priceType" value="limit" [(ngModel)]="priceType" />
                        <span>指値</span>
                      </label>
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="priceType" value="stop_limit" [(ngModel)]="priceType" />
                        <span>逆指値</span>
                      </label>
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="priceType" value="funari" [(ngModel)]="priceType" />
                        <span>不成</span>
                      </label>
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="priceType" value="yoritsuki" [(ngModel)]="priceType" />
                        <span>寄指</span>
                      </label>
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="priceType" value="hike" [(ngModel)]="priceType" />
                        <span>引指</span>
                      </label>
                    </div>
                  </td>
                </tr>

                <!-- 指値価格（指値選択時のみ） -->
                <tr style="border-bottom: 1px solid #ccc;" *ngIf="priceType !== 'market'">
                  <td class="px-2 py-1.5 font-bold align-middle whitespace-nowrap" style="background: #e8eef5; border-right: 1px solid #ccc;">
                    {{ priceType === 'stop_limit' ? '逆指値' : '指値価格' }}
                  </td>
                  <td class="px-2 py-1.5">
                    <div class="flex items-center gap-2">
                      <input type="number" [(ngModel)]="limitPrice" placeholder="0" class="px-1 py-0.5 border border-gray-400 text-xs text-right" style="width: 70px;" />
                      <span class="text-xs">円</span>
                      <span class="text-xs text-gray-500 ml-2" *ngIf="currentPrice">
                        （現在値: <span class="font-bold">{{ currentPrice | number }}</span>円）
                      </span>
                    </div>
                  </td>
                </tr>

                <!-- 取引区分 -->
                <tr style="border-bottom: 1px solid #ccc;">
                  <td class="px-2 py-1.5 font-bold align-middle whitespace-nowrap" style="background: #e8eef5; border-right: 1px solid #ccc;">取引区分</td>
                  <td class="px-2 py-1.5">
                    <div class="flex items-center gap-4">
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="tradeType" value="spot" [(ngModel)]="tradeType" />
                        <span>現物取引</span>
                      </label>
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="tradeType" value="margin_new" [(ngModel)]="tradeType" />
                        <span>信用新規</span>
                      </label>
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="tradeType" value="margin_close" [(ngModel)]="tradeType" />
                        <span>信用返済</span>
                      </label>
                    </div>
                  </td>
                </tr>

                <!-- 有効期限 -->
                <tr style="border-bottom: 1px solid #ccc;">
                  <td class="px-2 py-1.5 font-bold align-middle whitespace-nowrap" style="background: #e8eef5; border-right: 1px solid #ccc;">有効期限</td>
                  <td class="px-2 py-1.5">
                    <div class="flex items-center gap-3 flex-wrap">
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="expiry" value="today" [(ngModel)]="expiry" />
                        <span>当日中</span>
                      </label>
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="expiry" value="week" [(ngModel)]="expiry" />
                        <span>今週中</span>
                      </label>
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="expiry" value="specify" [(ngModel)]="expiry" />
                        <span>期間指定</span>
                      </label>
                      <div class="flex items-center gap-1" *ngIf="expiry === 'specify'">
                        <input type="date" [(ngModel)]="expiryDate" class="px-1 py-0.5 border border-gray-400 text-xs" />
                        <span class="text-xs">まで</span>
                      </div>
                    </div>
                  </td>
                </tr>

                <!-- 口座区分 -->
                <tr style="border-bottom: 1px solid #ccc;">
                  <td class="px-2 py-1.5 font-bold align-middle whitespace-nowrap" style="background: #e8eef5; border-right: 1px solid #ccc;">口座区分</td>
                  <td class="px-2 py-1.5">
                    <div class="flex items-center gap-4">
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="account" value="tokutei" [(ngModel)]="account" />
                        <span>特定口座</span>
                      </label>
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="account" value="ippan" [(ngModel)]="account" />
                        <span>一般口座</span>
                      </label>
                      <label class="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="account" value="nisa" [(ngModel)]="account" />
                        <span>NISA口座</span>
                      </label>
                    </div>
                  </td>
                </tr>

                <!-- 発注数量合計 -->
                <tr>
                  <td class="px-2 py-1.5 font-bold align-middle whitespace-nowrap" style="background: #e8eef5; border-right: 1px solid #ccc;">発注数量合計</td>
                  <td class="px-2 py-1.5">
                    <div class="flex items-center gap-4">
                      <span class="font-bold">{{ (quantity || 0) | number }}株</span>
                      <span class="text-xs text-gray-600 ml-2" *ngIf="quantity && priceType !== 'market' && limitPrice">
                        概算金額: <span class="font-bold text-red-600">{{ (quantity * limitPrice) | number }}円</span>
                        <span class="text-gray-400 ml-1">（手数料別）</span>
                      </span>
                      <span class="text-xs text-gray-600 ml-2" *ngIf="quantity && priceType === 'market' && currentPrice">
                        概算金額: <span class="font-bold text-red-600">{{ (quantity * currentPrice) | number }}円</span>
                        <span class="text-gray-400 ml-1">（概算・手数料別）</span>
                      </span>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          <!-- Warning Notice -->
          <div class="mt-2 px-3 py-2 text-xs" style="background: #fff8e1; border: 1px solid #f0c040; border-left: 3px solid #e08000;">
            <p class="font-bold mb-1" style="color: #8b5e00;">⚠ ご注意</p>
            <p class="text-gray-700 leading-relaxed">
              ・注文内容をご確認のうえ、「{{ orderSide === 'buy' ? '買い注文を発注する' : '売り注文を発注する' }}」ボタンを押してください。<br>
              ・成行注文は市場の状況によっては予期しない価格で約定する場合があります。<br>
              ・注文確定後の取消・訂正はできない場合があります。
            </p>
          </div>

          <!-- Submit Button Area -->
          <div class="mt-3 text-center py-3" style="border: 1px solid #ddd; background: #fafafa;">
            <button
              (click)="submitOrder()"
              class="px-12 py-2.5 text-white font-bold"
              [style.background-color]="orderSide === 'buy' ? '#cc0000' : '#0066cc'"
              style="font-size: 13px; border: none; cursor: pointer; min-width: 220px;"
            >
              {{ orderSide === 'buy' ? '買い注文を発注する' : '売り注文を発注する' }}
            </button>
          </div>

          <!-- Additional Links -->
          <div class="mt-2 text-xs text-center" style="color: #333;">
            <a href="#" class="text-blue-700 underline mr-4">国内株式注文</a>
            <a href="#" class="text-blue-700 underline mr-4">現物取引</a>
            <a href="#" class="text-blue-700 underline mr-4">外国株式注文</a>
            <a href="#" class="text-blue-700 underline mr-4">投資信託注文</a>
            <a href="#" class="text-blue-700 underline mr-4">FX取引</a>
            <a href="#" class="text-blue-700 underline">公社債注文</a>
          </div>

          <!-- 注意事項 (long text) -->
          <div class="mt-4">
            <h3 class="font-bold py-1 px-2 mb-2 text-xs text-white" style="background-color: #c03010;">ご注意事項</h3>
            <div class="text-xs text-gray-700 leading-relaxed space-y-2 px-1">
              <p>
                当社は、お客様が株式等の取引に関して、以下の点についてご了解の上でご注文いただくことを前提として取引の執行を行います。
              </p>
              <p>
                <span class="font-bold text-red-700">【リスクについて】</span><br>
                株式等の価格は、需要と供給の関係等の要因により変動します。このため、市場価格が予期せぬ方向に動くことがあります。成行注文を行った場合、最終的な約定価格は、注文時の現在値より大幅に乖離することがあります。また、指値注文の場合でも、相場状況によっては注文が全部または一部約定されないことがあります。
              </p>
              <p>
                <span class="font-bold text-red-700">【信用取引について】</span><br>
                信用取引は、委託保証金を担保として、委託保証金の約3.3倍程度の取引が行えます。株価の変動により、投資額以上の損失を生じる場合があります。追証が発生した場合は、追加の保証金を差し入れていただく必要があります。
              </p>
              <p>
                お客様の投資判断に基づいてご注文ください。当社は、お客様の取引から生じた損失に対して責任を負いません。
              </p>
              <p>
                取引手数料については、別途「手数料一覧」をご確認ください。手数料は取引代金により異なります。
              </p>
              <p>
                注文確定後は、原則として取消・訂正はできません。ただし、未約定の注文については、取引時間内であれば訂正・取消が可能な場合があります。
              </p>
              <p>
                当社の取引システムは、取引所の取引システムとは独立して動作しています。当社のシステム障害が発生した場合でも、取引所への注文が執行されている場合があります。
              </p>
              <p>
                お客様が投資判断を行う際には、有価証券報告書、目論見書等の書類をご確認の上、十分にご理解いただくことをお勧めします。
              </p>
            </div>
          </div>

          <!-- Footer Links section -->
          <div class="mt-4 pt-3 text-xs text-center" style="border-top: 1px solid #ddd;">
            <p class="mb-2 text-gray-600">
              オンライントレードについてご不明な点はこちら ｜
              <a href="#" class="text-blue-700 underline">よくあるご質問</a> ｜
              <a href="#" class="text-blue-700 underline">操作方法</a> ｜
              <a href="#" class="text-blue-700 underline">お問い合わせ</a>
            </p>
          </div>

          <!-- Bottom Notice Box -->
          <div class="mt-2 p-3 text-xs" style="background: #f5f5f5; border: 1px solid #ddd;">
            <p class="font-bold mb-1">ご注意事項</p>
            <p class="text-gray-600 leading-relaxed">
              当社の株式売買手数料は、1日の約定代金合計額に応じた一律手数料制です。詳細は
              <a href="#" class="text-blue-700 underline">手数料一覧</a>
              をご覧ください。<br>
              株式等の売買は、株価の変動等により損失が生じるおそれがあります。上場有価証券等書面および目論見書等の内容を十分にご理解のうえ、ご自身の判断と責任においてご投資ください。<br>
              ご不明な点は
              <a href="#" class="text-blue-700 underline">カスタマーサポート</a>
              までお問い合わせください。
            </p>
          </div>

        </div>

        <!-- ===== Right Sidebar: Market Data ===== -->
        <div class="px-2 pt-2 pb-4 sidebar-area" style="font-size: 11px; border-top: 1px solid #ddd;">

          <!-- 概況 -->
          <div class="mb-3">
            <h3 class="font-bold text-xs py-0.5 px-2 mb-1 text-white" style="background-color: #336699; font-size: 11px;">概況</h3>
            <table class="w-full" style="border-collapse: collapse; font-size: 11px;">
              <thead>
                <tr style="background: #dde4ed;">
                  <th class="px-1 py-0.5 border border-gray-300 text-left text-xs">指標</th>
                  <th class="px-1 py-0.5 border border-gray-300 text-right text-xs">現在値</th>
                  <th class="px-1 py-0.5 border border-gray-300 text-right text-xs">前日比</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="px-1 py-0.5 border border-gray-200">日経平均</td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right font-bold">38,157</td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right text-red-600">▲245</td>
                </tr>
                <tr style="background: #f9f9f9;">
                  <td class="px-1 py-0.5 border border-gray-200">TOPIX</td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right font-bold">2,684</td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right text-red-600">▲18</td>
                </tr>
                <tr>
                  <td class="px-1 py-0.5 border border-gray-200">グロース250</td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right font-bold">654</td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right text-blue-600">▼3</td>
                </tr>
                <tr style="background: #f9f9f9;">
                  <td class="px-1 py-0.5 border border-gray-200">ドル円</td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right font-bold">151.82</td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right text-red-600">▲0.34</td>
                </tr>
                <tr>
                  <td class="px-1 py-0.5 border border-gray-200">NYダウ</td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right font-bold">38,503</td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right text-red-600">▲125</td>
                </tr>
              </tbody>
            </table>
            <div class="text-right text-gray-400 mt-0.5" style="font-size: 10px;">15分遅延 04/15 10:30</div>
          </div>

          <!-- 保有株式 -->
          <div class="mb-3">
            <h3 class="font-bold py-0.5 px-2 mb-1 text-white" style="background-color: #336699; font-size: 11px;">保有株式</h3>
            <table class="w-full" style="border-collapse: collapse; font-size: 10px;">
              <thead>
                <tr style="background: #dde4ed;">
                  <th class="px-1 py-0.5 border border-gray-300 text-left">銘柄</th>
                  <th class="px-1 py-0.5 border border-gray-300 text-right">株数</th>
                  <th class="px-1 py-0.5 border border-gray-300 text-right">現在値</th>
                  <th class="px-1 py-0.5 border border-gray-300 text-right">評価損益</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let s of holdings; let i = index" [style.background]="i % 2 === 0 ? '#fff' : '#f5f5f5'">
                  <td class="px-1 py-0.5 border border-gray-200">
                    <a href="#" class="text-blue-700">{{ s.code }}</a>
                  </td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right">{{ s.qty | number }}</td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right">{{ s.price | number }}</td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right" [style.color]="s.pnl >= 0 ? '#cc0000' : '#0066cc'">
                    {{ s.pnl >= 0 ? '+' : '' }}{{ s.pnl | number }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Stock Chart (Line chart) -->
          <div class="mb-3">
            <h3 class="font-bold py-0.5 px-2 mb-1 text-white" style="background-color: #336699; font-size: 11px;">
              {{ stockCode ? stockName + ' チャート' : '日経平均チャート' }}
            </h3>
            <div style="border: 1px solid #ccc; background: #fff; height: 100px; overflow: hidden;">
              <svg width="100%" height="100" viewBox="0 0 210 100" preserveAspectRatio="none">
                <!-- Grid -->
                <line x1="0" y1="25" x2="210" y2="25" stroke="#eee" stroke-width="0.5"/>
                <line x1="0" y1="50" x2="210" y2="50" stroke="#eee" stroke-width="0.5"/>
                <line x1="0" y1="75" x2="210" y2="75" stroke="#eee" stroke-width="0.5"/>
                <line x1="42" y1="0" x2="42" y2="100" stroke="#eee" stroke-width="0.5"/>
                <line x1="84" y1="0" x2="84" y2="100" stroke="#eee" stroke-width="0.5"/>
                <line x1="126" y1="0" x2="126" y2="100" stroke="#eee" stroke-width="0.5"/>
                <line x1="168" y1="0" x2="168" y2="100" stroke="#eee" stroke-width="0.5"/>
                <!-- Chart Line (upward trend) -->
                <polyline
                  points="0,80 10,78 20,75 30,78 40,72 50,68 60,72 70,65 80,68 90,60 100,62 110,55 120,58 130,50 140,52 150,45 160,48 170,40 180,44 190,38 210,35"
                  fill="none"
                  stroke="#cc3300"
                  stroke-width="1.2"
                />
                <polygon
                  points="0,80 10,78 20,75 30,78 40,72 50,68 60,72 70,65 80,68 90,60 100,62 110,55 120,58 130,50 140,52 150,45 160,48 170,40 180,44 190,38 210,35 210,100 0,100"
                  fill="rgba(204,51,0,0.07)"
                />
                <!-- Labels -->
                <text x="2" y="98" font-size="7" fill="#999">1/4</text>
                <text x="42" y="98" font-size="7" fill="#999">2/1</text>
                <text x="84" y="98" font-size="7" fill="#999">3/1</text>
                <text x="126" y="98" font-size="7" fill="#999">4/1</text>
                <text x="168" y="98" font-size="7" fill="#999">4/15</text>
              </svg>
            </div>
            <div class="flex justify-between mt-0.5 text-xs text-gray-500" style="font-size: 10px;">
              <span>3,003</span>
              <span>3,080</span>
              <span>3,105 ▲45</span>
            </div>
          </div>

          <!-- 時系列データ (compact) -->
          <div class="mb-3">
            <h3 class="font-bold py-0.5 px-2 mb-1 text-white" style="background-color: #336699; font-size: 11px;">時系列データ</h3>
            <table class="w-full" style="border-collapse: collapse; font-size: 10px;">
              <thead>
                <tr style="background: #dde4ed;">
                  <th class="px-1 py-0.5 border border-gray-300 text-left">日付</th>
                  <th class="px-1 py-0.5 border border-gray-300 text-right">終値</th>
                  <th class="px-1 py-0.5 border border-gray-300 text-right">前日比</th>
                  <th class="px-1 py-0.5 border border-gray-300 text-right">出来高</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let d of stockHistory; let i = index" [style.background]="i % 2 === 0 ? '#fff' : '#f5f5f5'">
                  <td class="px-1 py-0.5 border border-gray-200">{{ d.dateShort }}</td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right font-bold">{{ d.close | number }}</td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right" [style.color]="d.change >= 0 ? '#cc0000' : '#0066cc'">
                    {{ d.change >= 0 ? '+' : '' }}{{ d.change }}
                  </td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right">{{ d.volumeShort }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 値上がりランキング -->
          <div class="mb-3">
            <h3 class="font-bold py-0.5 px-2 mb-1 text-white" style="background-color: #336699; font-size: 11px;">値上がりランキング</h3>
            <table class="w-full" style="border-collapse: collapse; font-size: 10px;">
              <tbody>
                <tr *ngFor="let r of rankingUp; let i = index" [style.background]="i % 2 === 0 ? '#fff' : '#f5f5f5'">
                  <td class="px-1 py-0.5 border border-gray-200 text-center text-gray-400" style="width: 16px;">{{ i + 1 }}</td>
                  <td class="px-1 py-0.5 border border-gray-200">
                    <a href="#" class="text-blue-700">{{ r.name }}</a>
                  </td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right">{{ r.price | number }}</td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right text-red-600">+{{ r.rate }}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 値下がりランキング -->
          <div class="mb-3">
            <h3 class="font-bold py-0.5 px-2 mb-1 text-white" style="background-color: #336699; font-size: 11px;">値下がりランキング</h3>
            <table class="w-full" style="border-collapse: collapse; font-size: 10px;">
              <tbody>
                <tr *ngFor="let r of rankingDown; let i = index" [style.background]="i % 2 === 0 ? '#fff' : '#f5f5f5'">
                  <td class="px-1 py-0.5 border border-gray-200 text-center text-gray-400" style="width: 16px;">{{ i + 1 }}</td>
                  <td class="px-1 py-0.5 border border-gray-200">
                    <a href="#" class="text-blue-700">{{ r.name }}</a>
                  </td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right">{{ r.price | number }}</td>
                  <td class="px-1 py-0.5 border border-gray-200 text-right text-blue-600">-{{ r.rate }}%</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

      </div>

      <!-- Page Footer -->
      <div class="py-2 text-center text-xs text-white font-bold" style="background-color: #e84020;">
        Copyright &copy; 2024 大阪証券株式会社 All Rights Reserved.
      </div>

    </div>
  `,
})
export class DomesticOrderComponent {
  stockCode = '7203';
  stockName = 'トヨタ自動車';
  stockGroup = '';
  market = 't';
  orderSide = 'buy';
  quantity: number | null = 100;
  priceType = 'limit';
  limitPrice: number | null = 3100;
  tradeType = 'spot';
  expiry = 'today';
  expiryDate = '';
  account = 'tokutei';
  currentPrice = 3105;

  setQuantity(qty: number) {
    this.quantity = qty;
  }

  submitOrder() {
    if (!this.stockCode) {
      alert('銘柄を入力してください。');
      return;
    }
    if (!this.quantity || this.quantity <= 0) {
      alert('株数を入力してください。');
      return;
    }
    const side = this.orderSide === 'buy' ? '買い' : '売り';
    const priceLabel = this.priceType === 'market' ? '成行' : `指値 ${this.limitPrice?.toLocaleString()}円`;
    alert(`注文を受け付けました。\n${this.stockName}(${this.stockCode}) ${side} ${this.quantity?.toLocaleString()}株 ${priceLabel}`);
  }

  stockHistory = [
    { dateShort: '04/15', close: 3105, change: 45, volumeShort: '1,234万' },
    { dateShort: '04/12', close: 3060, change: -15, volumeShort: '987万' },
    { dateShort: '04/11', close: 3075, change: 20, volumeShort: '1,123万' },
    { dateShort: '04/10', close: 3055, change: 10, volumeShort: '1,034万' },
    { dateShort: '04/09', close: 3045, change: -5, volumeShort: '876万' },
    { dateShort: '04/08', close: 3050, change: 15, volumeShort: '923万' },
    { dateShort: '04/05', close: 3035, change: 8, volumeShort: '765万' },
    { dateShort: '04/04', close: 3027, change: -12, volumeShort: '812万' },
    { dateShort: '04/03', close: 3039, change: 22, volumeShort: '945万' },
    { dateShort: '04/02', close: 3017, change: 5, volumeShort: '789万' },
  ];

  holdings = [
    { code: '7203', name: 'トヨタ', qty: 500, price: 3105, pnl: 52500 },
    { code: '6758', name: 'ソニーG', qty: 200, price: 12450, pnl: -34000 },
    { code: '9984', name: 'ソフトバンクG', qty: 100, price: 7890, pnl: 12300 },
    { code: '8306', name: '三菱UFJ', qty: 1000, price: 1456, pnl: 78000 },
    { code: '6861', name: 'キーエンス', qty: 50, price: 65400, pnl: -25000 },
  ];

  rankingUp = [
    { name: 'テスト電機', price: 1234, rate: '15.3' },
    { name: 'サンプル薬品', price: 5678, rate: '12.1' },
    { name: 'モデル食品', price: 890, rate: '9.8' },
    { name: 'デモ運輸', price: 2345, rate: '8.5' },
    { name: 'サンプル銀行', price: 3456, rate: '7.2' },
  ];

  rankingDown = [
    { name: 'テスト商事', price: 4321, rate: '8.7' },
    { name: 'サンプル不動産', price: 7654, rate: '6.5' },
    { name: 'モデル証券', price: 3210, rate: '5.4' },
    { name: 'デモ電力', price: 1098, rate: '4.8' },
    { name: 'サンプル自動車', price: 5432, rate: '3.9' },
  ];
}
