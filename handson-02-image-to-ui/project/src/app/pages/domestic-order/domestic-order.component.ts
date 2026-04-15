import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-domestic-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    :host {
      display: block;
      font-size: 12px;
      font-family: 'Meiryo', 'MS PGothic', 'Noto Sans JP', sans-serif;
      color: #333;
      background: #fff;
    }
    /* フォームラベルセル - 日本金融系サイト特有の青灰色 */
    .form-label {
      background-color: #C0CEDF;
      border-right: 1px solid #9AAABE;
      font-weight: bold;
      white-space: nowrap;
      width: 88px;
      padding: 5px 6px;
      font-size: 11px;
      vertical-align: middle;
    }
    .form-cell {
      padding: 4px 6px;
      font-size: 11px;
      vertical-align: middle;
    }
    .form-row {
      border-bottom: 1px solid #9AAABE;
    }
    .form-table {
      border-collapse: collapse;
      width: 100%;
      border: 1px solid #9AAABE;
    }
    /* ===== モバイル: フォームを縦積みレイアウトに ===== */
    @media (max-width: 1023px) {
      .form-table,
      .form-table tbody,
      .form-table tr,
      .form-table td {
        display: block;
        width: 100%;
        box-sizing: border-box;
      }
      .form-label {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #9AAABE;
        padding: 4px 8px;
        white-space: normal;
      }
      .form-cell {
        padding: 6px 8px;
        background: #fff;
      }
      .form-row {
        border-bottom: 2px solid #9AAABE;
        margin-bottom: 0;
      }
    }
    /* サイドバー */
    .sidebar-section-header {
      background-color: #3366CC;
      color: white;
      font-weight: bold;
      font-size: 11px;
      padding: 2px 6px;
      margin-bottom: 2px;
    }
    .sidebar-table {
      border-collapse: collapse;
      width: 100%;
      font-size: 10px;
    }
    .sidebar-table th {
      background-color: #C0CEDF;
      border: 1px solid #9AAABE;
      padding: 2px 4px;
      text-align: left;
    }
    .sidebar-table td {
      border: 1px solid #C8C8C8;
      padding: 2px 4px;
    }
    .sidebar-table tr:nth-child(even) td {
      background-color: #F0F4F8;
    }
    /* セクションヘッダー（ご注意事項等） */
    .section-header {
      background-color: #3366CC;
      color: white;
      font-weight: bold;
      font-size: 11px;
      padding: 2px 6px;
      margin-bottom: 4px;
    }
    /* ランキングテーブル */
    .ranking-table {
      border-collapse: collapse;
      width: 100%;
      font-size: 10px;
    }
    .ranking-table td {
      border: 1px solid #C8C8C8;
      padding: 2px 4px;
    }
    .ranking-table tr:nth-child(even) td {
      background-color: #F5F5F5;
    }
    @media (min-width: 1024px) {
      .sidebar-area {
        width: 295px;
        flex-shrink: 0;
        border-top: none !important;
        border-left: 1px solid #9AAABE;
      }
    }
  `],
  template: `
    <div class="min-h-screen">

      <!-- ===== HEADER ===== -->
      <header>
        <!-- トップバー -->
        <div class="flex items-center justify-between px-2" style="background-color: #DD3020; color: white; font-size: 11px; padding-top: 3px; padding-bottom: 3px;">
          <div class="flex items-center gap-1">
            <span style="font-size: 16px; font-weight: bold; letter-spacing: 1px;">大阪証券</span>
            <span style="margin-left: 8px; font-size: 10px;">ログアウト</span>
            <span style="margin: 0 4px; color: #ffbbbb;">|</span>
            <span style="font-size: 10px;">口座番号: 1234567890</span>
          </div>
          <div class="flex items-center gap-1" style="font-size: 10px;">
            <span>お客様の氏名: 山田 太郎 様</span>
            <span style="margin: 0 4px; color: #ffbbbb;">|</span>
            <span>2024/04/15 10:30</span>
            <span style="margin: 0 4px; color: #ffbbbb;">|</span>
            <a href="#" style="color: #ffe0e0; text-decoration: underline;">ヘルプ</a>
            <span style="margin: 0 4px; color: #ffbbbb;">|</span>
            <a href="#" style="color: #ffe0e0; text-decoration: underline;">お問い合わせ</a>
          </div>
        </div>

        <!-- メインナビゲーション -->
        <div style="background-color: #BB2010; padding: 0; display: flex; align-items: stretch;">
          <a href="#" style="color: white; font-size: 11px; padding: 4px 8px; text-decoration: none;">トップ</a>
          <span style="color: #dd6050; align-self: center;">|</span>
          <a href="#" style="color: #BB2010; background: white; font-size: 11px; padding: 4px 10px; font-weight: bold; text-decoration: none; border-top: 2px solid #888;">国内株式</a>
          <span style="color: #dd6050; align-self: center;">|</span>
          <a href="#" style="color: white; font-size: 11px; padding: 4px 8px; text-decoration: none;">外国株式</a>
          <span style="color: #dd6050; align-self: center;">|</span>
          <a href="#" style="color: white; font-size: 11px; padding: 4px 8px; text-decoration: none;">投資信託</a>
          <span style="color: #dd6050; align-self: center;">|</span>
          <a href="#" style="color: white; font-size: 11px; padding: 4px 8px; text-decoration: none;">債券</a>
          <span style="color: #dd6050; align-self: center;">|</span>
          <a href="#" style="color: white; font-size: 11px; padding: 4px 8px; text-decoration: none;">FX</a>
          <span style="color: #dd6050; align-self: center;">|</span>
          <a href="#" style="color: white; font-size: 11px; padding: 4px 8px; text-decoration: none;">口座管理</a>
          <span style="color: #dd6050; align-self: center;">|</span>
          <a href="#" style="color: white; font-size: 11px; padding: 4px 8px; text-decoration: none;">資産確認</a>
          <span style="color: #dd6050; align-self: center;">|</span>
          <a href="#" style="color: white; font-size: 11px; padding: 4px 8px; text-decoration: none;">マーケット</a>
        </div>

        <!-- サブナビゲーション（国内株式内のリンク群） -->
        <div style="background-color: #666; padding: 3px 8px; display: flex; flex-wrap: wrap; gap: 0; align-items: center;">
          <a href="#" style="color: #EEE; font-size: 11px; text-decoration: none; padding: 1px 4px;">注文・訂正・取消</a>
          <span style="color: #999; margin: 0 2px; font-size: 10px;">›</span>
          <a href="#" style="color: #EEE; font-size: 11px; text-decoration: none; padding: 1px 4px;">注文照会</a>
          <span style="color: #999; margin: 0 2px; font-size: 10px;">›</span>
          <a href="#" style="color: #EEE; font-size: 11px; text-decoration: none; padding: 1px 4px;">約定照会</a>
          <span style="color: #999; margin: 0 2px; font-size: 10px;">›</span>
          <a href="#" style="color: #EEE; font-size: 11px; text-decoration: none; padding: 1px 4px;">保有株式一覧</a>
          <span style="color: #999; margin: 0 2px; font-size: 10px;">›</span>
          <a href="#" style="color: #EEE; font-size: 11px; text-decoration: none; padding: 1px 4px;">株式相場</a>
          <span style="color: #999; margin: 0 2px; font-size: 10px;">›</span>
          <a href="#" style="color: #EEE; font-size: 11px; text-decoration: none; padding: 1px 4px;">ランキング</a>
          <span style="color: #999; margin: 0 2px; font-size: 10px;">›</span>
          <a href="#" style="color: #EEE; font-size: 11px; text-decoration: none; padding: 1px 4px;">銘柄検索</a>
        </div>

        <!-- パンくずリスト＋遅延表示 -->
        <div style="background-color: #EEEEEE; border-bottom: 1px solid #BBBBBB; padding: 3px 8px; display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 11px; color: #555;">
            <a href="#" style="color: #0033CC; text-decoration: none;">ホーム</a>
            <span style="margin: 0 3px; color: #888;">›</span>
            <a href="#" style="color: #0033CC; text-decoration: none;">国内株式</a>
            <span style="margin: 0 3px; color: #888;">›</span>
            <span>注文入力</span>
          </div>
          <div style="font-size: 10px; color: #888;">現在値は15分遅延表示です</div>
        </div>
      </header>

      <!-- ===== MAIN 2カラムレイアウト ===== -->
      <div class="flex flex-col lg:flex-row" style="min-height: 700px; align-items: flex-start;">

        <!-- ===== 左カラム: 注文フォーム ===== -->
        <div class="flex-1" style="min-width: 0; padding: 6px 8px 20px; border-right: 1px solid #AAAAAA;">

          <!-- ページタイトル -->
          <div style="font-size: 13px; font-weight: bold; color: #CC3300; border-left: 4px solid #DD3020; padding-left: 6px; margin-bottom: 6px;">
            【注文入力】
          </div>

          <!-- 注文フォームテーブル -->
          <table class="form-table">
            <tbody>

              <!-- 銘柄グループ -->
              <tr class="form-row">
                <td class="form-label">銘柄グループ</td>
                <td class="form-cell">
                  <select style="font-size: 11px; padding: 1px 3px; border: 1px solid #888; width: 190px;" [(ngModel)]="stockGroup">
                    <option value="">-- 選択してください --</option>
                    <option value="1">保有株式から選択</option>
                    <option value="2">お気に入りから選択</option>
                  </select>
                  <span style="font-size: 10px; color: #888; margin-left: 6px;">※銘柄グループから選択できます</span>
                </td>
              </tr>

              <!-- 銘柄 -->
              <tr class="form-row">
                <td class="form-label" style="vertical-align: top; padding-top: 5px;">銘柄</td>
                <td class="form-cell">
                  <div style="display: flex; align-items: center; gap: 4px; flex-wrap: wrap;">
                    <input type="text" [(ngModel)]="stockCode" placeholder="コード" style="font-size: 11px; padding: 1px 3px; border: 1px solid #888; width: 55px;" />
                    <select style="font-size: 11px; padding: 1px 3px; border: 1px solid #888;" [(ngModel)]="market">
                      <option value="t">東証プライム</option>
                      <option value="ts">東証スタンダード</option>
                      <option value="tg">東証グロース</option>
                      <option value="o">大証</option>
                      <option value="n">名証</option>
                    </select>
                    <button style="font-size: 11px; background-color: #336699; color: white; padding: 1px 8px; border: 1px solid #224477; cursor: pointer;">銘柄検索</button>
                  </div>
                  <div *ngIf="stockCode" style="margin-top: 3px; font-size: 11px;">
                    <span style="font-weight: bold; color: #0033CC;">{{ stockName }}</span>
                    <span style="margin-left: 6px;">現在値:</span>
                    <span style="font-weight: bold; color: #CC0000; margin-left: 3px;">{{ currentPrice | number }}</span>
                    <span>円</span>
                    <span style="color: #CC0000; margin-left: 10px;">前日比: +45円 (+1.45%)</span>
                  </div>
                  <div *ngIf="stockCode" style="margin-top: 2px; font-size: 10px; color: #666;">
                    出来高: 12,345,678株　高値: 3,150円　安値: 3,080円
                  </div>
                </td>
              </tr>

              <!-- 売買区分 -->
              <tr class="form-row">
                <td class="form-label">売買区分</td>
                <td class="form-cell">
                  <label style="margin-right: 16px; cursor: pointer; display: inline-flex; align-items: center; gap: 3px;">
                    <input type="radio" name="orderSide" value="buy" [(ngModel)]="orderSide" />
                    <span style="font-weight: bold; color: #CC0000;">買い注文</span>
                  </label>
                  <label style="cursor: pointer; display: inline-flex; align-items: center; gap: 3px;">
                    <input type="radio" name="orderSide" value="sell" [(ngModel)]="orderSide" />
                    <span style="font-weight: bold; color: #0055AA;">売り注文</span>
                  </label>
                </td>
              </tr>

              <!-- 株数 -->
              <tr class="form-row">
                <td class="form-label">株数</td>
                <td class="form-cell">
                  <input type="number" [(ngModel)]="quantity" style="font-size: 11px; padding: 1px 3px; border: 1px solid #888; width: 65px; text-align: right;" />
                  <span style="margin-left: 3px; font-size: 11px;">株</span>
                  <span style="font-size: 10px; color: #666; margin-left: 6px;">（1単元: 100株）</span>
                  <span style="margin-left: 8px;">
                    <button *ngFor="let n of quickQty" (click)="setQuantity(n)"
                      style="font-size: 10px; margin-right: 2px; padding: 1px 5px; border: 1px solid #888; background: #F5F5F5; cursor: pointer;">{{n}}</button>
                  </span>
                </td>
              </tr>

              <!-- 注文区分 -->
              <tr class="form-row">
                <td class="form-label">注文区分</td>
                <td class="form-cell">
                  <label *ngFor="let pt of priceTypes" style="margin-right: 12px; cursor: pointer; display: inline-flex; align-items: center; gap: 3px; font-size: 11px;">
                    <input type="radio" name="priceType" [value]="pt.value" [(ngModel)]="priceType" />
                    <span>{{ pt.label }}</span>
                  </label>
                </td>
              </tr>

              <!-- 指値価格（成行以外） -->
              <tr class="form-row" *ngIf="priceType !== 'market'">
                <td class="form-label">{{ priceType === 'stop_limit' ? '逆指値' : '指値価格' }}</td>
                <td class="form-cell">
                  <input type="number" [(ngModel)]="limitPrice" style="font-size: 11px; padding: 1px 3px; border: 1px solid #888; width: 65px; text-align: right;" />
                  <span style="margin-left: 3px; font-size: 11px;">円</span>
                  <span *ngIf="currentPrice" style="font-size: 10px; color: #666; margin-left: 8px;">
                    （現在値: <span style="font-weight: bold;">{{ currentPrice | number }}</span>円）
                  </span>
                </td>
              </tr>

              <!-- 取引区分 -->
              <tr class="form-row">
                <td class="form-label">取引区分</td>
                <td class="form-cell">
                  <label *ngFor="let tt of tradeTypes" style="margin-right: 12px; cursor: pointer; display: inline-flex; align-items: center; gap: 3px; font-size: 11px;">
                    <input type="radio" name="tradeType" [value]="tt.value" [(ngModel)]="tradeType" />
                    <span>{{ tt.label }}</span>
                  </label>
                </td>
              </tr>

              <!-- 有効期限 -->
              <tr class="form-row">
                <td class="form-label">有効期限</td>
                <td class="form-cell">
                  <label *ngFor="let ex of expiryTypes" style="margin-right: 12px; cursor: pointer; display: inline-flex; align-items: center; gap: 3px; font-size: 11px;">
                    <input type="radio" name="expiry" [value]="ex.value" [(ngModel)]="expiry" />
                    <span>{{ ex.label }}</span>
                  </label>
                  <span *ngIf="expiry === 'specify'" style="display: inline-flex; align-items: center; gap: 4px;">
                    <input type="date" [(ngModel)]="expiryDate" style="font-size: 10px; border: 1px solid #888; padding: 1px 3px;" />
                    <span style="font-size: 11px;">まで</span>
                  </span>
                </td>
              </tr>

              <!-- 口座区分 -->
              <tr class="form-row">
                <td class="form-label">口座区分</td>
                <td class="form-cell">
                  <label *ngFor="let ac of accountTypes" style="margin-right: 12px; cursor: pointer; display: inline-flex; align-items: center; gap: 3px; font-size: 11px;">
                    <input type="radio" name="account" [value]="ac.value" [(ngModel)]="account" />
                    <span>{{ ac.label }}</span>
                  </label>
                </td>
              </tr>

              <!-- 発注数量合計 -->
              <tr>
                <td class="form-label" style="border-bottom: none;">発注数量合計</td>
                <td class="form-cell" style="border-bottom: none;">
                  <span style="font-weight: bold;">{{ (quantity || 0) | number }}株</span>
                  <span *ngIf="quantity && priceType !== 'market' && limitPrice" style="font-size: 11px; color: #333; margin-left: 10px;">
                    概算金額: <span style="font-weight: bold; color: #CC0000;">{{ (quantity * limitPrice) | number }}円</span>
                    <span style="font-size: 10px; color: #888; margin-left: 4px;">（手数料別）</span>
                  </span>
                  <span *ngIf="quantity && priceType === 'market' && currentPrice" style="font-size: 11px; color: #333; margin-left: 10px;">
                    概算金額: <span style="font-weight: bold; color: #CC0000;">{{ (quantity * currentPrice) | number }}円</span>
                    <span style="font-size: 10px; color: #888; margin-left: 4px;">（概算・手数料別）</span>
                  </span>
                </td>
              </tr>

            </tbody>
          </table>

          <!-- 注意ボックス -->
          <div style="margin-top: 8px; padding: 8px 10px; background-color: #FFFBE6; border: 1px solid #DDAA00; border-left: 4px solid #E08000; font-size: 11px;">
            <div style="font-weight: bold; color: #884400; margin-bottom: 4px;">⚠ ご注意</div>
            <div style="color: #444; line-height: 1.6;">
              ・注文内容をご確認のうえ、「{{ orderSide === 'buy' ? '買い注文を発注する' : '売り注文を発注する' }}」ボタンを押してください。<br>
              ・成行注文は市場の状況によっては予期しない価格で約定する場合があります。<br>
              ・注文確定後の取消・訂正はできない場合があります。
            </div>
          </div>

          <!-- 発注ボタンエリア -->
          <div style="margin-top: 6px; padding: 10px; text-align: center; background-color: #F8F8F8; border: 1px solid #CCCCCC;">
            <button
              (click)="submitOrder()"
              [style.background-color]="orderSide === 'buy' ? '#DD3020' : '#0055AA'"
              style="color: white; font-weight: bold; font-size: 13px; padding: 8px 40px; border: none; cursor: pointer; min-width: 200px;">
              {{ orderSide === 'buy' ? '買い注文を発注する' : '売り注文を発注する' }}
            </button>
          </div>

          <!-- 関連リンク -->
          <div style="margin-top: 6px; font-size: 11px; text-align: center; color: #333;">
            <a href="#" style="color: #0033CC; text-decoration: underline; margin-right: 10px;">国内株式注文</a>
            <a href="#" style="color: #0033CC; text-decoration: underline; margin-right: 10px;">現物取引</a>
            <a href="#" style="color: #0033CC; text-decoration: underline; margin-right: 10px;">外国株式注文</a>
            <a href="#" style="color: #0033CC; text-decoration: underline; margin-right: 10px;">投資信託注文</a>
            <a href="#" style="color: #0033CC; text-decoration: underline; margin-right: 10px;">FX取引</a>
            <a href="#" style="color: #0033CC; text-decoration: underline;">公社債注文</a>
          </div>

          <!-- ご注意事項（長文） -->
          <div style="margin-top: 12px;">
            <div class="section-header">ご注意事項</div>
            <div style="font-size: 11px; color: #333; line-height: 1.7; padding: 4px 2px;">
              <p style="margin-bottom: 6px;">
                当社は、お客様が株式等の取引に関して、以下の点についてご了解の上でご注文いただくことを前提として取引の執行を行います。
              </p>
              <p style="margin-bottom: 6px;">
                <span style="font-weight: bold; color: #CC0000;">【リスクについて】</span><br>
                株式等の価格は、需要と供給の関係等の要因により変動します。このため、市場価格が予期せぬ方向に動くことがあります。成行注文を行った場合、最終的な約定価格は、注文時の現在値より大幅に乖離することがあります。また、指値注文の場合でも、相場状況によっては注文が全部または一部約定されないことがあります。
              </p>
              <p style="margin-bottom: 6px;">
                <span style="font-weight: bold; color: #CC0000;">【信用取引について】</span><br>
                信用取引は、委託保証金を担保として、委託保証金の約3.3倍程度の取引が行えます。株価の変動により、投資額以上の損失を生じる場合があります。追証が発生した場合は、追加の保証金を差し入れていただく必要があります。
              </p>
              <p style="margin-bottom: 6px;">
                お客様の投資判断に基づいてご注文ください。当社は、お客様の取引から生じた損失に対して責任を負いません。
              </p>
              <p style="margin-bottom: 6px;">
                取引手数料については、別途「手数料一覧」をご確認ください。手数料は取引代金により異なります。
              </p>
              <p style="margin-bottom: 6px;">
                注文確定後は、原則として取消・訂正はできません。ただし、未約定の注文については、取引時間内であれば訂正・取消が可能な場合があります。
              </p>
              <p style="margin-bottom: 6px;">
                当社の取引システムは、取引所の取引システムとは独立して動作しています。当社のシステム障害が発生した場合でも、取引所への注文が執行されている場合があります。
              </p>
              <p style="margin-bottom: 6px;">
                お客様が投資判断を行う際には、有価証券報告書、目論見書等の書類をご確認の上、十分にご理解いただくことをお勧めします。
              </p>
            </div>
          </div>

          <!-- フッターリンク -->
          <div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid #CCCCCC; font-size: 11px; text-align: center; color: #555;">
            オンライントレードについてご不明な点はこちら ｜
            <a href="#" style="color: #0033CC; text-decoration: underline;">よくあるご質問</a> ｜
            <a href="#" style="color: #0033CC; text-decoration: underline;">操作方法</a> ｜
            <a href="#" style="color: #0033CC; text-decoration: underline;">お問い合わせ</a>
          </div>

          <!-- 注意事項ボックス -->
          <div style="margin-top: 8px; padding: 8px 10px; background-color: #F8F8F8; border: 1px solid #CCCCCC; font-size: 11px;">
            <div style="font-weight: bold; margin-bottom: 4px;">ご注意事項</div>
            <div style="color: #555; line-height: 1.6;">
              当社の株式売買手数料は、1日の約定代金合計額に応じた一律手数料制です。詳細は
              <a href="#" style="color: #0033CC; text-decoration: underline;">手数料一覧</a>
              をご覧ください。<br>
              株式等の売買は、株価の変動等により損失が生じるおそれがあります。上場有価証券等書面および目論見書等の内容を十分にご理解のうえ、ご自身の判断と責任においてご投資ください。<br>
              ご不明な点は
              <a href="#" style="color: #0033CC; text-decoration: underline;">カスタマーサポート</a>
              までお問い合わせください。
            </div>
          </div>

        </div>

        <!-- ===== 右サイドバー: マーケット情報 ===== -->
        <div class="sidebar-area" style="padding: 6px 6px 20px; font-size: 11px; background: #fff;">

          <!-- 概況 -->
          <div style="margin-bottom: 8px;">
            <div class="sidebar-section-header">概況</div>
            <table class="sidebar-table">
              <thead>
                <tr>
                  <th>指標</th>
                  <th style="text-align: right;">現在値</th>
                  <th style="text-align: right;">前日比</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let m of marketSummary; let i = index">
                  <td>{{ m.name }}</td>
                  <td style="text-align: right; font-weight: bold;">{{ m.value }}</td>
                  <td style="text-align: right;" [style.color]="m.up ? '#CC0000' : '#0055AA'">
                    {{ m.up ? '▲' : '▼' }}{{ m.change }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div style="text-align: right; font-size: 9px; color: #888; margin-top: 2px;">15分遅延 04/15 10:30</div>
          </div>

          <!-- 保有株式 -->
          <div style="margin-bottom: 8px;">
            <div class="sidebar-section-header">保有株式</div>
            <table class="sidebar-table">
              <thead>
                <tr>
                  <th>銘柄</th>
                  <th style="text-align: right;">株数</th>
                  <th style="text-align: right;">現在値</th>
                  <th style="text-align: right;">評価損益</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let s of holdings">
                  <td>
                    <a href="#" style="color: #0033CC; text-decoration: none;">{{ s.code }}</a>
                  </td>
                  <td style="text-align: right;">{{ s.qty | number }}</td>
                  <td style="text-align: right;">{{ s.price | number }}</td>
                  <td style="text-align: right;" [style.color]="s.pnl >= 0 ? '#CC0000' : '#0055AA'">
                    {{ s.pnl >= 0 ? '+' : '' }}{{ s.pnl | number }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- チャート -->
          <div style="margin-bottom: 8px;">
            <div class="sidebar-section-header">{{ stockCode ? stockName + ' チャート' : '日経平均チャート' }}</div>
            <div style="border: 1px solid #CCCCCC; background: #fff; height: 90px; overflow: hidden;">
              <svg width="100%" height="90" viewBox="0 0 285 90" preserveAspectRatio="none">
                <!-- 水平グリッド -->
                <line x1="0" y1="22" x2="285" y2="22" stroke="#EEEEEE" stroke-width="0.5"/>
                <line x1="0" y1="45" x2="285" y2="45" stroke="#EEEEEE" stroke-width="0.5"/>
                <line x1="0" y1="68" x2="285" y2="68" stroke="#EEEEEE" stroke-width="0.5"/>
                <!-- 垂直グリッド -->
                <line x1="57" y1="0" x2="57" y2="90" stroke="#EEEEEE" stroke-width="0.5"/>
                <line x1="114" y1="0" x2="114" y2="90" stroke="#EEEEEE" stroke-width="0.5"/>
                <line x1="171" y1="0" x2="171" y2="90" stroke="#EEEEEE" stroke-width="0.5"/>
                <line x1="228" y1="0" x2="228" y2="90" stroke="#EEEEEE" stroke-width="0.5"/>
                <!-- チャートライン（右上がり） -->
                <polyline
                  points="0,75 15,72 30,70 45,74 60,67 75,63 90,68 105,60 120,63 135,55 150,58 165,50 180,53 195,46 210,49 225,42 240,46 255,38 270,42 285,36"
                  fill="none"
                  stroke="#CC3300"
                  stroke-width="1.2"
                />
                <polygon
                  points="0,75 15,72 30,70 45,74 60,67 75,63 90,68 105,60 120,63 135,55 150,58 165,50 180,53 195,46 210,49 225,42 240,46 255,38 270,42 285,36 285,90 0,90"
                  fill="rgba(204,51,0,0.06)"
                />
                <!-- X軸ラベル -->
                <text x="2" y="88" font-size="7" fill="#999">1/4</text>
                <text x="57" y="88" font-size="7" fill="#999">2/1</text>
                <text x="114" y="88" font-size="7" fill="#999">3/1</text>
                <text x="171" y="88" font-size="7" fill="#999">4/1</text>
                <text x="238" y="88" font-size="7" fill="#999">4/15</text>
              </svg>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 9px; color: #666; margin-top: 2px; padding: 0 2px;">
              <span>3,003</span>
              <span>3,080</span>
              <span style="color: #CC0000; font-weight: bold;">3,105 ▲45</span>
            </div>
          </div>

          <!-- 時系列データ -->
          <div style="margin-bottom: 8px;">
            <div class="sidebar-section-header">時系列データ</div>
            <table class="sidebar-table">
              <thead>
                <tr>
                  <th>日付</th>
                  <th style="text-align: right;">終値</th>
                  <th style="text-align: right;">前日比</th>
                  <th style="text-align: right;">出来高</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let d of stockHistory">
                  <td>{{ d.dateShort }}</td>
                  <td style="text-align: right; font-weight: bold;">{{ d.close | number }}</td>
                  <td style="text-align: right;" [style.color]="d.change >= 0 ? '#CC0000' : '#0055AA'">
                    {{ d.change >= 0 ? '+' : '' }}{{ d.change }}
                  </td>
                  <td style="text-align: right;">{{ d.volumeShort }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 値上がりランキング -->
          <div style="margin-bottom: 8px;">
            <div class="sidebar-section-header">値上がりランキング</div>
            <table class="ranking-table">
              <tbody>
                <tr *ngFor="let r of rankingUp; let i = index">
                  <td style="text-align: center; width: 18px; color: #888;">{{ i + 1 }}</td>
                  <td><a href="#" style="color: #0033CC; text-decoration: none;">{{ r.name }}</a></td>
                  <td style="text-align: right;">{{ r.price | number }}</td>
                  <td style="text-align: right; color: #CC0000;">+{{ r.rate }}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 値下がりランキング -->
          <div style="margin-bottom: 8px;">
            <div class="sidebar-section-header">値下がりランキング</div>
            <table class="ranking-table">
              <tbody>
                <tr *ngFor="let r of rankingDown; let i = index">
                  <td style="text-align: center; width: 18px; color: #888;">{{ i + 1 }}</td>
                  <td><a href="#" style="color: #0033CC; text-decoration: none;">{{ r.name }}</a></td>
                  <td style="text-align: right;">{{ r.price | number }}</td>
                  <td style="text-align: right; color: #0055AA;">-{{ r.rate }}%</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

      </div>

      <!-- ===== フッター ===== -->
      <div style="background-color: #DD3020; color: white; text-align: center; font-size: 11px; padding: 6px; font-weight: bold;">
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

  quickQty = [100, 200, 300, 500, 1000];

  priceTypes = [
    { value: 'market', label: '成行' },
    { value: 'limit', label: '指値' },
    { value: 'stop_limit', label: '逆指値' },
    { value: 'funari', label: '不成' },
    { value: 'yoritsuki', label: '寄指' },
    { value: 'hike', label: '引指' },
  ];

  tradeTypes = [
    { value: 'spot', label: '現物取引' },
    { value: 'margin_new', label: '信用新規' },
    { value: 'margin_close', label: '信用返済' },
  ];

  expiryTypes = [
    { value: 'today', label: '当日中' },
    { value: 'week', label: '今週中' },
    { value: 'specify', label: '期間指定' },
  ];

  accountTypes = [
    { value: 'tokutei', label: '特定口座' },
    { value: 'ippan', label: '一般口座' },
    { value: 'nisa', label: 'NISA口座' },
  ];

  setQuantity(qty: number) {
    this.quantity = qty;
  }

  submitOrder() {
    if (!this.stockCode) { alert('銘柄を入力してください。'); return; }
    if (!this.quantity || this.quantity <= 0) { alert('株数を入力してください。'); return; }
    const side = this.orderSide === 'buy' ? '買い' : '売り';
    const priceLabel = this.priceType === 'market' ? '成行' : `指値 ${this.limitPrice?.toLocaleString()}円`;
    alert(`注文を受け付けました。\n${this.stockName}(${this.stockCode}) ${side} ${this.quantity?.toLocaleString()}株 ${priceLabel}`);
  }

  marketSummary = [
    { name: '日経平均', value: '38,157', change: '245', up: true },
    { name: 'TOPIX', value: '2,684', change: '18', up: true },
    { name: 'グロース250', value: '654', change: '3', up: false },
    { name: 'ドル円', value: '151.82', change: '0.34', up: true },
    { name: 'NYダウ', value: '38,503', change: '125', up: true },
  ];

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
