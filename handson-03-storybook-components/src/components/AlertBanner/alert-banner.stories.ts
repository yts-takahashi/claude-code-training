import type { Meta, StoryObj } from '@storybook/angular';
import { AlertBannerComponent } from './alert-banner.component';

const meta: Meta<AlertBannerComponent> = {
  title: 'FinUI/AlertBanner',
  component: AlertBannerComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<AlertBannerComponent>;

/** 情報通知 */
export const Info: Story = {
  args: {
    type: 'info',
    title: 'システムメンテナンス',
    message: '3月30日（土）02:00〜06:00にシステムメンテナンスを実施します。この間、融資申請の新規受付が停止されます。',
    closable: true,
  },
};

/** 成功通知 */
export const Success: Story = {
  args: {
    type: 'success',
    title: '融資実行完了',
    message: 'LA-2024-001 田中太郎様の融資（¥50,000,000）が実行されました。',
    closable: true,
  },
};

/** 警告 */
export const Warning: Story = {
  args: {
    type: 'warning',
    title: '承認期限が迫っています',
    message: '5件の融資申請が承認期限を3日以内に迎えます。確認してください。',
    actionText: '対象案件を確認',
    closable: true,
  },
};

/** エラー */
export const Error: Story = {
  args: {
    type: 'error',
    title: '延滞アラート',
    message: '3件の融資案件が90日以上延滞しています。至急対応が必要です。',
    actionText: '延滞案件を表示',
    closable: false,
  },
};

/** 全タイプ一覧 */
export const AllTypes: Story = {
  render: () => ({
    template: `
      <div class="space-y-3">
        <fin-alert-banner type="info" message="新しい金利体系が4月1日から適用されます。"></fin-alert-banner>
        <fin-alert-banner type="success" message="月次レポートの生成が完了しました。" [closable]="true"></fin-alert-banner>
        <fin-alert-banner type="warning" message="本日中に承認が必要な案件が3件あります。" actionText="確認する"></fin-alert-banner>
        <fin-alert-banner type="error" message="外部信用情報APIとの接続でエラーが発生しています。" actionText="再試行" [closable]="true"></fin-alert-banner>
      </div>
    `,
  }),
};
