import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'FinUI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/** デフォルトのプライマリボタン */
export const Default: Story = {
  args: {
    children: '融資申請',
    variant: 'primary',
    size: 'md',
  },
};

/** 全バリアント一覧 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button variant="primary">承認する</Button>
      <Button variant="secondary">キャンセル</Button>
      <Button variant="danger">却下する</Button>
      <Button variant="ghost">詳細を見る</Button>
    </div>
  ),
};

/** サイズバリエーション */
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button size="sm">小</Button>
      <Button size="md">中</Button>
      <Button size="lg">大</Button>
    </div>
  ),
};

/** ローディング状態 */
export const Loading: Story = {
  args: {
    children: '審査中...',
    loading: true,
    variant: 'primary',
  },
};

/** 無効状態 */
export const Disabled: Story = {
  args: {
    children: '承認不可',
    disabled: true,
    variant: 'primary',
  },
};

/** アイコン付きボタン */
export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button
        variant="primary"
        iconLeft={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        }
      >
        新規申請
      </Button>
      <Button
        variant="secondary"
        iconRight={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        }
      >
        CSVダウンロード
      </Button>
    </div>
  ),
};

/** 金融業務での使用例 */
export const FinancialUseCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Button variant="primary" size="md">融資実行</Button>
        <Button variant="danger" size="md">融資取消</Button>
        <Button variant="secondary" size="md">条件変更</Button>
      </div>
      <div className="flex gap-3">
        <Button variant="primary" size="sm">承認</Button>
        <Button variant="danger" size="sm">差戻し</Button>
        <Button variant="ghost" size="sm">保留</Button>
      </div>
    </div>
  ),
};
