import type { Meta, StoryObj } from '@storybook/angular';
import { NotificationBellComponent, NotificationItem } from './notification-bell.component';

const sampleNotifications: NotificationItem[] = [
  {
    id: '1',
    title: '融資申請が承認されました',
    message: 'LA-2024-001 田中太郎様の融資申請（¥50,000,000）が承認されました。',
    type: 'success',
    timestamp: '5分前',
    read: false,
  },
  {
    id: '2',
    title: '承認期限が迫っています',
    message: 'LA-2024-003 鈴木一郎様の案件の承認期限が本日です。',
    type: 'warning',
    timestamp: '30分前',
    read: false,
  },
  {
    id: '3',
    title: '延滞アラート',
    message: '顧客ID: C-1234 の返済が30日延滞しています。',
    type: 'error',
    timestamp: '1時間前',
    read: false,
  },
  {
    id: '4',
    title: 'システムメンテナンス予定',
    message: '3月30日 02:00-06:00 にシステムメンテナンスを実施します。',
    type: 'info',
    timestamp: '3時間前',
    read: true,
  },
  {
    id: '5',
    title: '月次レポートが生成されました',
    message: '2024年3月の融資実績レポートが生成されました。',
    type: 'info',
    timestamp: '昨日',
    read: true,
  },
];

const meta: Meta<NotificationBellComponent> = {
  title: 'FinUI/NotificationBell',
  component: NotificationBellComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<NotificationBellComponent>;

/** デフォルト（未読あり） */
export const Default: Story = {
  render: () => ({
    props: {
      notifications: [...sampleNotifications],
      onMarkAsRead(id: string) {
        this['notifications'] = this['notifications'].map((n: NotificationItem) =>
          n.id === id ? { ...n, read: true } : n
        );
      },
      onMarkAllAsRead() {
        this['notifications'] = this['notifications'].map((n: NotificationItem) => ({ ...n, read: true }));
      },
    },
    template: `
      <div class="flex justify-end p-4">
        <fin-notification-bell
          [notifications]="notifications"
          (markAsRead)="onMarkAsRead($event)"
          (markAllAsRead)="onMarkAllAsRead()"
        ></fin-notification-bell>
      </div>
    `,
  }),
};

/** 通知なし */
export const Empty: Story = {
  args: {
    notifications: [],
  },
};

/** 大量の未読 */
export const ManyUnread: Story = {
  render: () => {
    const manyNotifications = Array.from({ length: 120 }, (_, i) => ({
      id: String(i),
      title: `通知 ${i + 1}`,
      message: `これはサンプル通知 ${i + 1} です。`,
      type: 'info' as const,
      timestamp: `${i}分前`,
      read: false,
    }));
    return {
      props: { notifications: manyNotifications },
      template: `
        <div class="flex justify-end p-4">
          <fin-notification-bell [notifications]="notifications"></fin-notification-bell>
        </div>
      `,
    };
  },
};
