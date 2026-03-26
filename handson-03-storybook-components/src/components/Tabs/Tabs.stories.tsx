import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'FinUI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

/** 融資案件詳細タブ */
export const Default: Story = {
  args: {
    items: [
      {
        key: 'basic',
        label: '基本情報',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        content: (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div><span className="text-sm text-gray-500">申請者名</span><p className="font-medium">田中太郎</p></div>
              <div><span className="text-sm text-gray-500">融資金額</span><p className="font-medium">¥50,000,000</p></div>
              <div><span className="text-sm text-gray-500">融資期間</span><p className="font-medium">5年</p></div>
              <div><span className="text-sm text-gray-500">金利</span><p className="font-medium">2.5%</p></div>
            </div>
          </div>
        ),
      },
      {
        key: 'review',
        label: '審査情報',
        badge: 3,
        content: (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">審査項目が3件残っています。</p>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>信用情報の確認</li>
              <li>担保評価の確定</li>
              <li>上席承認</li>
            </ul>
          </div>
        ),
      },
      {
        key: 'collateral',
        label: '担保情報',
        content: (
          <div className="text-sm text-gray-600">
            <p>担保種類: 不動産（土地・建物）</p>
            <p>評価額: ¥80,000,000</p>
            <p>担保掛目: 70%</p>
          </div>
        ),
      },
      {
        key: 'history',
        label: '変更履歴',
        badge: 12,
        content: <p className="text-sm text-gray-600">変更履歴が12件あります。</p>,
      },
      {
        key: 'documents',
        label: '添付書類',
        disabled: true,
        content: <p className="text-sm text-gray-600">準備中</p>,
      },
    ],
  },
};

/** バッジ付きタブ */
export const WithBadges: Story = {
  args: {
    items: [
      { key: 'all', label: 'すべて', badge: 350, content: <p className="text-sm">全350件の案件一覧</p> },
      { key: 'pending', label: '審査中', badge: 52, content: <p className="text-sm">審査中の52件</p> },
      { key: 'approved', label: '承認済', badge: 245, content: <p className="text-sm">承認済の245件</p> },
      { key: 'rejected', label: '却下', badge: 38, content: <p className="text-sm">却下された38件</p> },
      { key: 'expired', label: '期限切れ', badge: 15, content: <p className="text-sm">期限切れの15件</p> },
    ],
  },
};
