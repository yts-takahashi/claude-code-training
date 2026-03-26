import type { Meta, StoryObj } from '@storybook/angular';
import { StatusBadgeComponent } from './status-badge.component';

const meta: Meta<StatusBadgeComponent> = {
  title: 'FinUI/StatusBadge',
  component: StatusBadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['approved', 'pending', 'rejected', 'processing', 'expired'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<StatusBadgeComponent>;

/** デフォルト（承認済） */
export const Default: Story = {
  args: {
    status: 'approved',
    size: 'md',
  },
};

/** 全ステータス一覧 */
export const AllStatuses: Story = {
  render: () => ({
    template: `
      <div class="flex gap-3 items-center">
        <fin-status-badge status="approved"></fin-status-badge>
        <fin-status-badge status="pending"></fin-status-badge>
        <fin-status-badge status="rejected"></fin-status-badge>
        <fin-status-badge status="processing"></fin-status-badge>
        <fin-status-badge status="expired"></fin-status-badge>
      </div>
    `,
  }),
};

/** サイズバリエーション */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex gap-3 items-center">
        <fin-status-badge status="approved" size="sm"></fin-status-badge>
        <fin-status-badge status="approved" size="md"></fin-status-badge>
        <fin-status-badge status="approved" size="lg"></fin-status-badge>
      </div>
    `,
  }),
};

/** 融資審査フローでの使用例 */
export const LoanApprovalFlow: Story = {
  render: () => ({
    template: `
      <div class="space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-600 w-32">LA-2024-001:</span>
          <fin-status-badge status="approved"></fin-status-badge>
          <span class="text-xs text-gray-400">2024/03/15 承認</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-600 w-32">LA-2024-002:</span>
          <fin-status-badge status="pending"></fin-status-badge>
          <span class="text-xs text-gray-400">2024/03/18 申請</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-600 w-32">LA-2024-003:</span>
          <fin-status-badge status="processing"></fin-status-badge>
          <span class="text-xs text-gray-400">2024/03/20 審査中</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-600 w-32">LA-2024-004:</span>
          <fin-status-badge status="rejected"></fin-status-badge>
          <span class="text-xs text-gray-400">2024/03/12 却下</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-600 w-32">LA-2024-005:</span>
          <fin-status-badge status="expired"></fin-status-badge>
          <span class="text-xs text-gray-400">2024/02/01 期限切れ</span>
        </div>
      </div>
    `,
  }),
};
