import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SearchInputProps {
  value?: string;
  placeholder?: string;
  debounceMs?: number;
  loading?: boolean;
  disabled?: boolean;
}

/**
 * SearchInput - 検索入力コンポーネント
 *
 * 融資申請の検索、顧客検索、案件検索などに使用します。
 * デバウンス機能により、入力のたびにAPIを呼ばず
 * パフォーマンスを最適化します。
 */
@Component({
  selector: 'fin-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent implements OnChanges, OnDestroy {
  @Input() value?: string;
  @Input() placeholder = '検索...';
  @Input() debounceMs = 300;
  @Input() loading = false;
  @Input() disabled = false;
  @Input() className = '';

  @Output() searchChange = new EventEmitter<string>();

  internalValue = '';
  private debounceTimer?: ReturnType<typeof setTimeout>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && this.value !== undefined) {
      this.internalValue = this.value;
    }
  }

  ngOnDestroy(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
  }

  onInput(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.searchChange.emit(this.internalValue);
    }, this.debounceMs);
  }

  onClear(): void {
    this.internalValue = '';
    this.searchChange.emit('');
  }

  get inputClasses(): string {
    const classes = [
      'w-full pl-10 pr-10 py-2 text-sm border border-fin-border rounded-md',
      'focus:outline-none focus:ring-2 focus:ring-fin-primary/50 focus:border-fin-primary',
      'placeholder:text-gray-400',
    ];
    if (this.disabled) classes.push('bg-gray-50 cursor-not-allowed');
    return classes.join(' ');
  }
}
