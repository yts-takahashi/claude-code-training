import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'FinUI/Button',
  component: ButtonComponent,
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
  render: (args) => ({
    props: args,
    template: `<fin-button [variant]="variant" [size]="size" [loading]="loading" [disabled]="disabled">融資申請</fin-button>`,
  }),
};

export default meta;
type Story = StoryObj<ButtonComponent>;

/** デフォルトのプライマリボタン */
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
  },
};

/** 全バリアント一覧 */
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="flex gap-4 items-center">
        <fin-button variant="primary">承認する</fin-button>
        <fin-button variant="secondary">キャンセル</fin-button>
        <fin-button variant="danger">却下する</fin-button>
        <fin-button variant="ghost">詳細を見る</fin-button>
      </div>
    `,
  }),
};

/** サイズバリエーション */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="flex gap-4 items-center">
        <fin-button size="sm">小</fin-button>
        <fin-button size="md">中</fin-button>
        <fin-button size="lg">大</fin-button>
      </div>
    `,
  }),
};

/** ローディング状態 */
export const Loading: Story = {
  args: {
    loading: true,
    variant: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `<fin-button [variant]="variant" [loading]="loading">審査中...</fin-button>`,
  }),
};

/** 無効状態 */
export const Disabled: Story = {
  args: {
    disabled: true,
    variant: 'primary',
  },
  render: (args) => ({
    props: args,
    template: `<fin-button [variant]="variant" [disabled]="disabled">承認不可</fin-button>`,
  }),
};

/** 金融業務での使用例 */
export const FinancialUseCases: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <div class="flex gap-3">
          <fin-button variant="primary" size="md">融資実行</fin-button>
          <fin-button variant="danger" size="md">融資取消</fin-button>
          <fin-button variant="secondary" size="md">条件変更</fin-button>
        </div>
        <div class="flex gap-3">
          <fin-button variant="primary" size="sm">承認</fin-button>
          <fin-button variant="danger" size="sm">差戻し</fin-button>
          <fin-button variant="ghost" size="sm">保留</fin-button>
        </div>
      </div>
    `,
  }),
};
