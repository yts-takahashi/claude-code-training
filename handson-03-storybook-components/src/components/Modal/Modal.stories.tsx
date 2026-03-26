import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'FinUI/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

/** 基本的なモーダル */
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>モーダルを開く</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="融資申請詳細">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">申請番号</span>
              <span className="text-sm font-medium">LA-2024-001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">申請者</span>
              <span className="text-sm font-medium">田中太郎</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">融資金額</span>
              <span className="text-sm font-medium">¥50,000,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">金利</span>
              <span className="text-sm font-medium">2.5%</span>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

/** 確認ダイアログ（承認） */
export const ConfirmApproval: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>承認確認</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="融資承認の確認"
          confirmMode
          confirmText="承認する"
          cancelText="キャンセル"
          onConfirm={() => {
            alert('承認されました');
            setIsOpen(false);
          }}
          size="sm"
        >
          <p className="text-sm text-gray-600">
            以下の融資申請を承認しますか？この操作は取り消せません。
          </p>
          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            <p className="text-sm"><span className="text-gray-500">申請番号:</span> LA-2024-001</p>
            <p className="text-sm"><span className="text-gray-500">金額:</span> ¥50,000,000</p>
          </div>
        </Modal>
      </>
    );
  },
};

/** 確認ダイアログ（却下） */
export const ConfirmRejection: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setIsOpen(true)}>却下確認</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="融資却下の確認"
          confirmMode
          confirmText="却下する"
          confirmVariant="danger"
          onConfirm={() => {
            alert('却下されました');
            setIsOpen(false);
          }}
          size="sm"
        >
          <p className="text-sm text-gray-600">
            この融資申請を却下しますか？申請者に却下通知が送信されます。
          </p>
        </Modal>
      </>
    );
  },
};

/** サイズバリエーション */
export const Sizes: Story = {
  render: () => {
    const [openSize, setOpenSize] = useState<string | null>(null);
    return (
      <div className="flex gap-3">
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <Button key={size} variant="secondary" onClick={() => setOpenSize(size)}>
            {size.toUpperCase()}
          </Button>
        ))}
        <Modal
          isOpen={openSize !== null}
          onClose={() => setOpenSize(null)}
          title={`${openSize?.toUpperCase()} サイズモーダル`}
          size={openSize as 'sm' | 'md' | 'lg'}
        >
          <p className="text-sm text-gray-600">
            これは {openSize?.toUpperCase()} サイズのモーダルです。
          </p>
        </Modal>
      </div>
    );
  },
};
