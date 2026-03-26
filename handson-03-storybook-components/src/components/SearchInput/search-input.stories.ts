import type { Meta, StoryObj } from '@storybook/angular';
import { SearchInputComponent } from './search-input.component';

const meta: Meta<SearchInputComponent> = {
  title: 'FinUI/SearchInput',
  component: SearchInputComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SearchInputComponent>;

/** デフォルト */
export const Default: Story = {
  args: {
    placeholder: '申請番号、申請者名で検索...',
  },
};

/** デバウンス動作確認 */
export const WithDebounce: Story = {
  render: () => ({
    props: {
      searchTerm: '',
      searchCount: 0,
      onSearchChange(value: string) {
        this['searchTerm'] = value;
        this['searchCount']++;
      },
    },
    template: `
      <div class="space-y-3">
        <fin-search-input
          placeholder="入力してください（300msデバウンス）"
          [debounceMs]="300"
          (searchChange)="onSearchChange($event)"
        ></fin-search-input>
        <p class="text-sm text-gray-500">
          検索ワード: <span class="font-medium">{{ searchTerm || '（未入力）' }}</span>
        </p>
        <p class="text-sm text-gray-500">
          searchChange発火回数: <span class="font-medium">{{ searchCount }}</span>
        </p>
      </div>
    `,
  }),
};

/** ローディング状態 */
export const Loading: Story = {
  args: {
    placeholder: '検索中...',
    loading: true,
    value: '田中',
  },
};

/** 無効状態 */
export const Disabled: Story = {
  args: {
    placeholder: '検索できません',
    disabled: true,
  },
};

/** 融資申請検索の使用例 */
export const LoanSearchExample: Story = {
  render: () => ({
    props: {
      results: [] as string[],
      isSearching: false,
      handleSearch(query: string) {
        if (!query) {
          this['results'] = [];
          return;
        }
        this['isSearching'] = true;
        setTimeout(() => {
          this['results'] = [
            'LA-2024-001 田中太郎 ¥50,000,000',
            'LA-2024-005 田中次郎 ¥30,000,000',
            'LA-2024-008 田中美咲 ¥20,000,000',
          ].filter((r) => r.includes(query));
          this['isSearching'] = false;
        }, 500);
      },
    },
    template: `
      <div class="space-y-3 max-w-md">
        <fin-search-input
          placeholder="申請番号、申請者名で検索..."
          [debounceMs]="300"
          [loading]="isSearching"
          (searchChange)="handleSearch($event)"
        ></fin-search-input>
        @if (results.length > 0) {
          <div class="border border-fin-border rounded-md divide-y divide-fin-border">
            @for (r of results; track r) {
              <div class="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">{{ r }}</div>
            }
          </div>
        }
      </div>
    `,
  }),
};
