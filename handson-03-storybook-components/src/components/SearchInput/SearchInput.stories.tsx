import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'FinUI/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

/** デフォルト */
export const Default: Story = {
  args: {
    placeholder: '申請番号、申請者名で検索...',
  },
};

/** デバウンス動作確認 */
export const WithDebounce: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCount, setSearchCount] = useState(0);
    return (
      <div className="space-y-3">
        <SearchInput
          placeholder="入力してください（300msデバウンス）"
          debounceMs={300}
          onChange={(value) => {
            setSearchTerm(value);
            setSearchCount((c) => c + 1);
          }}
        />
        <p className="text-sm text-gray-500">
          検索ワード: <span className="font-medium">{searchTerm || '（未入力）'}</span>
        </p>
        <p className="text-sm text-gray-500">
          onChange発火回数: <span className="font-medium">{searchCount}</span>
        </p>
      </div>
    );
  },
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
  render: () => {
    const [results, setResults] = useState<string[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (query: string) => {
      if (!query) {
        setResults([]);
        return;
      }
      setIsSearching(true);
      setTimeout(() => {
        setResults([
          `LA-2024-001 田中太郎 ¥50,000,000`,
          `LA-2024-005 田中次郎 ¥30,000,000`,
          `LA-2024-008 田中美咲 ¥20,000,000`,
        ].filter((r) => r.includes(query)));
        setIsSearching(false);
      }, 500);
    };

    return (
      <div className="space-y-3 max-w-md">
        <SearchInput
          placeholder="申請番号、申請者名で検索..."
          debounceMs={300}
          loading={isSearching}
          onChange={handleSearch}
        />
        {results.length > 0 && (
          <div className="border border-fin-border rounded-md divide-y divide-fin-border">
            {results.map((r, i) => (
              <div key={i} className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer">
                {r}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};
