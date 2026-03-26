import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'FinUI/StatusBadge',
  component: StatusBadge,
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
type Story = StoryObj<typeof StatusBadge>;

/** デフォルト（承認済） */
export const Default: Story = {
  args: {
    status: 'approved',
    size: 'md',
  },
};

/** 全ステータス一覧 */
export const AllStatuses: Story = {
  render: () => (
    <div className="flex gap-3 items-center">
      <StatusBadge status="approved" />
      <StatusBadge status="pending" />
      <StatusBadge status="rejected" />
      <StatusBadge status="processing" />
      <StatusBadge status="expired" />
    </div>
  ),
};

/** サイズバリエーション */
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-3 items-center">
      <StatusBadge status="approved" size="sm" />
      <StatusBadge status="approved" size="md" />
      <StatusBadge status="approved" size="lg" />
    </div>
  ),
};

/** 融資審査フローでの使用例 */
export const LoanApprovalFlow: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 w-32">LA-2024-001:</span>
        <StatusBadge status="approved" />
        <span className="text-xs text-gray-400">2024/03/15 承認</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 w-32">LA-2024-002:</span>
        <StatusBadge status="pending" />
        <span className="text-xs text-gray-400">2024/03/18 申請</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 w-32">LA-2024-003:</span>
        <StatusBadge status="processing" />
        <span className="text-xs text-gray-400">2024/03/20 審査中</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 w-32">LA-2024-004:</span>
        <StatusBadge status="rejected" />
        <span className="text-xs text-gray-400">2024/03/12 却下</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600 w-32">LA-2024-005:</span>
        <StatusBadge status="expired" />
        <span className="text-xs text-gray-400">2024/02/01 期限切れ</span>
      </div>
    </div>
  ),
};
