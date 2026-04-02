import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
        </svg>
      </div>
      <input
        type="text"
        [placeholder]="placeholder"
        class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        (input)="onInput($event)"
      />
    </div>
  `,
})
export class SearchInputComponent implements OnInit, OnDestroy {
  @Input() placeholder = '検索...';
  @Input() debounceMs = 300;

  @Output() searchChange = new EventEmitter<string>();

  private searchSubject = new Subject<string>();
  private subscription?: Subscription;

  ngOnInit(): void {
    this.subscription = this.searchSubject
      .pipe(
        debounceTime(this.debounceMs),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.searchChange.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchSubject.next(target.value);
  }
}
