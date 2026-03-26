import type { Meta, StoryObj } from '@storybook/angular';
import { CurrencyDisplayComponent } from './currency-display.component';

const meta: Meta<CurrencyDisplayComponent> = {
  title: 'FinUI/CurrencyDisplay',
  component: CurrencyDisplayComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CurrencyDisplayComponent>;

/** 融資残高 */
export const Default: Story = {
  args: {
    amount: 50000000,
    size: 'lg',
  },
};

/** 色分け表示 */
export const ColorCoded: Story = {
  render: () => ({
    template: `
      <div class="space-y-2">
        <div><fin-currency-display [amount]="12345678" [colorCoded]="true" size="lg"></fin-currency-display></div>
        <div><fin-currency-display [amount]="-5432100" [colorCoded]="true" size="lg"></fin-currency-display></div>
        <div><fin-currency-display [amount]="0" [colorCoded]="true" size="lg"></fin-currency-display></div>
      </div>
    `,
  }),
};

/** サイズバリエーション */
export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="space-y-2">
        <div><fin-currency-display [amount]="1234567" size="sm"></fin-currency-display></div>
        <div><fin-currency-display [amount]="1234567" size="md"></fin-currency-display></div>
        <div><fin-currency-display [amount]="1234567" size="lg"></fin-currency-display></div>
        <div><fin-currency-display [amount]="1234567" size="xl"></fin-currency-display></div>
      </div>
    `,
  }),
};

/** 変動率付き */
export const WithChangeRate: Story = {
  render: () => ({
    template: `
      <div class="space-y-3">
        <div>
          <span class="text-sm text-gray-500 block">融資残高</span>
          <fin-currency-display [amount]="12345678900" size="xl" [changeRate]="3.2"></fin-currency-display>
        </div>
        <div>
          <span class="text-sm text-gray-500 block">延滞残高</span>
          <fin-currency-display [amount]="151891200" size="xl" [changeRate]="-0.8" [colorCoded]="true"></fin-currency-display>
        </div>
      </div>
    `,
  }),
};

/** テーブルセルでの使用例 */
export const InTableCell: Story = {
  render: () => ({
    template: `
      <table class="text-sm">
        <thead>
          <tr class="border-b">
            <th class="text-left px-3 py-2">項目</th>
            <th class="text-right px-3 py-2">金額</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b">
            <td class="px-3 py-2">融資実行額</td>
            <td class="px-3 py-2 text-right"><fin-currency-display [amount]="50000000" size="sm"></fin-currency-display></td>
          </tr>
          <tr class="border-b">
            <td class="px-3 py-2">返済済み</td>
            <td class="px-3 py-2 text-right"><fin-currency-display [amount]="-15000000" size="sm" [colorCoded]="true" [showSign]="true"></fin-currency-display></td>
          </tr>
          <tr class="border-b font-semibold">
            <td class="px-3 py-2">残高</td>
            <td class="px-3 py-2 text-right"><fin-currency-display [amount]="35000000" size="sm"></fin-currency-display></td>
          </tr>
        </tbody>
      </table>
    `,
  }),
};
