import type { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from './modal.component';
import { ButtonComponent } from '../Button';

const meta: Meta<ModalComponent> = {
  title: 'FinUI/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ModalComponent>;

/** 基本的なモーダル */
export const Default: Story = {
  render: () => ({
    props: {
      isOpen: false,
      toggleOpen() { this['isOpen'] = !this['isOpen']; },
    },
    template: `
      <fin-button (buttonClick)="toggleOpen()">モーダルを開く</fin-button>
      <fin-modal [isOpen]="isOpen" (modalClose)="isOpen = false" title="融資申請詳細">
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">申請番号</span>
            <span class="text-sm font-medium">LA-2024-001</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">申請者</span>
            <span class="text-sm font-medium">田中太郎</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">融資金額</span>
            <span class="text-sm font-medium">¥50,000,000</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">金利</span>
            <span class="text-sm font-medium">2.5%</span>
          </div>
        </div>
      </fin-modal>
    `,
  }),
};

/** 確認ダイアログ（承認） */
export const ConfirmApproval: Story = {
  render: () => ({
    props: {
      isOpen: false,
    },
    template: `
      <fin-button (buttonClick)="isOpen = true">承認確認</fin-button>
      <fin-modal
        [isOpen]="isOpen"
        (modalClose)="isOpen = false"
        title="融資承認の確認"
        [confirmMode]="true"
        confirmText="承認する"
        cancelText="キャンセル"
        (confirm)="isOpen = false"
        size="sm"
      >
        <p class="text-sm text-gray-600">
          以下の融資申請を承認しますか？この操作は取り消せません。
        </p>
        <div class="mt-3 p-3 bg-gray-50 rounded-md">
          <p class="text-sm"><span class="text-gray-500">申請番号:</span> LA-2024-001</p>
          <p class="text-sm"><span class="text-gray-500">金額:</span> ¥50,000,000</p>
        </div>
      </fin-modal>
    `,
  }),
};

/** 確認ダイアログ（却下） */
export const ConfirmRejection: Story = {
  render: () => ({
    props: {
      isOpen: false,
    },
    template: `
      <fin-button variant="danger" (buttonClick)="isOpen = true">却下確認</fin-button>
      <fin-modal
        [isOpen]="isOpen"
        (modalClose)="isOpen = false"
        title="融資却下の確認"
        [confirmMode]="true"
        confirmText="却下する"
        confirmVariant="danger"
        (confirm)="isOpen = false"
        size="sm"
      >
        <p class="text-sm text-gray-600">
          この融資申請を却下しますか？申請者に却下通知が送信されます。
        </p>
      </fin-modal>
    `,
  }),
};

/** サイズバリエーション */
export const Sizes: Story = {
  render: () => ({
    props: {
      openSize: null as string | null,
    },
    template: `
      <div class="flex gap-3">
        <fin-button variant="secondary" (buttonClick)="openSize = 'sm'">SM</fin-button>
        <fin-button variant="secondary" (buttonClick)="openSize = 'md'">MD</fin-button>
        <fin-button variant="secondary" (buttonClick)="openSize = 'lg'">LG</fin-button>
      </div>
      <fin-modal
        [isOpen]="openSize !== null"
        (modalClose)="openSize = null"
        [title]="(openSize || '') + ' サイズモーダル'"
        [size]="openSize || 'md'"
      >
        <p class="text-sm text-gray-600">
          これは {{ openSize }} サイズのモーダルです。
        </p>
      </fin-modal>
    `,
  }),
};
