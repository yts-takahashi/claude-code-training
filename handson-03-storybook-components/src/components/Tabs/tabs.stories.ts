import type { Meta, StoryObj } from '@storybook/angular';
import { TabsComponent } from './tabs.component';

const meta: Meta<TabsComponent> = {
  title: 'FinUI/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TabsComponent>;

/** 融資案件詳細タブ */
export const Default: Story = {
  render: () => ({
    props: {
      activeKey: 'basic',
      items: [
        { key: 'basic', label: '基本情報' },
        { key: 'review', label: '審査情報', badge: 3 },
        { key: 'collateral', label: '担保情報' },
        { key: 'history', label: '変更履歴', badge: 12 },
        { key: 'documents', label: '添付書類', disabled: true },
      ],
      onTabChange(key: string) { this['activeKey'] = key; },
    },
    template: `
      <fin-tabs [items]="items" [activeKey]="activeKey" (tabChange)="onTabChange($event)">
        @switch (activeKey) {
          @case ('basic') {
            <div class="space-y-3">
              <div class="grid grid-cols-2 gap-4">
                <div><span class="text-sm text-gray-500">申請者名</span><p class="font-medium">田中太郎</p></div>
                <div><span class="text-sm text-gray-500">融資金額</span><p class="font-medium">¥50,000,000</p></div>
                <div><span class="text-sm text-gray-500">融資期間</span><p class="font-medium">5年</p></div>
                <div><span class="text-sm text-gray-500">金利</span><p class="font-medium">2.5%</p></div>
              </div>
            </div>
          }
          @case ('review') {
            <div class="space-y-2">
              <p class="text-sm text-gray-600">審査項目が3件残っています。</p>
              <ul class="list-disc list-inside text-sm text-gray-600">
                <li>信用情報の確認</li>
                <li>担保評価の確定</li>
                <li>上席承認</li>
              </ul>
            </div>
          }
          @case ('collateral') {
            <div class="text-sm text-gray-600">
              <p>担保種類: 不動産（土地・建物）</p>
              <p>評価額: ¥80,000,000</p>
              <p>担保掛目: 70%</p>
            </div>
          }
          @case ('history') {
            <p class="text-sm text-gray-600">変更履歴が12件あります。</p>
          }
          @case ('documents') {
            <p class="text-sm text-gray-600">準備中</p>
          }
        }
      </fin-tabs>
    `,
  }),
};

/** バッジ付きタブ */
export const WithBadges: Story = {
  render: () => ({
    props: {
      activeKey: 'all',
      items: [
        { key: 'all', label: 'すべて', badge: 350 },
        { key: 'pending', label: '審査中', badge: 52 },
        { key: 'approved', label: '承認済', badge: 245 },
        { key: 'rejected', label: '却下', badge: 38 },
        { key: 'expired', label: '期限切れ', badge: 15 },
      ],
      onTabChange(key: string) { this['activeKey'] = key; },
    },
    template: `
      <fin-tabs [items]="items" [activeKey]="activeKey" (tabChange)="onTabChange($event)">
        @switch (activeKey) {
          @case ('all') { <p class="text-sm">全350件の案件一覧</p> }
          @case ('pending') { <p class="text-sm">審査中の52件</p> }
          @case ('approved') { <p class="text-sm">承認済の245件</p> }
          @case ('rejected') { <p class="text-sm">却下された38件</p> }
          @case ('expired') { <p class="text-sm">期限切れの15件</p> }
        }
      </fin-tabs>
    `,
  }),
};
