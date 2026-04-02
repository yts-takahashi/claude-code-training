import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/Button';
import { CardComponent } from './components/Card';
import { BadgeComponent } from './components/Badge';
import { SearchInputComponent } from './components/SearchInput';
import { AvatarComponent } from './components/Avatar';
import { ProgressBarComponent } from './components/ProgressBar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CardComponent,
    BadgeComponent,
    SearchInputComponent,
    AvatarComponent,
    ProgressBarComponent,
  ],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <header class="bg-white border-b border-gray-200 px-6 py-4">
        <div class="max-w-5xl mx-auto flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-900">📋 TaskBoard</h1>
          <div class="flex items-center gap-3">
            <app-avatar name="田中太郎" size="md"></app-avatar>
            <span class="text-sm text-gray-600">田中太郎</span>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="max-w-5xl mx-auto px-6 py-8">
        <!-- Search -->
        <div class="mb-6">
          <app-search-input
            placeholder="タスクを検索..."
            (searchChange)="onSearch($event)"
          ></app-search-input>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <app-card title="全タスク" subtitle="プロジェクト全体">
            <div class="text-3xl font-bold text-gray-900">24</div>
          </app-card>
          <app-card title="進行中" subtitle="現在作業中">
            <div class="text-3xl font-bold text-blue-600">8</div>
          </app-card>
          <app-card title="完了済み" subtitle="今週の完了数">
            <div class="text-3xl font-bold text-green-600">5</div>
          </app-card>
        </div>

        <!-- Progress -->
        <div class="mb-8">
          <app-card title="スプリント進捗">
            <div class="space-y-4">
              <app-progress-bar [value]="75" color="blue" label="フロントエンド"></app-progress-bar>
              <app-progress-bar [value]="45" color="green" label="バックエンド"></app-progress-bar>
              <app-progress-bar [value]="90" color="yellow" label="デザイン"></app-progress-bar>
            </div>
          </app-card>
        </div>

        <!-- Task List -->
        <app-card title="タスク一覧">
          <div class="space-y-3">
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-3">
                <app-avatar name="佐藤花子" size="sm"></app-avatar>
                <div>
                  <p class="text-sm font-medium text-gray-900">ログイン画面のUI改善</p>
                  <p class="text-xs text-gray-500">佐藤花子</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <app-badge variant="warning" size="sm">進行中</app-badge>
                <app-button variant="ghost" size="sm">詳細</app-button>
              </div>
            </div>

            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-3">
                <app-avatar name="山田一郎" size="sm"></app-avatar>
                <div>
                  <p class="text-sm font-medium text-gray-900">API エンドポイントの追加</p>
                  <p class="text-xs text-gray-500">山田一郎</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <app-badge variant="success" size="sm">完了</app-badge>
                <app-button variant="ghost" size="sm">詳細</app-button>
              </div>
            </div>

            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-3">
                <app-avatar name="鈴木次郎" size="sm"></app-avatar>
                <div>
                  <p class="text-sm font-medium text-gray-900">データベース移行スクリプト</p>
                  <p class="text-xs text-gray-500">鈴木次郎</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <app-badge variant="error" size="sm">ブロック中</app-badge>
                <app-button variant="ghost" size="sm">詳細</app-button>
              </div>
            </div>
          </div>
        </app-card>

        <!-- Actions -->
        <div class="mt-6 flex gap-3">
          <app-button variant="primary" size="md" (clicked)="onAddTask()">タスクを追加</app-button>
          <app-button variant="secondary" size="md">エクスポート</app-button>
          <app-button variant="danger" size="md" [disabled]="true">一括削除</app-button>
        </div>
      </main>
    </div>
  `,
})
export class AppComponent {
  onSearch(query: string): void {
    console.log('検索:', query);
  }

  onAddTask(): void {
    console.log('タスク追加');
  }
}
