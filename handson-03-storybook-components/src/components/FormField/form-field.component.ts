import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'date' | 'tel' | 'select' | 'textarea';
  placeholder?: string;
  value?: string | number;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  options?: FormFieldOption[];
  rows?: number;
}

/**
 * FormField - フォームフィールドコンポーネント
 *
 * 融資申請フォーム、顧客情報入力、審査コメント入力など、
 * あらゆるフォーム入力に使用します。
 * バリデーションエラーの表示に対応しています。
 */
@Component({
  selector: 'fin-form-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-field.component.html',
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() name = '';
  @Input() type: 'text' | 'number' | 'email' | 'password' | 'date' | 'tel' | 'select' | 'textarea' = 'text';
  @Input() placeholder?: string;
  @Input() value?: string | number;
  @Input() error?: string;
  @Input() helperText?: string;
  @Input() required = false;
  @Input() disabled = false;
  @Input() readOnly = false;
  @Input() options: FormFieldOption[] = [];
  @Input() rows = 3;
  @Input() className = '';

  @Output() valueChange = new EventEmitter<string>();

  get inputClasses(): string {
    const classes = [
      'w-full px-3 py-2 text-sm border rounded-md transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
    ];
    if (this.error) {
      classes.push('border-fin-danger focus:ring-fin-danger/50 focus:border-fin-danger');
    } else {
      classes.push('border-fin-border focus:ring-fin-primary/50 focus:border-fin-primary');
    }
    if (this.disabled) classes.push('bg-gray-50 cursor-not-allowed');
    if (this.readOnly) classes.push('bg-gray-50');
    return classes.join(' ');
  }

  onValueChange(value: string): void {
    this.valueChange.emit(value);
  }
}
