import { Component } from '@angular/core';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  template: `
    <div class="flex h-screen bg-gray-50">
      <!-- Sidebar -->
      <aside class="w-[250px] bg-white border-r border-gray-200 flex flex-col justify-between shrink-0">
        <div>
          <!-- Logo -->
          <div class="flex items-center gap-3 px-5 py-5">
            <div class="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">F</span>
            </div>
            <div>
              <div class="text-base font-bold text-navy-900 leading-tight">FinScope</div>
              <div class="text-xs text-gray-400 leading-tight">Financial Dashboard</div>
            </div>
          </div>

          <!-- Nav Items -->
          <nav class="mt-4 px-3 space-y-1">
            <!-- ダッシュボード -->
            <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer text-gray-500 hover:bg-gray-50">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
              <span>ダッシュボード</span>
            </a>
            <!-- ポートフォリオ -->
            <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer text-gray-500 hover:bg-gray-50">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
              <span>ポートフォリオ</span>
            </a>
            <!-- 取引 -->
            <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer text-gray-500 hover:bg-gray-50">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>
              <span>取引</span>
            </a>
            <!-- リスク分析 -->
            <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer text-gray-500 hover:bg-gray-50">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>
              <span>リスク分析</span>
            </a>
            <!-- 顧客管理 (active) -->
            <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer bg-accent/10 text-accent font-medium relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[3px] before:h-6 before:bg-accent before:rounded-r">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
              <span>顧客管理</span>
            </a>
            <!-- コンプライアンス -->
            <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-pointer text-gray-500 hover:bg-gray-50">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
              <span>コンプライアンス</span>
            </a>
          </nav>
        </div>

        <!-- Settings -->
        <div class="px-3 pb-5">
          <a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 cursor-pointer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <span>設定</span>
          </a>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Header -->
        <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <div class="flex items-center gap-3">
            <button class="text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <h1 class="text-xl font-bold text-navy-900">顧客詳細</h1>
          </div>
          <div class="flex items-center gap-3">
            <button class="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">編集</button>
            <button class="px-5 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-dark">新規取引</button>
            <div class="w-9 h-9 bg-navy-800 rounded-full flex items-center justify-center ml-1">
              <span class="text-white text-xs font-medium">TK</span>
            </div>
          </div>
        </header>

        <!-- Content Area -->
        <main class="flex-1 overflow-y-auto p-6">
          <!-- Profile Card -->
          <div class="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div class="flex items-start justify-between">
              <div class="flex items-start gap-5">
                <!-- Avatar -->
                <div class="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center shrink-0">
                  <span class="text-white text-xl font-semibold">ST</span>
                </div>
                <!-- Info -->
                <div>
                  <div class="flex items-center gap-3 mb-3">
                    <h2 class="text-2xl font-bold text-navy-900">佐藤 太郎</h2>
                    <span class="px-3 py-0.5 bg-green-50 text-green-600 border border-green-200 rounded-full text-xs font-medium">アクティブ</span>
                    <span class="px-3 py-0.5 bg-purple-50 text-purple-600 border border-purple-200 rounded-full text-xs font-medium">プレミアム</span>
                  </div>
                  <div class="flex items-start gap-10">
                    <div>
                      <div class="text-xs text-gray-400 mb-0.5">口座番号</div>
                      <div class="text-sm font-medium text-navy-900">FS–2024–00142</div>
                    </div>
                    <div>
                      <div class="text-xs text-gray-400 mb-0.5">口座開設日</div>
                      <div class="text-sm font-medium text-navy-900">2024年4月15日</div>
                    </div>
                    <div>
                      <div class="text-xs text-gray-400 mb-0.5">担当者</div>
                      <div class="text-sm font-medium text-navy-900">田中 健一</div>
                    </div>
                    <div>
                      <div class="text-xs text-gray-400 mb-0.5">リスク許容度</div>
                      <div class="flex items-center gap-2 mt-1">
                        <div class="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div class="h-full bg-gradient-to-r from-green-400 to-yellow-400 rounded-full" style="width: 65%"></div>
                        </div>
                        <span class="text-xs text-gray-500">中〜高</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Total Assets -->
              <div class="text-right">
                <div class="text-xs text-gray-400 mb-1">総資産</div>
                <div class="text-3xl font-bold text-navy-900">¥485,200,000</div>
                <div class="text-sm text-green-500 font-medium">+¥12.8M (前月比)</div>
              </div>
            </div>
          </div>

          <!-- Tabs -->
          <div class="border-b border-gray-200 mb-6">
            <div class="flex gap-8">
              <button class="pb-3 text-sm font-medium border-b-2 text-accent border-accent">基本情報</button>
              <button class="pb-3 text-sm font-medium border-b-2 text-gray-400 border-transparent hover:text-gray-600">保有資産</button>
              <button class="pb-3 text-sm font-medium border-b-2 text-gray-400 border-transparent hover:text-gray-600">取引履歴</button>
              <button class="pb-3 text-sm font-medium border-b-2 text-gray-400 border-transparent hover:text-gray-600">コンプライアンス</button>
            </div>
          </div>

          <!-- Content Grid -->
          <div class="grid grid-cols-2 gap-8">
            <!-- Left Column -->
            <div>
              <!-- 個人情報 -->
              <h3 class="text-base font-bold text-navy-900 mb-4">個人情報</h3>
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label class="text-xs text-gray-400 mb-1.5 block">氏名（漢字）</label>
                  <div class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy-900">佐藤 太郎</div>
                </div>
                <div>
                  <label class="text-xs text-gray-400 mb-1.5 block">氏名（カナ）</label>
                  <div class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy-900">サトウ タロウ</div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label class="text-xs text-gray-400 mb-1.5 block">生年月日</label>
                  <div class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy-900">1975年8月22日（50歳）</div>
                </div>
                <div>
                  <label class="text-xs text-gray-400 mb-1.5 block">性別</label>
                  <div class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy-900">男性</div>
                </div>
              </div>

              <!-- 連絡先 -->
              <h3 class="text-base font-bold text-navy-900 mb-4">連絡先</h3>
              <div class="mb-4">
                <label class="text-xs text-gray-400 mb-1.5 block">住所</label>
                <div class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy-900">〒100-0005 東京都千代田区丸の内1-2-3 パレスビル1501</div>
              </div>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="text-xs text-gray-400 mb-1.5 block">電話番号</label>
                  <div class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy-900">03-1234-5678</div>
                </div>
                <div>
                  <label class="text-xs text-gray-400 mb-1.5 block">携帯電話</label>
                  <div class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy-900">090-1234-5678</div>
                </div>
              </div>
              <div class="mb-4">
                <label class="text-xs text-gray-400 mb-1.5 block">メールアドレス</label>
                <div class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy-900">t.sato&#64;example.co.jp</div>
              </div>
            </div>

            <!-- Right Column -->
            <div>
              <!-- KYC情報 -->
              <h3 class="text-base font-bold text-navy-900 mb-4">KYC情報</h3>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="text-xs text-gray-400 mb-1.5 block">職業</label>
                  <div class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy-900">会社役員</div>
                </div>
                <div>
                  <label class="text-xs text-gray-400 mb-1.5 block">勤務先</label>
                  <div class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy-900">株式会社テクノフューチャー</div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="text-xs text-gray-400 mb-1.5 block">年収</label>
                  <div class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy-900">3,000万円以上</div>
                </div>
                <div>
                  <label class="text-xs text-gray-400 mb-1.5 block">金融資産</label>
                  <div class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy-900">5億円以上</div>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <label class="text-xs text-gray-400 mb-1.5 block">投資経験</label>
                  <div class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy-900">20年以上</div>
                </div>
                <div>
                  <label class="text-xs text-gray-400 mb-1.5 block">投資目的</label>
                  <div class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-navy-900">資産形成・利殖</div>
                </div>
              </div>

              <!-- 本人確認書類 -->
              <h3 class="text-base font-bold text-navy-900 mb-4">本人確認書類</h3>
              <div class="border-t border-gray-200">
                <div class="flex items-center justify-between py-4 border-b border-gray-100">
                  <div class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span class="text-sm text-navy-900">運転免許証</span>
                  </div>
                  <span class="text-sm text-green-500 font-medium">確認済 (2024/04/15)</span>
                </div>
                <div class="flex items-center justify-between py-4">
                  <div class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span class="text-sm text-navy-900">マイナンバーカード</span>
                  </div>
                  <span class="text-sm text-green-500 font-medium">確認済 (2024/04/15)</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
})
export class ClientDetailComponent {}
