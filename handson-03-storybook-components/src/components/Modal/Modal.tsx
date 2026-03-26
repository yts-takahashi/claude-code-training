import React, { useEffect, useCallback } from 'react';
import clsx from 'clsx';

export interface ModalProps {
  /** モーダルの表示/非表示 */
  isOpen: boolean;
  /** 閉じる時のコールバック */
  onClose: () => void;
  /** モーダルタイトル */
  title?: string;
  /** モーダルサイズ */
  size?: 'sm' | 'md' | 'lg' | 'full';
  /** 確認ダイアログモード */
  confirmMode?: boolean;
  /** 確認ボタンテキスト */
  confirmText?: string;
  /** キャンセルボタンテキスト */
  cancelText?: string;
  /** 確認ボタン押下時のコールバック */
  onConfirm?: () => void;
  /** 確認ボタンのバリアント */
  confirmVariant?: 'primary' | 'danger';
  /** オーバーレイクリックで閉じるか */
  closeOnOverlay?: boolean;
  /** ESCキーで閉じるか */
  closeOnEsc?: boolean;
  /** フッター要素 */
  footer?: React.ReactNode;
  /** 子要素（ボディ） */
  children: React.ReactNode;
  /** 追加のCSSクラス */
  className?: string;
}

const sizeStyles: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-3xl',
  full: 'max-w-full mx-4',
};

/**
 * Modal - モーダルダイアログコンポーネント
 *
 * 融資承認の確認、詳細情報の表示、
 * フォーム入力などに使用するモーダルです。
 * 確認ダイアログモードでは承認/却下の確認に最適です。
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  confirmMode = false,
  confirmText = '確認',
  cancelText = 'キャンセル',
  onConfirm,
  confirmVariant = 'primary',
  closeOnOverlay = true,
  closeOnEsc = true,
  footer,
  children,
  className,
}) => {
  const handleEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc) onClose();
    },
    [onClose, closeOnEsc]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEsc]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={closeOnOverlay ? onClose : undefined}
      />

      {/* Modal */}
      <div
        className={clsx(
          'relative w-full bg-white rounded-lg shadow-xl',
          sizeStyles[size],
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-fin-border">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-4">{children}</div>

        {/* Footer */}
        {(confirmMode || footer) && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-fin-border bg-gray-50 rounded-b-lg">
            {confirmMode ? (
              <>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-fin-border rounded-md hover:bg-gray-50"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className={clsx(
                    'px-4 py-2 text-sm font-medium text-white rounded-md',
                    confirmVariant === 'danger'
                      ? 'bg-fin-danger hover:bg-fin-danger-hover'
                      : 'bg-fin-primary hover:bg-fin-primary-hover'
                  )}
                >
                  {confirmText}
                </button>
              </>
            ) : (
              footer
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
