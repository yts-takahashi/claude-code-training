import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ModalProps {
  isOpen: boolean;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  confirmMode?: boolean;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'danger';
  closeOnOverlay?: boolean;
  closeOnEsc?: boolean;
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
 */
@Component({
  selector: 'fin-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Input() title?: string;
  @Input() size: 'sm' | 'md' | 'lg' | 'full' = 'md';
  @Input() confirmMode = false;
  @Input() confirmText = '確認';
  @Input() cancelText = 'キャンセル';
  @Input() confirmVariant: 'primary' | 'danger' = 'primary';
  @Input() closeOnOverlay = true;
  @Input() closeOnEsc = true;
  @Input() className = '';

  @Output() modalClose = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  private escHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.closeOnEsc && this.isOpen) {
      this.modalClose.emit();
    }
  };

  ngOnInit(): void {
    document.addEventListener('keydown', this.escHandler);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.escHandler);
    document.body.style.overflow = '';
  }

  get modalClasses(): string {
    const classes = ['relative w-full bg-white rounded-lg shadow-xl', sizeStyles[this.size]];
    if (this.className) classes.push(this.className);
    return classes.join(' ');
  }

  get confirmButtonClasses(): string {
    return this.confirmVariant === 'danger'
      ? 'px-4 py-2 text-sm font-medium text-white rounded-md bg-fin-danger hover:bg-fin-danger-hover'
      : 'px-4 py-2 text-sm font-medium text-white rounded-md bg-fin-primary hover:bg-fin-primary-hover';
  }

  onOverlayClick(): void {
    if (this.closeOnOverlay) this.modalClose.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }

  onClose(): void {
    this.modalClose.emit();
  }
}
